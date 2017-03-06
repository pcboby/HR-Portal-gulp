'use strict';
angular.module('app.config', [])
    //配置angular页面标识，默认:{{}}
    // .config(['$interpolateProvider', function($interpolateProvider) {
    //     // $interpolateProvider.startSymbol('//');
    //     // $interpolateProvider.endSymbol('//');
    // }])
    //配置路由替代字符，默认:!(1.6＋版)
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    //配置预加载默认值
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            // debug: false,
            // event: false
        });
    }])
    //设置初始变量
    .config(['$controllerProvider', function($controllerProvider) {
        $controllerProvider.allowGlobals();
    }])
    //设置拦截器
    .config(['$httpProvider', function($httpProvider) {
        //request token
        // $httpProvider.interceptors.push('SessionToken');
        //request timer
        $httpProvider.interceptors.push('TimerInterceptor');
        //request intercept
        $httpProvider.interceptors.push('HttpInterceptor');
    }])
    //设置angular-strap插件默认值
    .config(function($modalProvider, $tooltipProvider, $popoverProvider, $typeaheadProvider, $datepickerProvider, $timepickerProvider, $dropdownProvider, $selectProvider) {
        var defaultOptions = {
            // animation: 'am-flip-x',
            container: 'body',
        };
        angular.extend($modalProvider.defaults, defaultOptions, {
            animation: 'am-fade-and-scale'
        });
        angular.extend($tooltipProvider.defaults, defaultOptions, {
            trigger: 'hover'
        });
        angular.extend($popoverProvider.defaults, defaultOptions, {
            trigger: 'hover'
        });
        angular.extend($typeaheadProvider.defaults, defaultOptions, {
            minLength: 2,
            limit: 8
        });
        angular.extend($datepickerProvider.defaults, defaultOptions, {
            dateFormat: 'yyyy-MM-dd',
            startWeek: 1
        });
        angular.extend($timepickerProvider.defaults, defaultOptions, {
            timeFormat: 'HH:mm',
            length: 7
        });
        angular.extend($dropdownProvider.defaults, defaultOptions, {
            trigger: 'hover'
        });
        angular.extend($selectProvider.defaults, defaultOptions, {
            sort: false
        });

    });
