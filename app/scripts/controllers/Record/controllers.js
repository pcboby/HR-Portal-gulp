'use strict';
angular.module('app')
    .controller('Record', function($scope, $element, $Until, $state, $stateParams, $tableParams, RecordList) {


        $scope.forms = {
            userName: $stateParams.userName || 'Gear',
            department: $stateParams.department || '',
            dateEntryFrom: $stateParams.dateEntryFrom || '',
            dateEntryUntil: $stateParams.dateEntryUntil || ''
        }

        $scope.data_users=[{
            value:'Gear',
            label:'<i class="fa fa-gear"></i> Gear'
        },{
            value:'Globe',
            label:'<i class="fa fa-globe"></i> Globe'
        },{
            value:'Heart',
            label:'<i class="fa fa-heart"></i> Heart'
        },{
            value:'Camera',
            label:'<i class="fa fa-camera"></i> Camera'
        }]

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


        $scope.tableParams = $tableParams.creat($scope, {
            getData: function(params) {
                // console.log('params.url()',params.url())
                return RecordList.get(angular.extend(params.url(), {
                    filter: $stateParams
                })).$promise.then(function(res) {

                    // console.log(res);
                    $scope.data = res.rows
                    
                    params.total(res.total);

                    return res.rows;
                });
            }
        })

        $scope.tableParamsLock=$tableParams.creat($scope);

        $tableParams.bind($scope,'tableParams','tableParamsLock')

        // $tableParamsLock.init($scope, $scope.tableParams);

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
            $Until.confirm('您确定要删除［' + ids + '］吗？', function(evt) {
                if (evt) {
                    RecordList.remove({
                        ids: ids
                    }, function(res) {
                        if (res.status == 1) {
                            $Until.alert('删除成功！')
                            _refresh();
                        } else {
                            $Until.alert(res.msg);
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
            angular.forEach($scope.tableParams.checkboxes.items, function(item, key) {
                if (item) {
                    arr.push(key)
                }
            });
            return arr.join();
        }

    });
