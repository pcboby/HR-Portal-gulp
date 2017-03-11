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
                $data: '=ngData',
                $placeholder: '@placeholder',
                $options: '@options',
                // $dropTemplate: '@dropTemplate',
                // $modalTemplate: '@dropTemplate',
                $searchButton: '@searchButton'
            },
            controller: function($scope) {
                function formatter(d) {
                    angular.forEach(d, function(item, idx) {
                        item.label = item.name + ' (' + item.keys + ')'
                    })
                    return d
                }
                $scope.$getter = function(value) {
                    return SimpleUsers.query({ keywords: angular.isObject(value) ? value.keys : value }).$promise.then(function(res) {
                        return formatter(res.rows);
                    });
                }
                $scope.$open = function() {
                    var modal = $modal({
                        title: '人员选择：',
                        scope: $scope,
                        templateUrl: $scope.$modalTemplate,
                        controller: function($scope) {
                            $scope.$checks={
                                item:""
                            };
                            $scope.$checkItem=function(key){
                                $scope.$checks.item=key;
                            }
                            $scope.userTableParams = $tableParams.creat($scope, {
                                getData: function(params) {
                                    return SimpleUsers.get(params.url()).$promise.then(function(res) {
                                        // console.log(res);
                                        $scope.data = res.rows
                                        params.total(res.total);
                                        return res.rows;
                                    });
                                }
                            })
                        },
                        show: true
                    });
                }
            },
            link: function(scope, iElement, iAttrs) {
                scope.$dropTemplate = 'tpls/model.combobox.input.user.group.tpl.drop.html';
                scope.$modalTemplate = 'tpls/model.combobox.input.user.group.tpl.modal.html';
                iElement.find('button[type=button]').on('click', scope.$open);
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
