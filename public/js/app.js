var app = angular.module('ebook',['ngRoute']);

    app.controller('SearchController',function($scope, $q,$http,constantService,BookRequestService){
        $scope.searchValue  = $scope.searchValue || constantService.default.searchValue;
        $scope.resultFound  = $scope.resultFound || constantService.default.resultFound;
        $scope.errorMsg     = $scope.errorMsg    || constantService.default.errorMsg;
        $scope.books        = $scope.books       || constantService.default.books ;
        $scope.onProcess    = $scope.onProcess   || constantService.default.onProcess;
        $scope.search = function(){
            $scope.onProcess = true;
            BookRequestService.getBooks($scope.searchValue).then(function(data){
                $scope.resultFound = (data.data.Total == 0) ? false : true;
                $scope.books = data.data.Books;
                $scope.onProcess = false;
            },function(error){
                $scope.resultFound = false;
                $scope.errorMsg = error.statusText;
                $scope.onProcess = false;
            });
        }
    });

    app.controller('BookDetailsController',function($scope, $q,$http,constantService,BookRequestService,$routeParams){
        BookRequestService.getBookDetails($routeParams.id).then(function(data){
            $scope.result = data.data;
        },function(error){

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
                return $http.get(constantService.api.url+"search/"+params);
            },
            getBookDetails : function(id){
                return $http.get(constantService.api.url+"book/"+id);
            }
        }
    });

    app.config(function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'home.html'})
            .when('/book/:id',{templateUrl:'details.html'})
            .otherwise({template:'Could not match route'});
    });



