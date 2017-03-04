'use strict';
angular.module('app.routers', [])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


        // function resovleDep(param,tpl,module){
        //     var resolves = {
        //         loadMyCtrl: [‘$ocLazyLoad‘, ‘$templateCache‘, ‘$q‘, function($ocLazyLoad,$templateCache,$q) {
        //             lazyDeferred = $q.defer();
        //             return $ocLazyLoad.load({
        //                 name : module,
        //                 cache: false,
        //                 files: param.files
        //             }).then(function() {
        //                 lazyDeferred.resolve($templateCache.get(tpl));
        //             });
        //         }]
        //     };
        //     return resolves;
        // };


        // 默认跳转
        $urlRouterProvider.otherwise('/web')
            .when('/web', '/web/Dashboard.html');

        $stateProvider

        //[主框架]

            .state('web', {
                url: '/web?key',
                views: {
                    'header': {
                        templateUrl: $path_root + 'tpls/page.header.html',
                        controller: 'headerController'
                    },
                    'slider': {
                        templateUrl: $path_root + 'tpls/page.slider.html',
                        controller: 'sliderController'
                    },
                    'wraper': {
                        templateUrl: $path_root + 'tpls/page.wraper.html',
                        controller: 'wraperController'
                    },
                    'footer': {
                        templateUrl: $path_root + 'tpls/page.footer.html',
                        controller: 'footerController'
                    }
                },
                data: {
                    pageTitle: 'web'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/controllers.js',
                                $path_root + 'scripts/controllers/controllers.header.js',
                                $path_root + 'scripts/controllers/controllers.slider.js',
                                $path_root + 'scripts/controllers/controllers.wraper.js',
                                $path_root + 'scripts/controllers/controllers.footer.js'
                            ]
                        });
                    }]
                }
            })
            //[首页]
            .state('web.UI', {
                url: '/UI.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/UI/index.html',
                        controller: 'UI'
                    }
                },
                data: {
                    pageTitle: 'UI'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/UI/controllers.js'
                            ]
                        });
                    }]
                }
            })
            //[首页]
            .state('web.Dashboard', {
                url: '/Dashboard.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Dashboard/Dashboard.html',
                        controller: 'Dashboard'
                    }
                },
                data: {
                    pageTitle: 'Dashboard'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Dashboard/controllers.js'
                            ]
                        });
                    }]
                }
            })
            // [查询页]
            .state('web.Search', {
                url: '/Search.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Search/index.html',
                        controller: 'Search'
                    }
                },
                data: {
                    pageTitle: 'Search'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Search/controllers.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.SearchView', {
                url: '/Search/View.html?id',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Search/detail.html',
                        controller: 'SearchView'
                    }
                },
                data: {
                    pageTitle: '用户信息',
                    pageTitleSub: '查看',
                    parentUrl: '#/web/Search.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Search/controllers.view.js'
                            ]
                        });
                    }]
                }
            })
            // [查询页]
            .state('web.Record', {
                url: '/Record.html?userName?department?dateEntryFrom?dateEntryUntil',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Record/index.html',
                        controller: 'Record'
                    }
                },
                data: {
                    pageTitle: '沟通记录'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Record/controllers.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.RecordView', {
                url: '/Record/View.html?id',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Record/detail.html',
                        controller: 'RecordView'
                    }
                },
                data: {
                    pageTitle: '沟通记录',
                    pageTitleSub: '查看',
                    parentUrl: '#/web/Record.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Record/controllers.view.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.RecordAdd', {
                url: '/Record/add.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Record/detail.html',
                        controller: 'RecordAdd'
                    }
                },
                data: {
                    pageTitle: '沟通记录',
                    pageTitleSub: '新增',
                    parentUrl: '#/web/Record.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Record/controllers.add.js'
                            ]
                        });
                    }]
                }
            })
            // [查询页]
            .state('web.Chart', {
                url: '/Chart.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Chart/index.html',
                        controller: 'Chart'
                    }
                },
                data: {
                    pageTitle: '报表分析'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Chart/controllers.js'
                            ]
                        });
                    }]
                }
            })
            // [查询页]
            .state('web.Track', {
                url: '/Track.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Track/index.html',
                        controller: 'Track'
                    }
                },
                data: {
                    pageTitle: '待跟踪事项'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Track/controllers.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.TrackView', {
                url: '/Track/view.html?id',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Track/detail.html',
                        controller: 'TrackView'
                    }
                },
                data: {
                    pageTitle: '待跟踪事项',
                    pageTitleSub: '查看',
                    parentUrl: '#/web/Track.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Track/controllers.view.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.TrackAdd', {
                url: '/Track/add.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Track/detail.html',
                        controller: 'TrackAdd'
                    }
                },
                data: {
                    pageTitle: '待跟踪事项',
                    pageTitleSub: '新增',
                    parentUrl: '#/web/Track.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Track/controllers.add.js'
                            ]
                        });
                    }]
                }
            })
            // [查询页]
            .state('web.Database', {
                url: '/Database.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Database/index.html',
                        controller: 'Database'
                    }
                },
                data: {
                    pageTitle: '基础数据'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Database/controllers.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.DatabaseView', {
                url: '/Database/view.html?id',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/Database/detail.html',
                        controller: 'DatabaseView'
                    }
                },
                data: {
                    pageTitle: '基础数据',
                    pageTitleSub: '查看',
                    parentUrl: '#/web/Database.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/Database/controllers.view.js'
                            ]
                        });
                    }]
                }
            })
            // [查询页]
            .state('web.System', {
                url: '/System.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/System/index.html',
                        controller: 'System'
                    }
                },
                data: {
                    pageTitle: '用户设置'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/System/controllers.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.SystemView', {
                url: '/System/view.html?id',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/System/detail.html',
                        controller: 'SystemView'
                    }
                },
                data: {
                    pageTitle: '用户设置',
                    pageTitleSub: '查看',
                    parentUrl: '#/web/System.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/System/controllers.view.js'
                            ]
                        });
                    }]
                }
            })
            // []
            .state('web.SystemAdd', {
                url: '/System/add.html',
                views: {
                    'content': {
                        templateUrl: $path_root + 'views/System/detail.html',
                        controller: 'SystemAdd'
                    }
                },
                data: {
                    pageTitle: '用户设置',
                    pageTitleSub: '新增',
                    parentUrl: '#/web/System.html'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            insertBefore: '#ng_load_before',
                            files: [
                                $path_root + 'scripts/controllers/System/controllers.add.js'
                            ]
                        });
                    }]
                }
            });

    }]);
