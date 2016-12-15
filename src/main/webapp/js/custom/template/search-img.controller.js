(function () {
    'use strict';
    angular
        .module('custom')
        .controller('SearchImgControl', SearchImgControl);
    SearchImgControl.$inject = ['$scope', 'AccountService', 'SweetAlert', 'NgTableParams', 'ngDialog', 'blockUI', 'Notify'];

    function SearchImgControl($scope, AccountService, SweetAlert, NgTableParams, ngDialog, blockUI, Notify) {


    }
})();