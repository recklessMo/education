(function () {
    'use strict';
    angular
        .module('custom')
        .controller('PostListController', PostListController);
    PostListController.$inject = ['$scope', 'PostService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function PostListController($scope, PostService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        $scope.tableParams = {page: 1, count: 10000, searchStr: null}

        $scope.activate = function () {
            $scope.postTableParams = new NgTableParams($scope.tableParams, {
                counts:[],
                getData: function ($defer, params) {
                    blockUI.start();
                    PostService.listPosts(params.parameters()).success(function (data) {
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


        $scope.download = function (item) {
            window.open("http://www.zhiyouchuanmei.com/php/uploads/" + item.file,'_blank');
        }

    }
})();