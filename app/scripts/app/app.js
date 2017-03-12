'use strict';
angular.module('app', [
        'ui.router',
        'ui.slimscroll',
        'oc.lazyLoad',
        'mgcrea.ngStrap',
        'ngSanitize',
        'angularFileUpload',
        "ngResource",
        "ngAnimate",
        'ngTable',
        'app.config',
        'app.routers',
        'app.factorys',
        'app.directives',
        'app.resources',
        'app.filters',
        'ngCombobox'
    ])
    .run(['$rootScope', 'settings', '$state', function($rootScope, settings, $state) {
        $rootScope.$state = $state;
    }]);
