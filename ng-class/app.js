angular.module('app',['controllers']);


angular.module('controllers',[])
    .controller('MainController',function($scope){
        $scope.classVar = 'left';

        $scope.left = function(){
            $scope.classVar = 'left';
        }
        $scope.right = function(){
            $scope.classVar = 'right';
        }
    });
