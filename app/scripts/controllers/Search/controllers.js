'use strict';
angular.module('app')
    .controller('Search', function($scope, $element, $state, $stateParams, $tableParams, SimpleList) {

        // console.log('Search $stateParams',$stateParams)

        $scope.data = [];
        $scope.statistics = {
            record: 0,
            chart: 0,
            track: 0,
            database: 0
        }

        $scope._view = _view;


        $scope.tableParams = $tableParams.creat($scope, {
            getData: function(params) {
                // console.log('params.url()',params.url())
                return SimpleList.get(angular.extend(params.url(), {
                    filter: $stateParams
                })).$promise.then(function(res) {

                    console.log(res);
                    $scope.data = res.rows

                    $scope.statistics = res.statistics;
                    params.total(res.total);


                    return res.rows;
                });
            }
        })

        $scope.tableParamsLock=$tableParams.creat($scope);

        $tableParams.bind($scope,'tableParams','tableParamsLock')


        function _view(id) {
            console.log('_view');
            $state.go('web.SearchView', { id: id });
        }

    });
