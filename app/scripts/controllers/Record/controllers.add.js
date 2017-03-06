'use strict';
angular.module('app')
    .controller('RecordAdd', function($rootScope,$scope,$Until, $element, $stateParams, NgTableParams, RecordList) {
    	$scope.pageType='EDIT';//EDIT or VIEW

    	$scope._saveAll=_saveAll;
    	$scope._save=_save;

    	function _save(){
    		$Until.alert('保存成功！')
    	}

    	function _saveAll(){
    		$rootScope.settings.hasEdit=[];
    		console.log('do _saveAll');
    	}

    });
