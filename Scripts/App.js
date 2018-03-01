/// <reference path ="angular.js"/>

var MyApplication = angular.module("MyModule", []);
MyApplication.controller("MyController", function ($scope, $http) {
    MyApplication.constant('chunkSize', 50);
    $scope.pageSize = 10;
    $scope.currentPage = 0;
    $scope.ls = 0;
    $scope.loading = true;
    $scope.MyData = [];
    var list = [];
    var a = [];
    // $scope.Message = "Hello I M From Angular";

    $scope.Search = function () {
        var val = $scope.myValue;
        //   debugger;
        $http.get('entries.json').then(function (data) {
            a = data.data;

            if (val == null || val == "") {
                $scope.MyData = [];
                for (list in data.data) {
                    $scope.MyData.length + 1;
                    //              data.data[list].details.html_description = data.data[list].details.html_description.replace(/ /g, '');
                    $scope.MyData.push(data.data[list]);
                }

            }
            else {
                $scope.MyData = [];
                for (list in a) {
                    var taglist = a[list].tags;
                    for (var i = 0; i < taglist.length; i++) {
                        if (val == taglist[i]) {
                            $scope.MyData.push(a[list]);
                            break;
                        }
                    }
                    
                }
                debugger;
                if (MyData.length == 0) {
                    $scope.Message = "Try Again";
                } else { $scope.Message = "";}
            }

            $scope.loading = false;
        });
    }

    $scope.TotalPage = function () {
        return Math.ceil($scope.MyData.length / $scope.pageSize);
    }
    
    $scope.Search();
    
}).filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


// we create a simple directive to modify behavior of <ul>
app.directive("whenScrolled", function () {
    return {

        restrict: 'A',
        link: function (scope, elem, attrs) {

            // we get a list of elements of size 1 and need the first element
            raw = elem[0];
            debugger;
            // we load more elements when scrolled past a limit
            elem.bind("scroll", function () {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.loading = true;

                    // we can give any function which loads more elements into the list
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    }
});