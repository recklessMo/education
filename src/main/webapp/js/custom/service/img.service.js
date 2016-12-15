(function () {
    'use strict';

    angular
        .module('custom')
        .service('ImgService', ImgService);

    ImgService.$inject = ['$http'];
    function ImgService($http) {

        this.listImgs = function(obj) {
            return $http({
                method: "POST",
                url : "/v1/img/list",
                data:obj,
                timeout: 5000
            });
        }

        this.addImg = function(img){
            return $http({
                method: "POST",
                url : "/v1/img/add",
                data: img,
                timeout:5000
            });
        }

        this.deleteImg = function(id){
            return $http({
                method: "POST",
                url : "/v1/img/delete",
                data: id,
                timeout:5000
            });
        }


    }
})
();
