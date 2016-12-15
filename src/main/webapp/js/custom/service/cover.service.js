(function () {
    'use strict';

    angular
        .module('custom')
        .service('CoverService', CoverService);

    CoverService.$inject = ['$http'];
    function CoverService($http) {

        this.publishCover = function (obj) {
            return $http({
                method: "POST",
                url: "/v1/cover/publish/index",
                data: obj,
                timeout: 5000
            });
        }

        this.publishAbout = function (obj) {
            return $http({
                method: "POST",
                url: "/v1/cover/publish/about",
                data: obj,
                timeout: 5000
            });
        }

        this.publishMovieList = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/movieList",
                data: obj,
                timeout: 5000
            });
        }

        this.publishSeriesList = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/seriesList",
                data: obj,
                timeout: 5000
            });
        }

        this.publishIssueList = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/issueList",
                data: obj,
                timeout: 5000
            });
        }

        this.publishStarList = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/starList",
                data: obj,
                timeout: 5000
            });
        }

        this.publishFilmDetail = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/filmDetail",
                data: obj,
                timeout: 5000
            });
        }

        this.publishSeriesDetail = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/seriesDetail",
                data: obj,
                timeout: 5000
            });
        }

        this.publishIssueDetail = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/issueDetail",
                data: obj,
                timeout: 5000
            });
        }

        this.publishStarDetail = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/starDetail",
                data: obj,
                timeout: 5000
            });
        }

        this.publishNewsDetail = function(obj){
            return $http({
                method: "POST",
                url: "/v1/cover/publish/newsDetail",
                data: obj,
                timeout: 5000
            });
        }




    }
})
();
