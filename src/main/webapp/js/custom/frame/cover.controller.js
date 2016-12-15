(function () {
    'use strict';
    angular
        .module('custom')
        .controller('CoverController', CoverController);
    CoverController.$inject = ['$scope', 'CoverService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function CoverController($scope, CoverService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        //当前使用的数据
        $scope.obj = JSON.parse($scope.ngDialogData.item.content);

        //发布
        $scope.publish = function () {
            //判断是否都填写完整了
            if(angular.isUndefined($scope.obj.firstHead.url)
                || angular.isUndefined($scope.obj.firstHead.href)
                || angular.isUndefined($scope.obj.secondHead.url)
                || angular.isUndefined($scope.obj.secondHead.href)
                || angular.isUndefined($scope.obj.thirdHead.url)
                || angular.isUndefined($scope.obj.thirdHead.href)
                || angular.isUndefined($scope.obj.left.url)
                || angular.isUndefined($scope.obj.left.href)
                || angular.isUndefined($scope.obj.left.text)
                || angular.isUndefined($scope.obj.rightMiddle.url)
                || angular.isUndefined($scope.obj.rightMiddle.href)
                || angular.isUndefined($scope.obj.rightMiddle.text)
                || angular.isUndefined($scope.obj.rightBottom.url)
                || angular.isUndefined($scope.obj.rightBottom.href)
                || angular.isUndefined($scope.obj.rightBottom.text)
            ){
                SweetAlert.error("请填写完毕所有字段!");
                return ;
            }

            var data = $scope.obj;
            CoverService.publishCover(data).success(function (data) {
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
                }else if(type == 4){
                    _.set($scope.obj, 'left.url', url);
                }else if(type == 5){
                    _.set($scope.obj, 'rightMiddle.url', url);
                }else if(type == 6){
                    _.set($scope.obj, 'rightBottom.url', url);
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
                }else if(type == 4){
                    _.set($scope.obj, 'left.href', url);
                }else if(type == 5){
                    _.set($scope.obj, 'rightMiddle.href', url);
                }else if(type == 6){
                    _.set($scope.obj, 'rightBottom.href', url);
                }
            });
        }

    }
})();