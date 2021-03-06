'use strict';
angular.module('app.factorys', [])
    .factory('settings', ['$rootScope', function($rootScope) {
        var settings = {
            layout: {
                pageState: 'Dashboard'
            },
            hasEdit: []
        };

        $rootScope.settings = settings;

        return settings;
    }])
    .factory('$Until', ['$rootScope', function($rootScope) {
        // var modal_defaults = {
        //     show: true
        // };
        var bootbox_defaults = {
            alert: {
                title: '提示:',
                message: '点击［确认］后关闭',
                buttons: {
                    ok: {
                        label: '确认',
                    }
                }
            },
            confirm: {
                title: '选择:',
                message: '请选择［确认］或［取消］',
                buttons: {
                    confirm: {
                        label: '确认'
                    },
                    cancel: {
                        label: '取消'
                    }
                }
            },
            prompt: {
                title: '请输入:',
                inputType: 'text',
                buttons: {
                    confirm: {
                        label: '确认'
                    },
                    cancel: {
                        label: '取消'
                    }
                }
            }
        };

        function useBootbox(name, params) {
            // console.log(name);
            if (angular.isObject(params[0])) {
                bootbox[name](angular.extend({}, bootbox_defaults[name], params[0], true));
            } else {
                bootbox[name](angular.extend({}, bootbox_defaults[name], name === 'prompt' ? {
                    title: params[0],
                    callback: params[1]
                } : {
                    message: params[0],
                    callback: params[1]
                }));
            }
        }

        function useModal(params) {
            // console.log('useModal')
            // if (angular.isObject(params[0])) {
            //     var modal = $modal(angular.extend({}, modal_defaults, params[0], true));
            // } else {
            //     var modal = $modal(angular.extend({}, modal_defaults, {
            //         title: params[0],
            //         content: params[1]
            //     }));
            // }
            // return modal;
        }

        return {
            login: function() {},
            loginD: function() {},
            logout: function() {},
            message: function() {},
            alert: function() {
                useBootbox('alert', arguments);
            },
            confirm: function() {
                useBootbox('confirm', arguments);
            },
            prompt: function() {
                useBootbox('prompt', arguments);
            },
            dialog: function() {
                // return useModal(arguments);
            }
        };
    }])
    // 拦截注入token
    // .factory('SessionToken', ['SessionService', function(SessionService) {
    //     return {
    //         request: function(config) {
    //             if (!SessionService.isAnonymus) {
    //                 config.headers['x-session-token'] = SessionService.token;
    //             }
    //             return config;
    //         }
    //     }
    // }])
    //拦截注入时间
    .factory('TimerInterceptor', [function() {
        return {
            request: function(config) {
                config.requestTimestamp = new Date().getTime();
                return config;
            },
            response: function(response) {
                response.config.responseTimestamp = new Date().getTime();
                return response;
            }
        };
    }])
    //拦截请求恢复
    // .factory('sessionRecoverer', ['$q', '$injector', function($q, $injector) {
    //     var sessionRecoverer = {
    //         responseError: function(response) {
    //             // Session has expired
    //             if (response.status == 419) {
    //                 var SessionService = $injector.get('SessionService');
    //                 var $http = $injector.get('$http');
    //                 var deferred = $q.defer();

//                 // Create a new session (recover the session)
//                 // We use login method that logs the user in using the current credentials and
//                 // returns a promise
//                 SessionService.login().then(deferred.resolve, deferred.reject);

