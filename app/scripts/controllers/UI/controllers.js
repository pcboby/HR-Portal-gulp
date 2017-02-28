;(function() {
    'use strict';
    app
        .controller('UI', function($scope, $element, $state, $stateParams, NgTableParams, RecordList, DataSearch) {
            
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


            DataSearch.query(function(res){
                $scope.dataSearch = res.rows;
                console.log(res)
            })

    })
        
})()
