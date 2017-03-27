'use strict';
angular.module('app.directives', [])
    .directive('spinner', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            link: function(scope, element) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    angular.element('body').removeClass('page-on-load'); // remove page loading indicator
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }])
    .directive('a', [function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function(e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        };
    }])
    .directive('ngProgress', [function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.progress.html',
            scope: {
                valueNow: '@',
                valueMin: '@',
                valueMax: '@',
                barStyle: '@'
            },
            replace: true,
            // controller: function($scope) {},
            link: function(scope) {
                scope.min = scope.min || 0;
                scope.max = scope.max || 100;
            }
        };
    }])
    .directive('ngTreeMenu', [function() {
        return {
            restrict: 'AEC',
            replace: true,
            templateUrl: 'tpls/model.tree.menu.html',
            scope: {
                $model: '=ngModel'
            },
            controller: function($scope, $element) {
                $scope.build = function() {}
            },
            link: function(scope, iElement, iAttrs) {
                scope.build();
            }
        };
    }])
    .directive('ngComboFile', function() {
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            controller: function($scope, $modal) {

                var getter = function(paramName) {
                    return $scope[paramName];
                };
                var setter = function(paramName, val) {
                    $scope[paramName] = val;
                };

                $scope.$open = function() {
                    console.log('open')
                    var modal = $modal({
                        title: '文件上传:',
                        templateUrl: $scope.mini ? 'tpls/model.comboFileMini.html' : 'tpls/model.comboFile.html',
                        backdrop: true,
                        controller: function($scope, FileUploader) {

                            var multiple = $scope.multiple = getter('multiple');
                            var accept = $scope.accept = getter('accept');
                            var maxLen = $scope.maxLen = getter('maxLen');
                            var delay = $scope.delay = getter('delay');

                            var uploader = $scope.uploader = new FileUploader({
                                url: 'upload.php'
                            });

                            // a sync filter
                            uploader.filters.push({
                                name: 'syncFilter',
                                fn: function(item /*{File|FileLikeObject}*/ , options) {
                                    // console.log('syncFilter');
                                    return this.queue.length < maxLen;
                                }
                            });

                            // an async filter
                            uploader.filters.push({
                                name: 'asyncFilter',
                                fn: function(item /*{File|FileLikeObject}*/ , options, deferred) {
                                    // console.log('asyncFilter');
                                    setTimeout(deferred.resolve, delay * 1000);
                                }
                            });

                            // CALLBACKS

                            uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
                                console.info('onWhenAddingFileFailed', item, filter, options);
                            };
                            uploader.onAfterAddingFile = function(fileItem) {
                                console.info('onAfterAddingFile', fileItem);
                            };
                            uploader.onAfterAddingAll = function(addedFileItems) {
                                console.info('onAfterAddingAll', addedFileItems);
                            };
                            uploader.onBeforeUploadItem = function(item) {
                                console.info('onBeforeUploadItem', item);
                            };
                            uploader.onProgressItem = function(fileItem, progress) {
                                console.info('onProgressItem', fileItem, progress);
                            };
                            uploader.onProgressAll = function(progress) {
                                console.info('onProgressAll', progress);
                            };
                            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                                console.info('onSuccessItem', fileItem, response, status, headers);
                            };
                            uploader.onErrorItem = function(fileItem, response, status, headers) {
                                console.info('onErrorItem', fileItem, response, status, headers);
                            };
                            uploader.onCancelItem = function(fileItem, response, status, headers) {
                                console.info('onCancelItem', fileItem, response, status, headers);
                            };
                            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                                console.info('onCompleteItem', fileItem, response, status, headers);
                            };
                            uploader.onCompleteAll = function() {
                                console.info('onCompleteAll');
                            };

                            // console.info('uploader', uploader);
                        },
                        show: true
                    });
                }
            },
            link: function(scope, iElement, iAttrs) {
                iElement.on('click', scope.$open);
                scope.mini = iAttrs['mini'] === 'true'; //显示方案：‘MINI’ or 'FULL'
                scope.multiple = iAttrs['multiple']; //多文件选择方案:true or false
                scope.accept = iAttrs['accept'] || '*'; //设置上传类型
                scope.maxLen = iAttrs['maxLen'] || 1; //最大文件数
                scope.delay = iAttrs['delay'] || 0; //上传前等待延时,单位:秒
            }
        };
    })
    .directive('ngComboSelect', function() {
        return {
            restrict: 'AEC',
            transclude: true,
            templateUrl: 'tpls/model.comboselect.html',
            scope: {
                $model: '=ngModel',
                $data: '=ngData',
                bsOptions: '@options',
                maxLength: '@',
                placeholder: '@',
                allButtons: '@',
                selectedText: '@'
            },
            controller: function($scope, $document) {

                function traceAll() {
                    angular.element($document[0].getElementsByClassName('combo-select-all')).prop('indeterminate', ($scope.$model.length !== 0 && $scope.$model.length !== $scope.$data.length));
                }

                $scope.traceAll = traceAll;
            },
            link: function(scope) {
                scope.$model = angular.copy(scope.$model) || [];
                scope.$watch(function() {
                    return scope.$model;
                }, scope.traceAll);
            }
        };
    })
    // .directive('ngComboInput', function () {
    //     return {
    //         restrict: 'AEC',
    //         templateUrl:'tpls/model.comboInput.html',
    //         replace:true,
    //         scope:{
    //             $model:'=ngModel',
    //             $data:'=ngData',
    //             $options:'@options',
    //             $label:'@label',
    //             $addon:'@addon',
    //             $placeholder:'@placeholder'
    //         },
    //         controller:function($scope){
    //         },
    //         link: function (scope, iElement, iAttrs) {
    //         }
    //     };
    // })
    .directive('ngPageLabelBar', function() {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.pageLabelBar.html',
            controller: function($scope, $document, $element, $timeout) {
                $scope.$data = [];


                function build() {
                    angular.forEach($document.find('[ng-page-label]'), function(item) {
                        var id=angular.element(item).attr('id')||'page-label-'+getRandom(8);
                        angular.element(item).attr('id', id);
                        $scope.$data.push({
                            iconCls: angular.element(item).find('i').attr('class'),
                            title: angular.element(item).find('span').html(),
                            href:'#'+id
                        });
                    });
                    $timeout(function(){
                        console.log($element.find('a').length);
                        angular.forEach($element.find('a'),function(el,idx){
                            var e=angular.element(el);
                            var href=e.attr('href')
                            e.click(function(){
                                angular.element('body').animate({scrollTop: angular.element(href).offset().top-70}, "slow");
                                return false
                            })
                            e.parent().click(function(event) {
                                angular.element('body').animate({scrollTop: angular.element(href).offset().top-70}, "slow");
                            });
                        })
                    },0)
                    
                }

                $scope.$on('$destroy',function() {  
                  document.onscroll=null; 
                });

                document.onscroll=function(){
                    var mt=document.body.scrollTop-60;//angular.element($element[0]).offset().top;//-document.body.scrollTop
                        mt=mt<0?0:mt;
                    angular.element($element[0]).children('ul').css('margin-top',mt);
                    // console.log(angular.element($element[0]).offset().top,document.body.scrollTop);

                }

                $scope.build = build;
            },
            link: function(scope) {
                scope.build();
            }
        };
    })
    .directive('ngFormBlock', ['$rootScope', function($rootScope) {
        return {
            restrict: 'AEC',
            scope: true,
            controller: function($scope, $element) {
                var qid = 'BlockForm_' + getRandom(8);
                $element.attr('ng-form-block-query', qid);

                $scope.$on('$destroy', $scope.$view);

                $scope.$edit = function() {
                    $rootScope.settings.hasEdit.push({ qid: qid });
                };
                $scope.$view = function() {
                    angular.forEach($rootScope.settings.hasEdit, function(elmt, idx) {
                        if (elmt.qid === qid) {
                            $rootScope.settings.hasEdit.remove(idx);
                        }
                    });

                };

                $scope.$watch(function() {
                    return $rootScope.settings.hasEdit;
                }, function(elems) {
                    var flag = false;
                    angular.forEach(elems, function(elmt) {
                        if (elmt.qid === qid) {
                            flag = true;
                        }
                    });
                    $scope.$isEdit = flag;
                }, true);

            },
            link: function(scope, elmt, attrs) {
                var fn = attrs.formOpen === 'true' ? '$edit' : '$view';
                scope[fn]();
            }
        };
    }])
    .directive('ngChartFlot', function() {
        return {
            restrict: 'AEC',
            template: '<div class="chart chart-flot"></div>',
            scope: {
                $data: '=ngData',
                width: '@',
                height: '@',
                options: '@'
            },
            replace: true,
            controller: function($scope, $element) {

                function build() {

                    $element.css({
                        width: $scope.width,
                        height: $scope.height
                    });

                    $.plot($element, $scope.$data, $scope.opts).resize();
                }
                $scope.build = build;
            },
            link: function(scope) {
                // var options_default = {};
                scope.opts = angular.extend({}, parseObj(scope.options), true);
                scope.build();
            }
        };
    })
    .directive('tableLockGroup', function($timeout) {
        return {
            restrict: 'AEC',
            controller: function($scope) {

                function setLockSize() {
                    // console.log($scope.northTable.find('tr:first-child th').length)
                    // console.log($scope.westTable.find('tr:first-child th').length)
                    // console.log($scope.eastTable.find('tr:first-child th').length)
                    // console.log($scope.centerTable.find('tr:first-child th').length)
                    var wTH = $scope.westTable.find('tr:first-child th');
                    var eTH = $scope.eastTable.find('tr:first-child th');
                    var cTH = $scope.centerTable.find('tr:first-child th');
                    angular.forEach(wTH, function(elmt, idx) {
                        $scope.centerTable.find('tr:first-child th:nth-child(' + (idx + 1) + ')').width(angular.element(elmt).width());
                    });
                    angular.forEach(eTH, function(elmt, idx) {
                        $scope.centerTable.find('tr:first-child th:nth-child(' + (cTH.length - eTH.length + idx + 1) + ')').width(angular.element(elmt).width());
                    });
                }
                $scope.setLockSize = setLockSize;
            },
            link: function(scope, iElement) {
                scope.northTable = iElement.find('.north .table');
                scope.westTable = iElement.find('.west .table');
                scope.eastTable = iElement.find('.east .table');
                scope.centerTable = iElement.find('.center .table');
                $timeout(function() {
                    scope.setLockSize();
                }, 0);

            }
        };
    })
    .directive('modalDialog', function($document) {
        return {
            restrict: 'AEC',
            controller: function() {},
            link: function(scope, iElement) { //scope, iElement, iAttrs
                var startX = 0,
                    startY = 0,
                    x = 0,
                    y = 0;
                var element = iElement;
                var header = element.find('.modal-header');
                element.css({
                    position: 'relative'
                });
                header.css({
                    cursor: 'move'
                });


                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }

                header.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });
            }
        };
    })
    .directive('ngSearch', ['$location', '$state', function($location, $state) {
        return {
            restrict: 'AEC',
            templateUrl: 'tpls/model.search.html',
            scope: {
                $data: '=ngData',
                $model: '=ngModel',
                $href: '@ngHref',
                placeholder: '@',
                minLength: '@',
                autoSelect: '@',
                container: '@',
                bsOptions: '@options'
            },
            // replace:true,
            // require:'ngModel',
            controller: function($scope) {

                function search() {
                    if (!!$scope.$href && !!$scope.$model) {
                        $state.go($scope.$href, { key: $scope.$model });
                    }

                }

                $scope.search = search;
            },
            link: function(scope, iElement) {
                iElement.addClass('search');
                angular.element(iElement.find('input')).on('keyup', function(event) {
                    var keycode = window.event ? event.keyCode : event.which;
                    if (keycode === 13) {
                        console.log('on enter');
                        scope.search();
                    }
                });
                angular.element(iElement.find('button')).on('click', function() {
                    console.log('click A');
                    scope.search();
                });
            }
        };
    }])
    // .directive('ngInputSearch', [function() {
    //     return {
    //         restrict: 'AEC',
    //         replace: true,
    //         templateUrl: 'tpls/model.inputSearch.html',
    //         scope: {
    //             placeholder: '@',
    //             btnIconCls: '@',
    //             btnText: '@'
    //         },
    //         controller: function($scope) {},
    //         link: function(scope, iElement, iAttrs) {}
    //     };
    // }])
    .directive('ngComboKindeditor', [function() {
        return {
            restrict: 'AEC',
            template: '<textarea id="{{$id}}" class="form-control">{{$model||placeholder}}</textarea>',
            // replace: true,
            scope: {
                $model: '=ngModel',
                name: '@',
                placeholder: '@'
            },
            controller: function($scope, $element,$timeout) {
                $scope.defaults = {
                    width: '100%',
                    height: 240,
                    resizeMode: 0,
                    allowFileManager: true,
                    resizeType: 0,
                    allowPreviewEmoticons: false,
                    allowImageUpload: false,
                    items: [
                        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                        'insertunorderedlist', '|', 'emoticons', 'image', 'link', '|', 'fullscreen'
                    ]
                };

                function build() {
                    $timeout(function(){
                        var editor=KindEditor.create('#'+$scope.$id, angular.extend({}, $scope.defaults, parseObj($scope.options)));
                        $scope.$watch(function(){
                            return editor.html()
                        },function(val){
                            $scope.$model=val;
                        })
                    },0)
                }
                $scope.build = build;
            },
            link: function(scope) {
                scope.$id='editor_'+getRandom(8)
                scope.build();
            }
        };
    }])
    .directive('ngComboSearch', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                $data: '=ngData',
                ngModel: '=',
                options: '@',
                //-----------------------
                placeholder: '@',
                iconClass: '@',
                iconDisplay: '@',
                btnDisplay: '@',
                btnValue: '@',
                //-----------------------
                modalTitle: '@',
                modalTemplateUrl: '@',
                modalBackdrop: '@'
            },
            templateUrl: 'tpls/input.combosearch.html',
            controller: function($scope, $log, $modal, NgTableParams) {

                var modal = $modal({
                    title: $scope.modalTitle,
                    templateUrl: $scope.modalTemplateUrl,
                    backdrop: $scope.modalBackdrop,
                    controller: modalCtrl,
                    show: false
                });

                $scope.openModal = function() {
                    // modal.$promise.then(modal.show);
                }

                /////*********************************************************
                /////*********************************************************
                function confirm($selected) {
                    $scope.ngModel = $selected;
                }

                function cancel() {
                    $log.log('cancel');
                }

                function getSelected() {
                    return $scope.ngModel;
                }

                function isSelect() {
                    var obj = {};
                    if ($scope.ngModel) {
                        obj[$scope.ngModel] = true;
                    }
                    return obj;
                }

                function getData() {
                    return $scope.$data;
                }

                function modalCtrl($scope) {
                    $scope.$data = getData();
                    $scope.$selected = getSelected() || null;
                    $scope.$isSelect = isSelect();

                    $scope.tableParams = new NgTableParams({
                        page: 1,
                        count: 5
                    }, {
                        counts: false,
                        dataset: $scope.$data
                    });

                    $scope.confirm = confirm;
                    $scope.cancel = cancel;

                    $scope.$select = function($item) {
                        $scope.$isSelect = {};
                        $scope.$isSelect[$item] = !$scope.$isSelect[$item];
                        $scope.$selected = $item;
                    }
                }

            }
        }
    });
