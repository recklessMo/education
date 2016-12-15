(function () {
    'use strict';
    angular
        .module('custom')
        .controller('StarListController', StarListController);
    StarListController.$inject = ['$scope', 'CoverService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function StarListController($scope, CoverService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        //当前使用的数据
        $scope.obj = JSON.parse($scope.ngDialogData.item.content);

        //发布
        $scope.publish = function () {
            //判断是否都填写完整了
            if(angular.isUndefined($scope.obj.starList)){
                SweetAlert.error("请填写完毕所有字段!");
                return ;
            }

            var data = $scope.obj;
            CoverService.publishStarList(data).success(function (data) {
                if (data.status == 200) {
                    SweetAlert.success("发布成功!");
                    $scope.closeThisDialog();
                }
            }).error(function () {
                SweetAlert.error("网络异常, 请稍后重试!");
            });
        }


        //打开搜索图片的窗口
        $scope.searchImg = function (type) {
            var dialog= ngDialog.open({
                template: 'app/views/custom/admin/img/img-list.html',
                className: 'ngdialog-theme-default max-dialog',
                controller: 'ImageListController',
                data: {inDialog: true}
            });
            dialog.closePromise.then(function(data){
                if(!data.value.status){
                    return;
                }
                //不同的type对应不同位置的img
                var url = data.value.url;
                if(type === 1){
                    _.set($scope.obj, 'firstHead.url', url);
                }else if(type === 2){
                    _.set($scope.obj, 'secondHead.url', url);
                }else if(type === 3){
                    _.set($scope.obj, 'thirdHead.url', url);
                }
            });
        }


        //打开搜索跳转页面的窗口
        $scope.searchPage = function (type) {
            var dialog= ngDialog.open({
                template: 'app/views/custom/frame/frame-list.html',
                className: 'ngdialog-theme-default max-dialog',
                controller: 'FrameListController',
                data: {inDialog: true}
            });
            dialog.closePromise.then(function(data){
                if(!data.value.status){
                    return;
                }
                //不同的type对应不同位置的img
                var url = data.value.url;
                if(type === 1){
                    _.set($scope.obj, 'firstHead.href', url);
                }else if(type === 2){
                    _.set($scope.obj, 'secondHead.href', url);
                }else if(type === 3){
                    _.set($scope.obj, 'thirdHead.href', url);
                }
            });
        }

        //电视剧列表
        $scope.starTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.starList){
                    $scope.obj.starList = [];
                }
                $defer.resolve($scope.obj.starList);
            }
        });

        $scope.addStarItem = function(data){
            $scope.obj.starList.push(data);
        }

        $scope.deleteStarItem = function(row){
            $scope.obj.starList = _.without($scope.obj.starList , row);
            $scope.starTableParams.reload();
        }

        //在img里面进行设置
        $scope.searchImgInRow = function(row){
            var dialog= ngDialog.open({
                template: 'app/views/custom/admin/img/img-list.html',
                className: 'ngdialog-theme-default max-dialog',
                controller: 'ImageListController',
                data: {inDialog: true}
            });
            dialog.closePromise.then(function(data){
                if(!data.value.status){
                    return;
                }
                //不同的type对应不同位置的img
                row.url = data.value.url;
            });
        }

        //在img里面进行设置
        $scope.searchPageInRow = function(row){
            var dialog= ngDialog.open({
                template: 'app/views/custom/frame/frame-list.html',
                className: 'ngdialog-theme-default max-dialog',
                controller: 'FrameListController',
                data: {inDialog: true}
            });
            dialog.closePromise.then(function(data){
                if(!data.value.status){
                    return;
                }
                //不同的type对应不同位置的img
                row.href = data.value.url;
            });
        }

    }
})();