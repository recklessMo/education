(function () {
    'use strict';
    angular
        .module('custom')
        .controller('UploadImgController', UploadImgController);
    UploadImgController.$inject = ['FileUploader', '$scope', 'SweetAlert'];
    function UploadImgController(FileUploader, $scope, SweetAlert) {

        $scope.obj = {};

        var vm = this;

        activate();

        ////////////////
        function activate() {
            var uploader = vm.uploader = new FileUploader({
                //上传的地址
                url: '/v1/img/add'
            });

            // FILTERS
            uploader.filters.push({
                name: 'customFilter',
                fn: function(/*item, options*/) {
                    return this.queue.length < 10;
                }
            });

            // CALLBACKS
            uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function(item) {
                if(angular.isUndefined($scope.obj.name) || $scope.obj.name == ''){
                    item.formData.push({});
                }else{
                    item.formData.push({temp:$scope.obj.name});
                }
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
                SweetAlert.success("上传成功");
                vm.uploader.queue = [];
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
                SweetAlert.error("上传失败, 请重新上传!");
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
                //清除上传列表
                //vm.uploader.queue = [];
            };

            console.info('uploader', uploader);
        }

    }

})();