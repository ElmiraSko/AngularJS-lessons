(function (){
    "use strict";

    var app=angular.module("myApp");

    // контроллер для получения списка ресторанов (или один ресторан по его id)
    app.controller('restaurantsController', function($scope, $http, $window, idStorage){

       //Для получения списка ресторанов использую url: http://localhost:8089/api/restaurants
        // Для получения одного ресторана по его id:    http://localhost:8089/api/restaurants/id
        // в переменную $scope.token положили токен из локального репозтит-я браузера, для передачи в параметре запроса в <img>
        $scope.token='?token=' + $window.localStorage.getItem('Authorization');
        $scope.imageURL="http://localhost:8087/picture/get/";

        // запрашиваем ресторан по id= (1- это второй ресторан в ArrayList)
        $http.get("http://localhost:8089/api/restaurants/" + idStorage.getId())
            .success(function(data){
                $scope.restaurants=data; // в переменную restaurants сохранили список ресторанов

                $scope.currentPage=1; // текущая страница
                $scope.dataLimit=1;  // количество выводимых строк
                $scope.fileLength=$scope.restaurants.length;
                $scope.pageCount=Math.ceil($scope.fileLength / $scope.dataLimit);
                // временная проверка, вывод в лог
                console.log("All ok! All restaurant getting!");
                console.log("1: "+ $scope.imageURL);
                console.log("2: "+ $scope.imageURL+$scope.token);
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
        $scope.forMenu=function (id){
            idStorage.setId(id);
            console.log("idStorage.set(id): " + idStorage.getId(id));
        }


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