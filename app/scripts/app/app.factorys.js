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
    }])
    .factory('$tableParams', ['NgTableParams',function (NgTableParams) {
    	return {
    		creat:function(scope,options){
    			return new NgTableParams({
                    count: 5
                }, angular.extend({
                    counts: [5, 10, 20],
                    dataset: null
                },options,true))
    		}
    	};
    }])
    .factory('$tableParamsLock', ['$tableParams', function($tableParams) {
        return {
            init: function(scope, lockTableObj) {
                scope.tableParamsLock = $tableParams.creat(scope)

                scope.$watch(function() {
                    return scope.tableParamsLock.sorting();
                }, function(sort) {
                    lockTableObj.sorting(sort);
                }, true)

            },
            settings: function(scope, settings) {
                scope.tableParamsLock.settings(settings)
            }
        };
    }]);
