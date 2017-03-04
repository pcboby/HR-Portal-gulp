'use strict';
angular.module('app.config', [])
    .config(['$interpolateProvider', function($interpolateProvider) {
        // $interpolateProvider.startSymbol('//');
        // $interpolateProvider.endSymbol('//');
    }])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    //配置预加载
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug:false,
            event:false
        });
    }])
    //设置初始化变量
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
    //设置插件
    .config(function($modalProvider, $tooltipProvider, $popoverProvider, $typeaheadProvider, $datepickerProvider, $timepickerProvider, $dropdownProvider, $selectProvider) {
        var defaultOptions = {
            // animation: 'am-flip-x',
            container: 'body',
        }
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
