var app = angular.module('ebook',['ngRoute','infinite-scroll']);

    app.controller('SearchController',function($scope, $q,$http,constantService,BookRequestService){
        $scope.searchValue  = $scope.searchValue || constantService.default.searchValue;
        $scope.resultFound  = $scope.resultFound || constantService.default.resultFound;
        $scope.errorMsg     = $scope.errorMsg    || constantService.default.errorMsg;
        $scope.books        = $scope.books       || constantService.default.books ;
        $scope.onProcess    = $scope.onProcess   || constantService.default.onProcess;
        $scope.page = 0;
        $scope.busy = false;
        $scope.books = [];

        $scope.search = function(isScroll){

            if(!$scope.searchValue){
                return;
            }

            if(typeof isScroll == 'undefined'){
                $scope.books = [];
            }



            if($scope.busy)
                return ;
            $scope.busy = true;
            $scope.onProcess = true;



            BookRequestService.getBooks({
                queryVal :$scope.searchValue,
                page:++$scope.page
            }).then(function(data){
                $scope.resultFound = (data.data.Total == 0) ? false : true;
                if($scope.resultFound){
                    for(var i= 0 ; i< data.data.Books.length ; i++ ){
                        $scope.books.push(data.data.Books[i]);
                    }
                }
                $scope.onProcess = false;
                $scope.busy = false;
            },function(error){
                $scope.resultFound = false;
                $scope.errorMsg = error.statusText;
                $scope.onProcess = false;
            });
        }
    });

    app.controller('BookDetailsController',function($scope, $q,$http,constantService,BookRequestService,$routeParams){
        $scope.onProcess = true;
        BookRequestService.getBookDetails($routeParams.id).then(function(data){
            $scope.result = data.data;
            $scope.onProcess = false;
        },function(error){
            $scope.onProcess = false;
        });
    });

    app.constant('constantService',{
        api:{
            url:'http://it-ebooks-api.info/v1/',
            page:1,
            method:'get',
            responseType:'json'
        },
        default:{
            searchValue : '',
            resultFound : true,
            errorMsg    : 'No Book Found',
            books : [],
            onProcess : false

        }
    });

    app.factory('BookRequestService',function(constantService,$http){
        return {
            getBooks : function(params){
                return $http.get(constantService.api.url+"search/"+params.queryVal+'/page/'+params.page);
            },
            getBookDetails : function(id){
                return $http.get(constantService.api.url+"book/"+id);
            }
        }
    });

    app.directive('photo',function(){
        return {
            restrict: 'E',
            templateUrl: '../../template/photo.html',
            replace: true,
            link: function(scope, elem, attrs) {
                attrs.$observe('title',function(value){
                    elem.find('.book-title').html(value);
                });

                attrs.$observe('description',function(value){
                    elem.find('.book-description').html(value);
                });

                attrs.$observe('link',function(value){
                    elem.find('.book-link').attr('href',value);

                });

                attrs.$observe('img',function(value){
                    elem.find('.book-img').attr('src',value);
                });
            }
        }
    });

    app.config(function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'../../template/home.html'})
            .when('/book/:id',{templateUrl:'../../template/details.html'})
            .otherwise({template:'Could not match route'});
    });



