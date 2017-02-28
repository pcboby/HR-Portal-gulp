;(function(){
	'use strict';
	angular.module('app.filters', [])
	// .filter('trustAsHtml', function($sce) {
 //        return function(type) {
 //            return $sce.trustAsHtml(input.replace(/\n/g, '<br/>'));
 //        };
 //    })
	.filter('sex', function ($sce) {
		return function (val) {
			var styles=[{//女
					text:'女',
					cls:'icon icon-user-female',
					color:'#ec971f'
				},{//男
					text:'男',
					cls:'icon icon-user',
					color:'#5cb85c'
				}]
			return $sce.trustAsHtml('<i class="'+styles[val].cls+'" style="color:'+styles[val].color+';">'+styles[val].text+'</i>')
		};
	})
	.filter('state', function ($sce) {
		return function (val) {
			// console.log(val)
			var styles=[{//（危险）Danger
					cls:'glyphicon-remove-sign',
					color:'#d9534f'
				},{//（成功）Success
					cls:'glyphicon-ok-sign',
					color:'#5cb85c'
				},{//（正常）Primary
					cls:'glyphicon-info-sign',
					color:'#286090'
				},{//（普通）Info
					cls:'glyphicon-question-sign',
					color:'#31b0d5'
				},{//（警告）Warning
					cls:'glyphicon-exclamation-sign',
					color:'#ec971f'
				}]
			return $sce.trustAsHtml('<i class="glyphicon '+styles[val].cls+'" style="color:'+styles[val].color+';"></i>')
		};
	});
})()