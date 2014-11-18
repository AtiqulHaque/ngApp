var app = angular.module('app',['ngRoute']);
app.controller('MainController',function($scope){
    $scope.someData = "Atik";
});

app.config(function($routeProvider){
    $routeProvider.when('/',{templateUrl:'view.html',controller:'MainController'});
});
