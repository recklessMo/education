/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/app');

        //
        // Application Routes
        // -----------------------------------

        //下面两个state用于负责主页的内容,主要包括左边栏,上边栏等.
        $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: helper.basepath('app.html'),
            resolve: helper.resolveFor('fastclick', 'modernizr', 'ui.select', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl','ngTable', 'oitozero.ngSweetAlert', 'ngDialog','filestyle','angularFileUpload')
        })
        .state('app.account', {
            url: '/account',
            title: '帐号管理',
            templateUrl: helper.basepath('custom/admin/account/account.html')
        })
        .state('app.upload', {
            url: '/upload',
            title: '文件上传',
            templateUrl: helper.basepath('custom/admin/img/img-list.html')
        })
        .state('app.frame', {
            url: '/cover',
            title: '页面管理',
            templateUrl: helper.basepath('custom/frame/frame-list.html'),
            resolve: helper.resolveFor('angucomplete-alt')
        })
        .state('app.post', {
            url: '/post',
            title: '剧本投递',
            templateUrl: helper.basepath('custom/post/post-list.html'),
        })
        .state('page', {
            url: '/page',
            templateUrl: helper.basepath('page.html'),
            controller: ['$rootScope', function($rootScope) {
                $rootScope.app.layout.isBoxed = false;
            }]
        })
        .state('page.login', {
            url: '/login',
            title: 'Login',
            templateUrl: helper.basepath('login.html')
        });
    }

})();

