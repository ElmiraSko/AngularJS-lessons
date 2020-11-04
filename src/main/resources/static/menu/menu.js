"use strict";

(function (){
    let app=angular.module("myApp");
    // контроллер для меню
    app.controller('menuController', function($scope, $http, $window){
// при отрисовки html появляется лишний запрос на получение картинки, надо понять в чем дело
        $scope.file=[];
        $scope.token='?token=' + $window.localStorage.getItem('Authorization');

        $scope.urlForGet="http://localhost:8089/api/restaurants/menu/"+$window.localStorage.getItem('restaurantId');
        console.log("Контроллер menu!");
        console.log("url для меню: " + $scope.urlForGet);

        $http.get("http://localhost:8089/api/restaurants/menu/"+$window.localStorage.getItem('restaurantId'))
            .success(function(data){
                $scope.file=data;

                console.log($scope.file);

                $scope.currentPage=1; // текущая страница
                $scope.dataLimit=5;  // количество выводимых строк
                console.log($scope.dataLimit); // вывод на консоль

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

