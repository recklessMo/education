(function () {
    'use strict';
    angular
        .module('custom')
        .controller('StarDetailController', StarDetailController);
    StarDetailController.$inject = ['$scope', 'CoverService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function StarDetailController($scope, CoverService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        //当前使用的数据
        $scope.obj = JSON.parse($scope.ngDialogData.item.content);
        $scope.obj.id = angular.isUndefined($scope.ngDialogData.item.id) ? 0: $scope.ngDialogData.item.id;

        //发布
        $scope.publish = function () {
            //todo判断是否都填写完整了?
            var data = $scope.obj;
            CoverService.publishStarDetail(data).success(function (data) {
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
                    _.set($scope.obj, 'firstLeft', url);
                }else if(type === 2){
                    _.set($scope.obj, 'firstRight', url);
                }else if(type === 3){
                    _.set($scope.obj, 'secondLeft', url);
                }else if(type === 4){
                    _.set($scope.obj, 'secondRight', url);
                }else if(type === 5){
                    _.set($scope.obj, 'thirdLeft', url);
                }else if(type === 6){
                    _.set($scope.obj, 'thirdMiddle', url);
                }else if(type === 7){
                    _.set($scope.obj, 'thirdRight', url);
                }else if(type === 8){
                    _.set($scope.obj, 'fourthLeft', url);
                }else if(type === 9){
                    _.set($scope.obj, 'fourthRight', url);
                }
            });
        }

    }
})();