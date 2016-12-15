(function () {
    'use strict';
    angular
        .module('custom')
        .controller('FrameListController', FrameListController);
    FrameListController.$inject = ['$scope', 'FrameService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function FrameListController($scope, FrameService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        $scope.tableParams = {page: 1, count: 10000, searchStr: null}
        //如果在dialog里面就显示选择按钮, 这样可以复用一个页面, this is great!
        $scope.inDialog = angular.isUndefined($scope.ngDialogData) ? false : true

        $scope.activate = function () {
            $scope.frameTableParams = new NgTableParams($scope.tableParams, {
                counts:[],
                getData: function ($defer, params) {
                    blockUI.start();
                    FrameService.listFrames(params.parameters()).success(function (data) {
                        if (data.status == 200) {
                            params.total(data.totalCount);
                            console.log(data);
                            $defer.resolve(data.data);
                            blockUI.stop();
                        }
                    }).error(function () {
                        SweetAlert.error("网络问题,请稍后重试!");
                        blockUI.stop();
                    });
                }
            });
        }

        $scope.activate();

        //删除
        $scope.delete = function (id) {
            SweetAlert.swal({
                title: '确认删除?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '是',
                cancelButtonText: '否',
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    //这里可以进行调试,查看$scope,因为table会创建一个子scope
                    //然后子scope里面就不能用this了,因为this就指向了子scope,
                    //实际上在table的每一行里面的点击是调用了父scope的delete方法
                    blockUI.start();
                    FrameService.deleteFrame(id).success(function () {
                        Notify.alert("删除成功!", {status: "success", timeout: 3000});
                        $scope.frameTableParams.reload();
                        blockUI.stop();
                    }).error(function () {
                        blockUI.stop();
                        SweetAlert.error("网络问题, 请稍后重试!");
                    });
                }
            });
        }

        $scope.choose = function (item) {
            var result = {status: 1, url: item.url};
            $scope.closeThisDialog(result);
        }

        $scope.add = function (type) {
            if (type == 1) {
                //电影详情页
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/film-detail.html',
                    controller: 'FilmDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: {id: 0, content: "{}"}}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (type == 2) {
                //电视剧详情页
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/series-detail.html',
                    controller: 'SeriesDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: {id: 0, content: "{}"}}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (type == 3) {
                //发行详情页
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/issue-detail.html',
                    controller: 'IssueDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: {id: 0, content: "{}"}}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (type == 4) {
                //艺人详情页
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/star-detail.html',
                    controller: 'StarDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: {id: 0, content: "{}"}}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (type == 5) {
                //资讯详情页
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/news-detail.html',
                    controller: 'NewsDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: {id: 0, content: "{}"}}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            }
        }

        $scope.edit = function (item) {
            if (item.type == '首页') {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/cover.html',
                    controller: 'CoverController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == '关于我们') {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/about.html',
                    controller: 'AboutController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == '电影') {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/movie-list.html',
                    controller: 'MovieListController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == '电视剧') {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/series-list.html',
                    controller: 'SeriesListController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == '影视发行') {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/issue-list.html',
                    controller: 'IssueListController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == '艺人经纪') {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/star-list.html',
                    controller: 'StarListController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == "电影详情") {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/film-detail.html',
                    controller: 'FilmDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if(item.type == "电视剧详情"){
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/series-detail.html',
                    controller: 'SeriesDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if(item.type == "发行详情"){
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/issue-detail.html',
                    controller: 'IssueDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == "艺人详情") {
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/star-detail.html',
                    controller: 'StarDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            } else if (item.type == "资讯详情"){
                var dialog = ngDialog.open({
                    template: 'app/views/custom/frame/news-detail.html',
                    controller: 'NewsDetailController',
                    className: 'ngdialog-theme-default max-dialog',
                    data: {item: item}
                });
                dialog.closePromise.then(function () {
                    $scope.frameTableParams.reload();
                });
            }
        }

    }
})();