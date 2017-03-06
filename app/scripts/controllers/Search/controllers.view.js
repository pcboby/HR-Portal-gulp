'use strict';
angular.module('app')
    .controller('SearchView', function($rootScope, $scope, $Until, $element, $stateParams, NgTableParams, RecordList) {
        
        $scope.$on('$destroy', function(){
            $rootScope.settings.hasEdit=[];
        });

        $scope.pageType = 'VIEW'; //EDIT or VIEW

        $scope._saveAll = _saveAll;
        $scope._save = _save;

        function _save() {
            $scope.pageType = 'VIEW';
            $Until.alert('保存成功！')
        }

        function _saveAll() {
            $rootScope.settings.hasEdit = [];
            console.log('do _saveAll');
            _save();
        }

    });
