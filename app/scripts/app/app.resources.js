;(function(){
	'use strict';
	angular.module('app.resources', [])
	.factory('SimpleList', function($resource) {
	    return $resource($path_api + '/SimpleList.json', null, {
	        query: {
	            method: 'GET'
	        }
	    });
	})
	.factory('SimpleData', function($resource) {
	    return $resource($path_api + '/SimpleData.json', null, {
	        query: {
	            method: 'GET'
	        }
	    });
	})
	.factory('RecordList', function($resource) {
	    return $resource($path_api + '/Data_record.json', null, {
	        query: {
	            method: 'GET'
	        },
	        get: {
	            method: 'GET'
	        },
	        remove:{
	        	url:$path_api+'/Data_record_remove.json',
	        	method:'GET'
	        }
	    });
	})
	.factory('DataSearch', function($resource) {
	    return $resource($path_api + '/Data_search.json', null, {
	        query: {
	            method: 'GET'
	        },
	        get: {
	            method: 'GET'
	            
	        },
	        post:{
	        	method:'POST'
	        },
	        put:{
	        	method:'PUT'
	        },
	        del:{
	        	method:'DELETE'
	        }
	    });
	})
})()