;(function(){
	'use strict';
	app
	.controller('Search', function ($scope,$element,$state, $stateParams, NgTableParams, RecordList) {

		// console.log('Search $stateParams',$stateParams)
		$scope.data = [];
		$scope.statistics={
			record:0,
			chart:0,
			track:0,
			database:0
		}

		$scope._view=_view;

		$scope.tableParams = new NgTableParams({
            count: 5
        }, {
            counts: [5, 10, 20],
            // dataset: $scope.data
            getData: function(params) {
                return RecordList.get(params.url()).$promise.then(function(res) {
                    params.total(res.total); // recal. page nav controls
                    $scope.data = res.rows
                    return $scope.data;
                });
            }
        });

        function _view(id){
        	console.log('_view');
        	$state.go('web.SearchView',{id:id});
        }


	})
})()