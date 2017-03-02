;(function(){
	'use strict';
	app
	.controller('sliderController', ['$scope','$stateParams','SimpleData',function ($scope,$stateParams,SimpleData) {
	
			// console.log('sliderController $stateParams',$stateParams)
	
			$scope.selectedState=$stateParams.key||'';
	
			$scope.states = [];
	
			SimpleData.query(function(res){
				$scope.states=res.rows
			})
			
			// $scope.$watch(function(){
			// 	return $scope.selectedState;
			// }, function(){
			// 	console.log($scope.selectedState)
			// })
	
		}])
})()