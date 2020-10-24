"use strict";

(function (){
    var app=angular.module("myApp");

    // контроллер для получения списка ресторанов
    app.controller('restaurantsController', function($scope, $http){
        $scope.imageURL="http://localhost:8087/";

        $http.get("http://localhost:8089/api/restaurants")
            .success(function(data){
                $scope.restaurants=data; // в переменную restaurants сохранили все рестораны

// //прошлись в цикле по всем ресторанам и переменной picture присвоили ссылку на ресурс, где брать картинки
//                 angular.forEach($scope.restaurants, function (value, key){
//                     let id = value.picture; // временно сохраняем пришедший индекс картинки
//                     console.log("в переменную id сохранили индекс - " + id);
//                     value.picture=$scope.imageURL+id;
//                     console.log("Теперь значение value.picture - " + value.picture);
//                 });

                $scope.currentPage=1; // текущая страница
                $scope.dataLimit=1;  // количество выводимых строк
                $scope.fileLength=$scope.restaurants.length;
                $scope.pageCount=Math.ceil($scope.fileLength / $scope.dataLimit);
                console.log("All ok! All restaurant getting!");
            })
            .error(function(data){
                console.log("Error get restaurants");
            });

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

        // для удаления записи
        $scope.delete=function(restaurant){
            console.log("Delete restaurant " +  restaurant);
            $http.post("http://localhost:8089/api/restaurants/delete", restaurant)
                .success(function(data){
                    console.log("Success delete restaurant");

                    $http.get("http://localhost:8089/api/restaurants")
                        .success(function(data){
                            $scope.restaurants=data;
                            console.log("All ok! All restaurant getting!");
                        })
                        .error(function(data){
                            console.log("Error get restaurants");
                        });
                })
                .error(function(data){
                    console.log("Error get restaurants " + restaurant);
                });
        };
    });
})();