'use strict';
angular.module('app.factorys', [])
    .factory('settings', ['$rootScope', function($rootScope) {
        var settings = {
            layout: {
                pageState: 'Dashboard'
            }
        };

        $rootScope.settings = settings;

        return settings;
    }]);
