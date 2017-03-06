'use strict';
angular.module('app')
    .controller('RecordView', function($rootScope,$scope, $element, $stateParams, NgTableParams, RecordList) {
        $scope.pageType = 'VIEW'; //EDIT or VIEW

        $scope._saveAll = _saveAll;
        $scope._save = _save;

        function _save() {
            $Until.alert('保存成功！')
        }

        function _saveAll() {
            $rootScope.settings.hasEdit = [];
            console.log('do _saveAll');
        }
    });
