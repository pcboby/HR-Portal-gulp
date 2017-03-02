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
        $ocLazyLoadProvider.config({});
    }])
    //设置初始化变量
    .config(['$controllerProvider', function($controllerProvider) {
        $controllerProvider.allowGlobals();
    }])
    .config([
        '$modalProvider', '$tooltipProvider', '$popoverProvider', '$typeaheadProvider', '$datepickerProvider', '$timepickerProvider', '$dropdownProvider', '$selectProvider',
        function($modalProvider, $tooltipProvider, $popoverProvider, $typeaheadProvider, $datepickerProvider, $timepickerProvider, $dropdownProvider, $selectProvider) {
            var defaultOptions = {
                // animation: 'am-flip-x',
                container: 'body',
            }
            angular.extend($modalProvider.defaults, defaultOptions, {});
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

        }
    ]);
