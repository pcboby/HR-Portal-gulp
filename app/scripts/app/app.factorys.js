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
    .factory('$tableParams', ['NgTableParams', '$document', function(NgTableParams, $document) {
        return {
            creat: function(scope, options) {
                var nt = new NgTableParams({
                    count: 5
                }, angular.extend({
                    counts: [5, 10, 20],
                    dataset: null
                }, options, true))

                // nt.checkboxes = {
                //     allchecked: false,
                //     items: {}
                // };

                scope.$watch(function(){
                    return nt.data
                },function(d){
                    nt.checkboxes={
                        allchecked: false,
                        items: {}
                    }
                },true)

                scope.$watch(function() {
                    // console.log('nt.checkboxes',nt.checkboxes)
                    return nt.checkboxes.allchecked;
                }, function(value) {
                    // console.log(nt.data)
                    angular.forEach(nt.data, function(item) {
                        nt.checkboxes.items[item.id] = value;
                    });
                });

                scope.$watch(function() {
                    return nt.checkboxes.items;
                }, function(values) {
                    var checked = 0;
                    var unchecked = 0;
                    var total = nt.data.length;

                    angular.forEach(nt.data, function(item) {
                        checked += (nt.checkboxes.items[item.id]) || 0;
                        unchecked += (!nt.checkboxes.items[item.id]) || 0;
                    });

                    // console.log('nt.checkboxes.items', nt.checkboxes.items);

                    nt.hasChecked = checked > 0;

                    if ((unchecked == 0) || (checked == 0)) {
                        nt.checkboxes.allchecked = (checked == total && checked != 0);
                    }
                    // grayed checkbox
                    angular.element($document[0].getElementsByClassName("select-all")).prop("indeterminate", (checked != 0 && unchecked != 0));
                }, true);
                return nt
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
