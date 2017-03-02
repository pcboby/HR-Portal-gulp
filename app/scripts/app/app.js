'use strict';
var app = angular.module('app', [
        'ui.router',
        'oc.lazyLoad',
        'mgcrea.ngStrap',
        'ngSanitize',
        "ngResource",
        "ngAnimate",
        'ngTable',
        'app.config',
        'app.routers',
        'app.factorys',
        'app.directives',
        'app.resources',
        'app.filters'
    ])
    .run(['$rootScope', 'settings', '$state', function($rootScope, settings, $state) {
        $rootScope.$state = $state;
    }]);
