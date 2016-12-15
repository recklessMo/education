(function () {
    'use strict';
    angular
        .module('custom')
        .controller('AboutController', AboutController);
    AboutController.$inject = ['$scope', 'CoverService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function AboutController($scope, CoverService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {

        //当前使用的数据
        $scope.obj = JSON.parse($scope.ngDialogData.item.content);
        $scope.obj.id = $scope.ngDialogData.item.id;

        //发布
        $scope.publish = function () {
            //判断是否都填写完整了
            if(angular.isUndefined($scope.obj.firstImg)
                || angular.isUndefined($scope.obj.secondImg)
                || angular.isUndefined($scope.obj.companyIntro)
                || angular.isUndefined($scope.obj.leaderPicList)
                || angular.isUndefined($scope.obj.teamPicList)
                || angular.isUndefined($scope.obj.companyCulture)
                || angular.isUndefined($scope.obj.corpText)
                || angular.isUndefined($scope.obj.resumePost)
            ){
                SweetAlert.error("请填写完毕所有字段!");
                return ;
            }

            var data = $scope.obj;
            CoverService.publishAbout(data).success(function (data) {
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
                    $scope.obj.firstImg = url;
                }else if(type === 2){
                    $scope.obj.secondImg = url;
                } else if(type === 3){
                    $scope.obj.officeImg = url;
                }
            });
        }

        //领导团队照片
        $scope.leaderPicTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.leaderPicList){
                    $scope.obj.leaderPicList = [];
                }
                $defer.resolve($scope.obj.leaderPicList);
            }
        });

        $scope.addLeaderItem = function(data){
            $scope.obj.leaderPicList.push(data);
        }

        $scope.deleteLeaderItem = function(row){
            $scope.obj.leaderPicList = _.without($scope.obj.leaderPicList , row);
            $scope.leaderPicTableParams.reload();
        }

        //团队照片
        $scope.teamPicTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.teamPicList){
                    $scope.obj.teamPicList = [];
                }
                $defer.resolve($scope.obj.teamPicList);
            }
        });

        $scope.addTeamPicItem = function(data){
            $scope.obj.teamPicList.push(data);
        }

        $scope.deleteTeamPicItem = function(row){
            $scope.obj.teamPicList = _.without($scope.obj.teamPicList , row);
            $scope.teamPicTableParams.reload();
        }

        //项目合作
        $scope.workTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.workList){
                    $scope.obj.workList = [];
                }
                $defer.resolve($scope.obj.workList);
            }
        });

        $scope.addWorkItem = function(data){
            $scope.obj.workList.push(data);
        }

        $scope.deleteWorkItem = function(row){
            $scope.obj.workList = _.without($scope.obj.workList , row);
            $scope.workTableParams.reload();
        }

        //简历投递
        $scope.resumeTableParams = new NgTableParams({}, {
            counts:[],
            getData: function($defer, params){
                if(!$scope.obj.resumeList){
                    $scope.obj.resumeList = [];
                }
                $defer.resolve($scope.obj.resumeList);
            }
        });

        $scope.addResumeItem = function(data){
            $scope.obj.resumeList.push(data);
        }

        $scope.deleteResumeItem = function(row){
            $scope.obj.resumeList = _.without($scope.obj.resumeList , row);
            $scope.resumeTableParams.reload();
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
                row.pic = data.value.url;
            });
        }

    }
})();