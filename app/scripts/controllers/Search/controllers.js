'use strict';
angular.module('app')
    .controller('Search', function($scope, $element, $state, $stateParams, $tableParams, $tableParamsLock, SimpleList) {

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

                    $tableParamsLock.settings($scope, {
                        dataset: res.rows,
                        page: params.page(),
                        counts: params.count()
                    })

                    return res.rows;
                });
            }
        })

        $tableParamsLock.init($scope, $scope.tableParams);


        function _view(id) {
            console.log('_view');
            $state.go('web.SearchView', { id: id });
        }

    });
