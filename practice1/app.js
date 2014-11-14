angular.module('app',['controllers']);


angular.module('controllers',[])
    .controller('MainController',function($scope){
        $scope.val = true;
        $scope.increment = function(){
            $scope.val = !$scope.val;
        }
    });