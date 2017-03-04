'use strict';
angular.module('app')
    .controller('UI', function($scope, $Until, $element, $state, $stateParams, NgTableParams, RecordList, DataSearch) {

        $scope.dimensions = [{
            id: 0,
            name: '沟通方式'
        }, {
            id: 1,
            name: '职级'
        }, {
            id: 2,
            name: '近3年商业领袖职能'
        }, {
            id: 3,
            name: '近3年海外回机关',
            checked: true
        }, {
            id: 4,
            name: '沟通发起'
        }, {
            id: 5,
            name: '部门'
        }, {
            id: 6,
            name: '年龄数'
        }, {
            id: 7,
            name: '是否管理者'
        }, {
            id: 8,
            name: '人才类型'
        }, {
            id: 9,
            name: '工作地'
        }]


        DataSearch.query(function(res) {
            $scope.dataSearch = res.rows;
            console.log(res)
        })

        $scope.alert = function() {
            $Until.alert('这里是信息', function() {
                console.log('这里是返回')
            })
        }
        $scope.alert1 = function() {
            $Until.alert({
                title: '这里是标题',
                message: '这里是信息',
                callback: function() {
                    console.log('这里是返回')
                }
            })
        }

        $scope.confirm = function() {
            $Until.confirm('这里是信息', function(res) {
                console.log('这里是返回:' + res)
            })
        }

        $scope.confirm1 = function() {
            $Until.confirm({
                title: '这里是标题',
                message: '这里是信息',
                callback: function(res) {
                    console.log('这里是返回:' + res)
                }
            })
        }

        $scope.prompt = function() {
            $Until.prompt('这里是信息', function(res) {
                console.log('这里是返回:' + res)
            })
        }
        $scope.promptNumber = function() {
            $Until.prompt({
                title: '这里是标题',
                message: '这里是信息',
                inputType: 'number',
                callback: function(res) {
                    console.log('这里是返回:' + res)
                }
            })
        }
        $scope.promptTextarea = function() {
            $Until.prompt({
                title: '这里是标题',
                message: '这里是信息',
                inputType: 'textarea',
                callback: function(res) {
                    console.log('这里是返回:' + res)
                }
            })
        }
        $scope.promptPassword = function() {
            $Until.prompt({
                title: '这里是标题',
                message: '这里是信息',
                inputType: 'password',
                callback: function(res) {
                    console.log('这里是返回:' + res)
                }
            })
        }
        $scope.promptSelect = function() {
            $Until.prompt({
                title: '这里是标题',
                message: '这里是信息',
                inputType: 'select',
                inputOptions: [{
                    text: 'Choose one...',
                    value: '',
                }, {
                    text: 'Choice One',
                    value: '1',
                }, {
                    text: 'Choice Two',
                    value: '2',
                }, {
                    text: 'Choice Three',
                    value: '3',
                }],
                callback: function(res) {
                    console.log('这里是返回:' + res)
                }
            })
        }
        $scope.promptCheckbox = function() {
            $Until.prompt({
                title: '这里是标题',
                message: '这里是信息',
                inputType: 'checkbox',
                inputOptions: [{
                    text: 'Choose one...',
                    value: '0',
                }, {
                    text: 'Choice One',
                    value: '1',
                }, {
                    text: 'Choice Two',
                    value: '2',
                }, {
                    text: 'Choice Three',
                    value: '3',
                }],
                callback: function(res) {
                    console.log('这里是返回:' + res)
                }
            })
        }

        $scope.modal = {
            "title": "Title",
            "content": "Hello Modal<br />This is a multiline message!"
        };
        $scope.dialog = function() {
            return $Until.dialog('这里是标题', '这里是信息<br>这里是信息')
        }

    });
