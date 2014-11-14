angular.module('app',['controllers']);


angular.module('controllers',[])
    .controller('MainController',function($scope){
        $scope.val = 0;
        $scope.increment = function(){
            $scope.val += 1;
        }
    });
