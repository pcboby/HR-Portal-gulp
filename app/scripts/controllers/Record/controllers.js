;
(function() {
    'use strict';
    app
        .controller('Record', function($scope, $element, $state, $stateParams, $tableParams, $tableParamsLock, RecordList) {


            $scope.forms = {
                userName: $stateParams.userName || '',
                department: $stateParams.department || '',
                dateEntryFrom: $stateParams.dateEntryFrom || '',
                dateEntryUntil: $stateParams.dateEntryUntil || ''
            }

            $scope.data = [];
            $scope.checked = 0; //已经选中数量
            $scope.unchecked = 0; //未选中数量
            $scope.total = 0; //当前显示数量

            $scope._search = _search;
            $scope._refresh = _refresh;
            $scope._reset = _reset;
            $scope._view = _view;
            $scope._add = _add;
            $scope._del = _del;
            $scope._edit = _edit;
            $scope._import = _import;
            $scope._export = _export;

            $scope.checkboxes = {
                checked: false,
                items: {}
            };

            $scope.$watch(function() {
                console.log($scope.checkboxes)
                return $scope.checkboxes.checked;
            }, function(value) {
                angular.forEach($scope.data, function(item) {
                    $scope.checkboxes.items[item.id] = value;
                });
            });

            $scope.$watch(function() {
                return $scope.checkboxes.items;
            }, function(values) {
                console.log('items', $scope.checkboxes.items);
                $scope.checked = 0;
                $scope.unchecked = 0;
                // $scope.total = $scope.data.length;
                angular.forEach($scope.data, function(item) {
                    $scope.checked += ($scope.checkboxes.items[item.id]) || 0;
                    $scope.unchecked += (!$scope.checkboxes.items[item.id]) || 0;
                });
                if (($scope.unchecked == 0) || ($scope.checked == 0)) {
                    $scope.checkboxes.checked = ($scope.checked == $scope.total && $scope.checked != 0);
                }
                // grayed checkbox
                angular.element($element[0].getElementsByClassName("select-all")).prop("indeterminate", ($scope.checked != 0 && $scope.unchecked != 0));
            }, true);

            // $scope.tableParams = new NgTableParams({
            //     count: 5
            // }, {
            //     counts: [5, 10, 20],
            //     // dataset: $scope.data
            //     getData: function(params) {
            //         return RecordList.get(params.url()).$promise.then(function(res) {
            //             params.total(res.total); // recal. page nav controls
            //             $scope.data = res.rows
            //             return $scope.data;
            //         });
            //     }
            // });

            $scope.tableParams = $tableParams.creat($scope, {
                getData: function(params) {
                    // console.log('params.url()',params.url())
                    return RecordList.get(angular.extend(params.url(), {
                        filter: $stateParams
                    })).$promise.then(function(res) {

                        console.log(res);
                        $scope.data = res.rows
                        $scope.total = res.total

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

            function _search() {
                console.log('_search', $scope.forms);
                $state.go('web.Record', $scope.forms)

            }

            function _refresh() {
                console.log('_refresh');
                $scope.tableParams.reload();
            }

            function _reset() {
                console.log('_reset');
                // $scope.tableParams.sorting({}).filter({}).pages(1);
                for (var e in $scope.forms) {
                    $scope.forms[e] = '';
                }
            }

            function _view(id) {
                console.log('_view');
                $state.go('web.RecordView', { id: id });
            }

            function _add() {
                console.log('_add');
                $state.go('web.RecordAdd');
            }

            function _del(id) {
                console.log('_del', id || getIdsByChecked());
                var ids = id || getIdsByChecked();
                bootbox.confirm('您确定要删除［' + ids + '］吗？', function(evt) {
                    if (evt) {
                        RecordList.remove({
                            ids: ids
                        }, function(res) {
                            if (res.status == 1) {
                                bootbox.alert('删除成功！')
                                _refresh();
                            } else {
                                bootbox.alert(res.msg);
                            }
                        })
                    }
                });
            }

            function _edit(id) {
                console.log('_edit', id);
                $state.go('web.RecordEdit', { id: id });
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

        })
})()
