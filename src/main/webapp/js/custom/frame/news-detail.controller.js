(function () {
    'use strict';
    angular
        .module('custom')
        .controller('NewsDetailController', NewsDetailController);
    NewsDetailController.$inject = ['$scope', 'CoverService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function NewsDetailController($scope, CoverService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        //当前使用的数据
        $scope.obj = JSON.parse($scope.ngDialogData.item.content);
        $scope.obj.id = angular.isUndefined($scope.ngDialogData.item.id) ? 0: $scope.ngDialogData.item.id;

        //发布
        $scope.publish = function () {
            //todo判断是否都填写完整了?
            var data = $scope.obj;
            CoverService.publishNewsDetail(data).success(function (data) {
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
                    _.set($scope.obj, 'headImg', url);
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

        //详细介绍
        $scope.introTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.introList){
                    $scope.obj.introList = [];
                }
                $defer.resolve($scope.obj.introList);
            }
        });

        $scope.addIntroItem = function(data){
            $scope.obj.introList.push(data);
        }

        $scope.deleteIntroItem = function(row){
            $scope.obj.introList = _.without($scope.obj.introList , row);
            $scope.introTableParams.reload();
        }

        //海报
        $scope.postTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.postList){
                    $scope.obj.postList = [];
                }
                $defer.resolve($scope.obj.postList);
            }
        });

        $scope.addPostItem = function(data){
            $scope.obj.postList.push(data);
        }

        $scope.deletePostItem = function(row){
            $scope.obj.postList = _.without($scope.obj.postList , row);
            $scope.postTableParams.reload();
        }

        //影评
        $scope.commentTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.commentList){
                    $scope.obj.commentList = [];
                }
                $defer.resolve($scope.obj.commentList);
            }
        });

        $scope.addCommentItem = function(data){
            $scope.obj.commentList.push(data);
        }

        $scope.deleteCommentItem = function(row){
            $scope.obj.commentList = _.without($scope.obj.commentList , row);
            $scope.commentTableParams.reload();
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