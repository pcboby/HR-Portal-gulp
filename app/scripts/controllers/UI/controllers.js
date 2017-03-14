'use strict';
angular.module('app')
    .controller('UI', function($scope, $Until, $element, $state, $stateParams, NgTableParams, RecordList, DataSearch) {

        $scope.dimensions = [{
            id: '1000',
            name: '沟通方式'
        }, {
            id: '1001',
            name: '职级'
        }, {
            id: '1002',
            name: '近3年商业领袖职能'
        }, {
            id: '1003',
            name: '近3年海外回机关',
            checked: true
        }, {
            id: '1004',
            name: '沟通发起'
        }, {
            id: '1005',
            name: '部门'
        }, {
            id: '1006',
            name: '年龄数'
        }, {
            id: '1008',
            name: '是否管理者'
        }, {
            id: '1009',
            name: '人才类型'
        }, {
            id: '1010',
            name: '工作地'
        }]


        $scope.data_choose = [{
            label: '选择1',
            value: '1001'
        }, {
            label: '选择2',
            value: '1002'
        }, {
            label: '选择3',
            value: '1003'
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

        $scope.forms={
            inputDepartmentGroup1:{
                id:"1",
                code:"0001",
                name:"董事长办公室",
                hasChild:"true",
                upperDepartmentCode:"null"
            }
        }


        $scope.icons = [{
            value:"Gear",
            label:"<i class='fa fa-gear'></i> Gear"
        },{
            value:"Globe",
            label:"<i class='fa fa-globe'></i> Globe"
        },{
            value:"Heart",
            label:"<i class='fa fa-heart'></i> Heart"
        },{
            value:"Camera",
            label:"<i class='fa fa-camera'></i> Camera"
        }];

        $scope.selectedIcon = {
            value:"Gear",
            label:"<i class='fa fa-gear'></i> Gear"
        };

        $scope.modal = {
            "title": "Title",
            "content": "Hello Modal<br />This is a multiline message!"
        };
        $scope.dialog = function() {
            return $Until.dialog('这里是标题', '这里是信息<br>这里是信息')
        }

    });
