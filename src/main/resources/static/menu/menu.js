"use strict";

(function (){
    var app=angular.module("myApp");
    // контроллер для меню
    app.controller('menuController', function($scope, $http){
        $http.get("http://localhost:8089/api/restaurants/menu")
            .success(function(data){
                $scope.file=data;
                $scope.currentPage=1;
                $scope.dataLimit=5;
                console.log($scope.dataLimit);

                $scope.fileLength=$scope.file.length;
                $scope.pageCount=Math.ceil($scope.fileLength / $scope.dataLimit);
                console.log($scope.pageCount);

                $scope.prevPage=function (){
                    return $scope.currentPage--;
                };

                $scope.nextPage=function (){
                    return $scope.currentPage++;
                };

                $scope.firstPage=function (){
                    return $scope.currentPage === 1;
                };

                $scope.lastPage=function (){
                    return $scope.currentPage === $scope.pageCount;
                };

                $scope.start=function (){
                    return ($scope.currentPage - 1) * $scope.dataLimit;
                };
            }).error(function(data){});

        $scope.sort_width=function(base){
            $scope.base=base;
            $scope.reverse=!$scope.reverse
        };

        $scope.delete=function (id){
            $http.post()
        };
    });
})();

