'use strict';
angular.module('ngCombobox', [])
    .directive('ngComboboxInputGroup', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.combobox.input.group.html',
            replace: true,
            scope: {
                $model: '=ngModel',
                $disabled: '=ngDisabled',
                $placeholder: '@placeholder',
                $addon: '@addon',
                $maxlength: '@maxlength',
                $type: '@type',
                $name: '@name'
            },
            link: function(scope) {
                scope.$type = scope.$type || 'text';
            }
        };
    }])
    .directive('ngComboboxInputUserGroup', function($modal, $tableParams, SimpleUsers) {
        return {
            restrict: 'AEC',
            replace: true,
            templateUrl: 'tpls/model.combobox.input.user.group.html',
            scope: {
                $model: '=ngModel',
                $disabled: '=ngDisabled',
                $placeholder: '@placeholder',
                $searchButton: '@searchButton'
            },
            controller: function($scope) {
                function formatter(d) {
                    if (angular.isArray(d)) {
                        angular.forEach(d, function(item) {
                            item.label = item.name + ' ' + item.keys;
                        });
                    }
                    if (angular.isObject(d)) {
                        d.label = d.name + ' ' + d.keys;
                    }
                    return d;
                }

                $scope.$model = formatter($scope.$model);

                $scope.$getter = function(value) {
                    return SimpleUsers.query({ keywords: angular.isObject(value) ? value.keys : value }).$promise.then(function(res) {
                        return formatter(res.rows);
                    });
                };

                $scope.$onSelection=function(e, m, l, evt){
                    console.log('1111111111',e)
                }

                $scope.$getModel = function() {
                    return $scope.$model;
                };

                $scope.$setter = function(data) {
                    $scope.$model = formatter(data);
                };

                $scope.$open = function() {
                    $modal({
                        title: '人员选择：',
                        scope: $scope,
                        templateUrl: $scope.$modalTemplate,
                        controller: function($scope) {
                            $scope.$selection = $scope.$getModel() || '';
                            $scope.$filter = '';
                            $scope.userTableParams = $tableParams.creat($scope, {
                                getData: function(params) {
                                    return SimpleUsers.get(angular.extend({}, {
                                        page: params.url().page,
                                        count: params.url().count,
                                        keywords: params.url()['filter[%24]']
                                    })).$promise.then(function(res) {
                                        // console.log(res);
                                        $scope.data = res.rows;
                                        params.total(res.total);
                                        return res.rows;
                                    });
                                }
                            });
                            $scope.$watch(function() {
                                return $scope.$filter;
                            }, function(val) {
                                $scope.userTableParams.filter({ $: val });
                            });
                            //列表选择
                            $scope._selectItem = function(d) {
                                if ($scope.$selection.keys === d.keys) {
                                    $scope.$selection = '';
                                } else {
                                    $scope.$selection = angular.copy(d);
                                }
                            };

                            $scope._save = function() {
                                // console.log('$scope._getDepartment()',$scope._getDepartment())
                                $scope.$setter(angular.copy($scope.$selection));
                            };
                        },
                        show: true
                    });
                };
            },
            link: function(scope) {
                scope.$dropTemplate = 'tpls/model.combobox.input.user.group.tpl.drop.html';
                scope.$modalTemplate = 'tpls/model.combobox.input.user.group.tpl.modal.html';



                // iElement.find('button[type=button]').on('click', scope.$open);
            }
        };
    })
    .directive('ngComboboxInputDepartmentGroup', function($modal, $tableParams, SimpleDepartment) {
        return {
            restrict: 'AEC',
            replace: true,
            templateUrl: 'tpls/model.combobox.input.department.group.html',
            scope: {
                $model: '=ngModel',
                $disabled: '=ngDisabled',
                $placeholder: '@placeholder',
                $searchButton: '@searchButton',
                $mini: '@mini'
            },
            controller: function($scope) {
                function formatter(d) {
                    if (angular.isArray(d)) {
                        angular.forEach(d, function(item) {
                            item.label = item.name + '（' + item.code + '）';
                        });
                    }
                    if (angular.isObject(d)) {
                        d.label = d.name + '（' + d.code + '）';
                    }
                    return d;
                }
                $scope.$modalCtrl = function($scope) {
                    $scope.$selections = [''];
                    $scope.$select = 0;
                    $scope.$filter = '';
                    $scope.departmentTableParams = $tableParams.creat($scope, {
                        getData: function(params) {
                            // console.log(params.url())
                            return SimpleDepartment.get(angular.extend({}, {
                                page: params.url().page,
                                count: params.url().count,
                                keywords: params.url()['filter[%24]'],
                                departmentLevel: params.url()['filter[departmentLevel]'],
                                upperDepartmentCode: params.url()['filter[upperDepartmentCode]']
                            })).$promise.then(function(res) {
                                // console.log(res);
                                $scope.data = res.rows;
                                params.total(res.total);
                                return res.rows;
                            });
                        }
                    });

                    function removeAfterByIdx(idx) {
                        for (var i = $scope.$selections.length - 1; i > idx; i--) {
                            $scope.$selections.remove(i);
                        }
                    }

                    $scope.$watch(function() {
                        return $scope.$filter + $scope.$select;
                    }, function() {
                        //取父级code
                        var upperDepartmentCode = $scope.$selections[$scope.$select - 1] ?
                            $scope.$selections[$scope.$select - 1].code ?
                            $scope.$selections[$scope.$select - 1].code :
                            '' :
                            '';
                        if (!!upperDepartmentCode) { //有父级code，按父级code查询
                            $scope.departmentTableParams.filter({
                                $: $scope.$filter,
                                upperDepartmentCode: upperDepartmentCode
                            });
                        } else { //无父级code，按0级查询
                            $scope.departmentTableParams.filter({
                                $: $scope.$filter,
                                departmentLevel: 0
                            });
                        }

                    });
                    //菜单选择
                    $scope._selectIdx = function(idx) {
                        $scope.$select = idx;
                        $scope.$filter = '';
                    };
                    //列表选择
                    $scope._selectItem = function(d) {
                        if ($scope.$selections[$scope.$select].code === d.code) {
                            removeAfterByIdx($scope.$select);
                            $scope.$selections[$scope.$select] = '';
                        } else {
                            $scope.$selections[$scope.$select] = angular.copy(d);
                            removeAfterByIdx($scope.$select);
                            if (d.hasChild === 'true') {
                                $scope.$selections.push('');
                            }
                        }

                    };
                    $scope._getDepartment = function() {
                        return $scope.$selections[$scope.$selections.length - 1] ? $scope.$selections[$scope.$selections.length - 1] : $scope.$selections[$scope.$selections.length - 2] ? $scope.$selections[$scope.$selections.length - 2] : '';
                    };
                    $scope._save = function() {
                        // console.log('$scope._getDepartment()',$scope._getDepartment())
                        $scope.$setter(angular.copy($scope._getDepartment()));
                    };
                };
                $scope.$modalCtrlMini = function($scope) {
                    $scope.$selections = [{
                        label: '一级部门',
                        data: ''
                    }, {
                        label: '二级部门',
                        data: ''
                    }, {
                        label: '三级部门',
                        data: ''
                    }, {
                        label: '四级部门',
                        data: ''
                    }, {
                        label: '五级部门',
                        data: ''
                    }, {
                        label: '六级部门',
                        data: ''
                    }, {
                        label: '七级部门',
                        data: ''
                    }, {
                        label: '八级部门',
                        data: ''
                    }];


                    function removeAfterByIdx(idx) {
                        for(var i=$scope.$selections.length-1;i>=idx;i--){
                            $scope.$selections[i].data='';
                            $scope.$selections[i].selected='';
                        }
                    }

                    $scope._getDepartment=function(){
                        for(var i=$scope.$selections.length-1;i>=0;i--){
                            if($scope.$selections[i].selected){
                                return $scope.$selections[i].selected
                            }
                        }
                        return '';
                    }

                    $scope._save = function() {
                        $scope.$setter(angular.copy($scope._getDepartment()));
                    };
                    
                    $scope.nextData=function(idx){
                        //清理
                        removeAfterByIdx(idx);
                        //初始0级
                        if(idx===0){
                            var params={departmentLevel: 0};
                            SimpleDepartment.query(params,function(res){
                                $scope.$selections[0].data=res.rows
                            });
                        }else if($scope.$selections[idx-1].selected&&$scope.$selections[idx-1].selected.hasChild==='true'){
                            var params={upperDepartmentCode:$scope.$selections[idx-1].selected.code};
                            SimpleDepartment.query(params,function(res){
                                $scope.$selections[idx].data=res.rows
                            });
                        }

                    }
                    //初始化
                    $scope.nextData(0);
                    

                };
                $scope.$model = formatter($scope.$model);
                $scope.$getter = function(value) {
                    return SimpleDepartment.query({ keywords: angular.isObject(value) ? value.keys : value }).$promise.then(function(res) {
                        return formatter(res.rows);
                    });
                };
                $scope.$setter = function(data) {
                    $scope.$model = formatter(data);
                };
                $scope.$open = function() {
                    $modal({
                        title: '部门选择：',
                        scope: $scope,
                        templateUrl: $scope.$mini == 'true' ? $scope.$modalTemplateMini : $scope.$modalTemplate,
                        controller: $scope.$mini == 'true' ? $scope.$modalCtrlMini : $scope.$modalCtrl,
                        show: true
                    });
                };
            },
            link: function(scope) {
                scope.$dropTemplate = 'tpls/model.combobox.input.department.group.tpl.drop.html';
                scope.$modalTemplate = 'tpls/model.combobox.input.department.group.tpl.modal.html';
                scope.$modalTemplateMini = 'tpls/model.combobox.input.department.group.tpl.modal.mini.html';

                // iElement.find('button[type=button]').on('click', scope.$open);
            }
        };
    })
    .directive('ngComboboxCheckbox', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.combobox.checkbox.html',
            replace: true,
            scope: {
                $model: '=ngModel',
                $disabled: '=ngDisabled',
                $label: '@label',
                $name: '@name',
                $inline: '@inline'
            }
        };
    }])
    .directive('ngComboboxCheckboxGroup', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.combobox.checkbox.group.html',
            replace: true,
            scope: {
                $model: '=ngModel',
                $data: '=ngData',
                $disabled: '=ngDisabled',
                $name: '@name',
                $inline: '@inline',
                $checkAll: '@checkAll'
            },
            controller: function($scope, $element) {
                $scope.checkAll = function() {
                    angular.forEach($scope.$data, function(item, index) {
                        $scope.$checks.items[index] = $scope.$checks.checkAll;
                    });
                    $scope.setter();
                };
                $scope.checkItem = function() {
                    var checked = 0;
                    var unchecked = 0;
                    var total = $scope.$data.length;

                    angular.forEach($scope.$data, function(item, index) {
                        checked += ($scope.$checks.items[index]) || 0;
                        unchecked += (!$scope.$checks.items[index]) || 0;
                    });

                    if ((unchecked === 0) || (checked === 0)) {
                        $scope.$checks.checkAll = (checked === total) && (checked !== 0);
                    }
                    // grayed checkbox
                    $element.find('.checkAll input[type=checkbox]').prop("indeterminate", (checked !== 0 && unchecked !== 0));
                    $scope.setter();
                };

                $scope.setter = function() {
                    var tmp = [];

                    angular.forEach($scope.$data, function(item, index) {
                        if ($scope.$checks.items[index]) {
                            tmp.push(item.value);
                        }
                    });

                    $scope.$model = tmp.join();
                };

            },
            link: function(scope) {
                scope.$name = scope.$name || 'checkboxGroup_' + getRandom(8);
                scope.$checks = {
                    checkAll: false,
                    items: {}
                };

                scope.$watch(function() {
                    return scope.$model;
                }, function(val) {
                    if (!!val) {
                        // console.log(val)
                        angular.forEach(scope.$data, function(item, index) {
                            scope.$checks.items[index] = val.indexOf(item.value) > -1;
                        });
                    } else {
                        scope.$checks.items = {};
                    }
                    scope.checkItem();

                });

            }
        };
    }])
    .directive('ngComboboxRadiobox', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.combobox.radiobox.html',
            replace: true,
            scope: {
                $model: '=ngModel',
                $disabled: '=ngDisabled',
                $value: '@value',
                $label: '@label',
                $name: '@name',
                $inline: '@inline'
            }

        };
    }])
    .directive('ngComboboxRadioboxGroup', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.combobox.radiobox.group.html',
            replace: true,
            scope: {
                $model: '=ngModel',
                $data: '=ngData',
                $disabled: '=ngDisabled',
                $name: '@name',
                $inline: '@inline'
            },



            link: function(scope) {
                scope.$name = scope.$name || 'radioGroup_' + getRandom(8);
                scope.$checks = {
                    item: null
                };
                scope.$watch(function() {
                    return scope.$model;
                }, function(val) {
                    scope.$checks.item = val;
                });
                scope.$watch(function() {
                    return scope.$checks.item;
                }, function(val) {
                    scope.$model = val;
                });
            }
        };
    }])
    .directive('ngComboboxSelectGroup', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.combobox.select.group.html',
            scope: {
                $model: '=ngModel',
                $data: '=ngData',
                $disabled: '=ngDisabled',
                $label: '@label',
                $options: '@options',
                $placeholder: '@placeholder',
                $checkAll: '@checkAll'
            },
            controller: function($scope, $document) {

                function traceAll() {
                    angular.element($document[0].getElementsByClassName('combo-select-all')).prop('indeterminate', ($scope.$model.length !== 0 && $scope.$model.length !== $scope.$data.length));
                }

                $scope.traceAll = traceAll;
            },
            link: function(scope) {
                scope.$model = angular.copy(scope.$model) || [];
                scope.$watch(function() {
                    return scope.$model;
                }, scope.traceAll);
            }
        };
    }])
    .directive('ngComboboxSelectMultipleGroup', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.combobox.select.Multiple.group.html',
            scope: {
                $model: '=ngModel',
                $data: '=ngData',
                $disabled: '=ngDisabled',
                $options: '@options',
                $multiple: '@multiple',
                $maxLength: '@maxLength',
                $placeholder: '@placeholder',
                $checkAll: '@checkAll',
                $selectedText: '@selectedText'
            },
            controller: function($scope, $document) {

                function traceAll() {
                    angular.element($document[0].getElementsByClassName('combo-select-all')).prop('indeterminate', ($scope.$model.length !== 0 && $scope.$model.length !== $scope.$data.length));
                }

                $scope.traceAll = traceAll;
            },
            link: function(scope) {
                scope.$model = angular.copy(scope.$model) || [];
                scope.$watch(function() {
                    return scope.$model;
                }, scope.traceAll);
            }
        };
    }]);
