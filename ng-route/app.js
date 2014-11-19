var app = angular.module('app',['ngRoute']);
app.controller('MainController',function($scope){
    $scope.someData = "Atik";
});

app.config(function($routeProvider){
    $routeProvider.when('/',{templateUrl:'view.html',controller:'MainController'});
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