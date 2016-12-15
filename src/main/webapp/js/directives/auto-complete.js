angular.module('custom').directive('autoComplete', ['$http', '$timeout', function ($http, $timeout) {

    var $window = $(window);
    var $body = $(document.body);
    var clickFocusCl;
    var clickFocusPositionCl;

    var $box = $('#J-auto-complete-box');
    if ($box.length < 1) {
        $body.append('<div id="J-auto-complete-box" class="auto-complete-box"></div>');
        $box = $('#J-auto-complete-box');
    }

    $window.on('blur.autoCompleteWindowBlur', function () {
        clearTimer();
    });

    function clearTimer() {
        clearInterval($box.data('cl'));
        clearTimeout(clickFocusCl);
        clearTimeout(clickFocusPositionCl);
    }

    return {
        restrict: 'A',
        scope: {
            control: '=autoComplete',
            //如果存在此对象,则将选择的对象赋之
            bindScope: '=autoCompleteBind',
            //如果存在此属性,则将选择的对象下的attr值赋之
            bindAttr: '@autoCompleteBindName'
        },
        link: function (scope, $element, attrs) {

            //如果调用方没有初始化scope.control,则意味着下拉框不需要做任何初始化
            if (!scope.control) {
                return;
            }

            var width = scope.control.width;

            var rows = $box[0].getElementsByClassName('J-row');

            var selectedIndex = -1;

            $element.on('click focus', function (event) {
                $element.data('isFocus', true);
                var $target = $(event.target);
                //防止click和focus先后被同时执行
                clearTimer();
                clickFocusPositionCl = setTimeout(function () {
                    position($target, width);
                }, 0);
                clickFocusCl = setTimeout(function () {
                    $box.off('mousedown.box');
                    $box.on('mousedown.box', '.J-row', mousedownBox);
                    //每隔0.1秒钟定位一次
                    $box.data('cl', setInterval(function () {
                        position($target, width);
                    }, 50));
                    $window.on('resize.control_windowResize', function () {
                        position($target, width);
                    });
                }, 100)
            });

            //按上下时高亮条目
            $element.on('keydown.box', function (ev) {
                var code = ev.originalEvent.keyCode;
                //上
                if (code === 38) {
                    ev.preventDefault();
                    selectedIndex--;
                    if (selectedIndex < 0) {
                        selectedIndex = rows.length - 1;
                    }
                    highlightSelected()
                }
                //下
                else if (code === 40) {
                    ev.preventDefault();
                    selectedIndex++;
                    if (selectedIndex > rows.length - 1) {
                        selectedIndex = 0;
                    }
                    highlightSelected()
                }
                //Enter
                else if (code === 13) {
                    if ($box.is(':visible')) {
                        $timeout(function () {
                            var selected = getFilterRow()[selectedIndex];
                            if (selected) {
                                bind(selected)
                            }
                        }, 0);
                    }
                    //当按回车的时候,如果$box可见,则阻止回车事件响应
                    if ($box.is(':visible')) {
                        ev.preventDefault();
                    }
                    hide();
                }
            }).on('blur.box', function () {
                $element.data('isFocus', false);
                hide();
            });

            $element.on('input', function () {
                var self = this;
                if (scope.control.filter && _.get(scope, 'control.list.rows.length') > 0) {
                    scope.control.list.rows.forEach(function (row) {
                        row.__isMatch = scope.control.filter(row, _.trim(self.value));
                    });
                    render();
                    show();
                }
            });

            //获取所有isMatch为true或undefined的属性
            //当为undefined时,意味着control没有提供filter方法,此时返回所有数据
            function getFilterRow() {
                if (_.isArray(scope.control.list.rows)) {
                    return scope.control.list.rows.filter(function (row) {
                        return row.__isMatch || row.__isMatch === undefined;
                    });
                } else {

                    return []
                }
            }

            //当鼠标选择下拉框某项时
            function mousedownBox() {
                var $rows = $(rows);
                var $this = $(this);
                var index = $rows.index($this);
                var filterRow = getFilterRow();
                if (index >= 0) {
                    //将选中的数据抛出去
                    if (filterRow[index]) {
                        $timeout(function () {
                            var selected = filterRow[index];
                            if (selected) {
                                bind(selected)
                            }
                        }, 0);
                    }
                    hide();
                }
            }

            function render(params) {
                var list = scope.control.list;
                var link = '';
                var rows = list.rows;

                if (!rows) return scope.control;

                //是否有过滤器
                var hasFilter = typeof scope.control.filter === 'function';

                selectedIndex = -1;

                //存放过滤后的数据
                var filterRows = [];
                if (hasFilter) {
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (!hasFilter || (hasFilter && (row.__isMatch || row.__isMatch === undefined))) {
                            filterRows.push(row)
                        }
                    }
                } else {
                    filterRows = rows;
                }

                if (params || filterRows.length > 0) {
                    link = '<div>' +
                        '<table>' +
                        (list.thead ? '<thead><tr><th>' + list.thead.join('</th><th>') + '</th></tr></thead>' : '') +
                        '<tbody>' +
                        (function () {
                            var str = '';
                            if (filterRows.length > 0) {
                                for (var i = 0; i < filterRows.length; i++) {
                                    var row = filterRows[i];
                                    str += '<tr class="J-row">';
                                    for (var j = 0; j < list.field.length; j++) {
                                        str += '<td>' + row[list.field[j]] + '</td>'
                                    }
                                    str += '</tr>';
                                }
                            } else {
                                str = '<tr><td colspan="' + list.field.length + '">' + params.text + '</td></tr>';
                            }
                            return str;
                        })() +
                        '</tbody>' +
                        '</table></div>';
                }
                $box.html(link);
                position($element, width);
                return scope.control;
            }

            //将选中的值与调用方进行绑定
            //或执行回调
            function bind(selected) {
                if (scope.control.selectedCallback) {
                    $timeout(function () {
                        scope.control.selectedCallback(selected, angular.element($element).scope());
                    }, 0)
                }
                //如果需要绑定到某个对象上
                if (attrs['autoCompleteBind']) {
                    //检查直接赋值对象还是对象中某个属性
                    if (attrs['autoCompleteBindName']) {
                        scope.bindScope = selected[scope.bindAttr];
                    } else {
                        scope.bindScope = selected;
                    }
                }
            }

            function show() {
                $box.show();
                $timeout(function () {
                    if ($element.data('isFocus')) {
                        $box.show().scrollTop(0);
                    }
                }, 0);
                return scope.control;
            }

            function hide() {
                clearTimer();
                $box.off('mousedown.box');
                $box.hide();
                $window.off('resize.control_windowResize');
            }

            function highlightSelected() {
                var $rows = $(rows);
                var $current = $rows.eq(selectedIndex);
                $(rows).removeClass('active').eq(selectedIndex).addClass('active');
                if ($current.length > 0) {
                    if ($current[0].offsetTop > $box[0].offsetHeight + $current[0].scrollTop) {
                        $box[0].scrollTop = $current[0].offsetHeight * 2 + $current[0].offsetTop - $box[0].offsetHeight;
                    } else {
                        $current[0].scrollIntoView(false);
                    }
                }
            }

            scope.control.$box = $box;
            scope.control.$element = $element;
            scope.control.render = render;
            scope.control.show = show;

        }
    };
    function position($target, width) {
        clearTimeout($box.data('positionCl'));
        $box.data('positionCl', setTimeout(function () {
            var $offset = $target.offset();
            var targetH = $target[0].offsetHeight;
            var top = $offset.top + targetH;
            var $boxH = $box[0].offsetHeight;
            //弹框是否超出浏览器底部
            var isOverY = top + $boxH > $window.height();
            if (isOverY) {
                top = top - targetH - $boxH;
            }
            $box.toggleClass('slide-down-in', isOverY);
            $box.css({
                left: $offset.left,
                width: width ? width : $target[0].offsetWidth,
                top: top
            });
        }, 0));
    }
}]);
