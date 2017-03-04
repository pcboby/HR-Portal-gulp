'use strict';
angular.module('app')
    .controller('Database', function($scope, $element, $state, $stateParams, NgTableParams, RecordList) {

        $scope.states = [{
            'value': '',
            'label': '全部'
        }, {
            'value': '1',
            'label': '在职'
        }, {
            'value': '0',
            'label': '离职'
        }];

        $scope.forms = {
            department: '',
            dateEntryFrom: '',
            dateEntryUntil: '',
            state: ''
        }

        $scope.data = [];

        $scope._search = _search;
        $scope._refresh = _refresh;
        $scope._reset = _reset;
        $scope._view = _view;
        $scope._edit = _edit;
        $scope._import = _import;
        $scope._export = _export;

        $scope.tableParams = new NgTableParams({
            count: 5
        }, {
            counts: [5, 10, 20],
            // dataset: $scope.data
            getData: function(params) {
                return RecordList.get(params.url()).$promise.then(function(res) {
                    params.total(res.total); // recal. page nav controls
                    $scope.data = res.rows
                    return $scope.data;
                });
            }
        });

        function _search() {
            console.log('_search');
        }

        function _refresh() {
            console.log('_refresh');
            $scope.tableParams.reload();
        }

        function _reset() {
            console.log('_reset');
            $scope.tableParams.sorting({}).filter({}).pages(1);
        }

        function _view(id) {
            console.log('_view');
            $state.go('web.DatabaseView', { id: id });
        }

        function _edit(id) {
            console.log('_edit');
            $state.go('web.DatabaseView', { id: id });
        }

        function _import() {
            console.log('_import');
        }

        function _export(type) {
            console.log('_export', type);
        }

        function getIdsByChecked() {
            var arr = [];
            angular.forEach($scope.checkboxes.items, function(item, key) {
                if (item) {
                    arr.push(key)
                }
            });
            return arr.join();
        }

    });
