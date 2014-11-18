var app = angular.module('app',[]);

app.controller('MainController',function($scope, $q){


    function loadUser(){
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



});
