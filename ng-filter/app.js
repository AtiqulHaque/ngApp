var app = angular.module('app',['controllers','Myfilters']);


angular.module('controllers',[])
    .controller('MainController',function($scope,$filter){

    });


angular.module('Myfilters',[])
    .filter('CharLimit',function(){
        return function(input,length){
            if(!length){
                length = 25;
            }
            if(!input){
                return "";
            }
            if(input.length > length){
                return "Search item is too long";
            }
        }
    }).filter('charMin',function(){
        return function(input,length){
            if(!length){
                length = 5;
            }
            if(!input){
                return "";
            }
            if(input.length < length){
                return "Search item is too small";
            }
        }
    });
