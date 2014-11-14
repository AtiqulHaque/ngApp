angular.module('app',['controllers']);


angular.module('controllers',[])
    .controller('MainController',function($scope){
        $scope.isShow = false;
        $scope.arr = [{name:'atik'},{name:'Rony'},{name:'abid'},{name:'bappi'}];
        $scope.show = function(){
            $scope.isShow = !$scope.isShow;
          //  $scope.arr.push($scope.arr.length+1);
        }

        $scope.hide = function(){
            $scope.arr.splice(0,1);
        }

    });