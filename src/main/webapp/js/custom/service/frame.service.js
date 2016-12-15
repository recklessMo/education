(function () {
    'use strict';

    angular
        .module('custom')
        .service('FrameService', FrameService);

    FrameService.$inject = ['$http'];
    function FrameService($http) {

        this.listFrames = function(obj) {
            return $http({
                method: "POST",
                url : "/v1/page/list",
                data:obj,
                timeout: 5000
            });
        }

        this.addFrame = function(data){
            return $http({
                method: "POST",
                url : "/v1/page/add",
                data: data,
                timeout:5000
            });
        }

        this.deleteFrame = function(id){
            return $http({
                method: "POST",
                url : "/v1/page/delete",
                data: id,
                timeout:5000
            });
        }


    }
})
();
