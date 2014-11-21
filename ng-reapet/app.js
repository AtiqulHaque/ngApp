var app = angular.module('app',['infinite-scroll']);


app.controller('MainController',function($scope,Reddit){
$scope.description = "Hi world this is my first angular js Directive";
});

// Reddit constructor function to encapsulate HTTP and pagination logic
app.factory('Reddit', function($http) {
    var Reddit = function() {
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    Reddit.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        var url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
            var items = data.data.children;
            for (var i = 0; i < items.length; i++) {
                this.items.push(items[i].data);
            }
            this.after = "t3_" + this.items[this.items.length - 1].id;
            this.busy = false;
        }.bind(this));
    };

    return Reddit;
});

app.directive('helloWorld', function() {
    return {
        restrict: 'AE',
        replace: true,
        template: '<p style="background-color:{{color}}">Hello World</p>',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                elem.css('background-color', 'white');
                elem.html(scope.description);
                scope.$apply(function() {
                    scope.color = "white";
                });
            });
            elem.bind('mouseover', function() {
                elem.css('cursor', 'pointer');
            });
        }
    };
});