(function () {
    'use strict';
    angular
        .module('custom')
        .controller('ImageListController', ImageListController);
    ImageListController.$inject = ['$scope', 'ImgService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function ImageListController($scope, ImgService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        $scope.tableParams = {page : 1, count : 10, searchStr: null}
        //如果在dialog里面就显示选择按钮, 这样可以复用一个页面, this is great!
        $scope.inDialog = angular.isUndefined($scope.ngDialogData) ? false : true

        $scope.activate = function() {
            $scope.imgTableParams = new NgTableParams($scope.tableParams, {
                getData: function ($defer, params) {
                    blockUI.start();
                    ImgService.listImgs(params.parameters()).success(function (data) {
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
        $scope.delete = function(id){
            SweetAlert.swal({
                title: '确认删除?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '是',
                cancelButtonText: '否',
                closeOnConfirm: true,
                closeOnCancel: true
            }, function(isConfirm){
                if (isConfirm) {
                    //这里可以进行调试,查看$scope,因为table会创建一个子scope
                    //然后子scope里面就不能用this了,因为this就指向了子scope,
                    //实际上在table的每一行里面的点击是调用了父scope的delete方法
                    blockUI.start();
                    ImgService.deleteImg(id).success(function () {
                        Notify.alert("删除成功!", {status:"success", timeout: 3000});
                        $scope.imgTableParams.reload();
                        blockUI.stop();
                    }).error(function(){
                        blockUI.stop();
                        SweetAlert.error("网络问题, 请稍后重试!");
                    });
                }
            });
        }

        //添加
        $scope.add = function(userId){
            var dialog= ngDialog.open({
                template: 'app/views/custom/admin/img/upload-img.html',
                controller: 'UploadImgController',
                className: 'ngdialog-theme-default custom-width-800',
                data : {id:userId, type:2}
            })
            dialog.closePromise.then(function(data){
                $scope.imgTableParams.reload();
            });
        }


        $scope.choose = function(item){
            var result = {status:1, url:item.url};
            $scope.closeThisDialog(result);
        }

    }
})();