//                 // When the session recovered, make the same backend call again and chain the request
//                 return deferred.promise.then(function() {
//                     return $http(response.config);
//                 });
//             }
//             return $q.reject(response);
//         }
//     };
//     return sessionRecoverer;
// }])
//拦截请求与返回
.factory('HttpInterceptor', ['$q', function($q) {
        return {
            // 请求发出之前，可以用于添加各种身份验证信息
            request: function(config) {
                // if (localStorage.token) {
                //     config.headers.token = localStorage.token;
                // }
                // console.log('request by config:', config);
                return config;
            },
            // 请求发出时出错
            requestError: function(err) {
                // console.log('request by error:', err);
                return $q.reject(err);
            },
            // 成功返回了响应
            response: function(res) {
                // console.log('response by res:', res);
                return res;
            },
            // 返回的响应出错，包括后端返回响应时，设置了非 200 的 http 状态码
            responseError: function(err) {
                // console.log('response by error:', err);
                if (-1 === err.status) {
                    // 远程服务器无响应
                } else if (401 === err.status) {
                    // 401 错误一般是用于身份验证失败，具体要看后端对身份验证失败时抛出的错误
                } else if (404 === err.status) {
                    // 服务器返回了 404
                }
                return $q.reject(err);
            }
        };
    }])
    //重新封闭NgTableParams方法
    .factory('$tableParams', ['NgTableParams', '$document', function(NgTableParams, $document) {
        return {
            creat: function(scope, options) {
                var nt = new NgTableParams({
                    count: 5
                }, angular.extend({
                    counts: [5, 10, 20],
                    dataset: null,
                    checkFiledName: 'id'
                }, options, true));

                scope.$watch(function() {
                    return nt.data;
                }, function() {
                    nt.checkboxes = {
                        allchecked: false,
                        items: {}
                    };
                }, true);

                scope.$watch(function() {
                    return nt.checkboxes.allchecked;
                }, function(value) {
                    angular.forEach(nt.data, function(item) {
                        nt.checkboxes.items[item[nt.settings().checkFiledName]] = value;
                    });
                });

                scope.$watch(function() {
                    return nt.checkboxes.items;
                }, function(values) {
                    // console.log(values)
                    var checked = 0;
                    var unchecked = 0;
                    var total = nt.data.length;

                    angular.forEach(nt.data, function(item) {
                        checked += (values[item[nt.settings().checkFiledName]]) || 0;
                        unchecked += (!values[item[nt.settings().checkFiledName]]) || 0;
                    });

                    nt.hasChecked = checked > 0;

                    if ((unchecked === 0) || (checked === 0)) {
                        nt.checkboxes.allchecked = (checked === total) && (checked !== 0);
                    }
                    // grayed checkbox
                    angular.element($document[0].getElementsByClassName("select-all")).prop("indeterminate", (checked !== 0 && unchecked !== 0));
                }, true);
                return nt;
            },
            bind: function(scope, tableObj, bindTableObj) {

                //主表count变化时，改变子表count
                scope.$watch(function() {
                    return scope[tableObj].count();
                }, function(count) {
                    scope[bindTableObj].count(count);
                }, true);
                //主表data变化时，改变子表dataset
                scope.$watch(function() {
                    return scope[tableObj].data;
                }, function(dataset) {
                    scope[bindTableObj].settings({ dataset: dataset });
                }, true);

                //子表sorting变化时，调整主表sorting
                scope.$watch(function() {
                    return scope[bindTableObj].sorting();
                }, function(sort) {
                    scope[tableObj].sorting(sort);
                }, true);

            }
        };
    }])
    // 辅助封装NgTableParams表格锁定列
    // .factory('$tableParamsLock', ['$tableParams', function($tableParams) {
    //     return {
    //         init: function(scope, tableObj) {
    //             scope.tableParamsLock = $tableParams.creat(scope);

//             //主表count变化时，改变子表count
//             scope.$watch(function(){
//                 return tableObj.count();
//             },function(count){
//                 console.log('tableObj',tableObj.data)
//                 scope.tableParamsLock.count(count)
//             },true)
//             //主表data变化时，改变子表dataset
//             scope.$watch(function(){
//                 return tableObj.data
//             },function(dataset){
//                 scope.tableParamsLock.settings({dataset:dataset})
//             },true)

//             //子表sorting变化时，调整主表sorting
//             scope.$watch(function() {
//                 return scope.tableParamsLock.sorting();
//             }, function(sort) {
//                 tableObj.sorting(sort);
//             }, true);

//         }
//     };
// }])
;
