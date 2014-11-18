var app = angular.module('ebook',['ngRoute']);

app.controller('SearchController',function($scope, $q,$http,constantService,BookRequestService){
    $scope.searchValue = "";
    $scope.search = function(){
        BookRequestService.getBooks($scope.searchValue).then(function(data, status, headers, config){
            $scope.books = data.data.Books;
        },function(data, status, headers, config){

        });
        /*$http.get(constantService.api.url+'php').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is availablet
                console.log(data);
                $scope.books = data.Books;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });*/
    }

    /*function loadUser(){
        var deferred = $q.defer();
        setTimeout(function(){
            deferred.resolve({userName: "Atik",Id: "1426709",StafId : "0171623456"});
        },1000);

        return deferred.promise;
    }

    function loadStaf(User){
        var deferred = $q.defer();
        setTimeout(function(){
            deferred.resolve({userName: "Atik",Id: "1426709",StafId : User.Id});
        },1000);
        return deferred.promise;
    }

    $scope.loadData = function(){
        loadUser().then(loadStaf)
            .then(function(result){
                alert(JSON.stringify(result));
            },function(error){
                alert(error);
            });
    };
     .
     success(function(data, status, headers, config) {
     // this callback will be called asynchronously
     // when the response is availablet
     console.log(data);
     $scope.books = data.Books;
     }).
     error(function(data, status, headers, config) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
     }
*/


});

app.constant('constantService',{
    api:{
        url:'http://it-ebooks-api.info/v1/search/',
        page:1,
        method:'get',
        responseType:'json'
    }
});

app.factory('BookRequestService',function(constantService,$q,$http){
    var deferred = $q.defer();
    return {
        getBooks : function(params){
            return $http.get(constantService.api.url+params);
        }
    }
});

app.config(function($routeProvider){
    $routeProvider.when('/atik',{templateUrl:'view.html',controller:'SearchController'});
});


