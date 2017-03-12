'use strict';
angular.module('app.resources', [])
    .factory('SimpleList', ['$resource', function($resource) {
        return $resource($path_api + '/SimpleList.json', null, {
            query: {
                method: 'GET'
            }
        });
    }])
    .factory('SimpleUsers', ['$resource', function($resource) {
        return $resource($path_api + '/SimpleUsers.json', null, {
            query: {
                method: 'GET'
            },
            get: {
                method: 'GET'
            }
        });
    }])
    .factory('SimpleDepartment', ['$resource', function($resource) {
        return $resource($path_api + '/SimpleDepartment.json', null, {
            query: {
                method: 'GET'
            },
            get: {
                method: 'GET'
            }
        });
    }])
    .factory('SimpleData', ['$resource', function($resource) {
        return $resource($path_api + '/SimpleData.json', null, {
            query: {
                method: 'GET'
            }
        });
    }])
    .factory('RecordList', ['$resource', function($resource) {
        return $resource($path_api + '/Data_record.json', null, {
            query: {
                method: 'GET'
            },
            get: {
                method: 'GET'
            },
            remove: {
                url: $path_api + '/Data_record_remove.json',
                method: 'GET'
            }
        });
    }])
    .factory('DataSearch', ['$resource', function($resource) {
        return $resource($path_api + '/Data_search.json', null, {
            query: {
                method: 'GET'
            },
            get: {
                method: 'GET'

            },
            post: {
                method: 'POST'
            },
            put: {
                method: 'PUT'
            },
            del: {
                method: 'DELETE'
            }
        });
    }]);
