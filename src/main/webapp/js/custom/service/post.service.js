(function () {
    'use strict';

    angular
        .module('custom')
        .service('PostService', PostService);

    PostService.$inject = ['$http'];
    function PostService($http) {

        this.listPosts = function (obj) {
            return $http({
                method: "POST",
                url: "/v1/post/list",
                data: obj,
                timeout: 5000
            });
        }



    }
})
();
