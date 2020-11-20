"use strict";

(function (){
    var app=angular.module("myApp");

    // контроллер для заказов
    app.controller('orderController', function($scope, $http, $window){

        let token = $window.localStorage.getItem('Authorization');
        let myRestaurantId = $window.localStorage.getItem('restaurantId');
        let helpDishList = [];
        let i = 1;
        //---------- получили заказы ------------
        if (token) {
            $http.defaults.headers.common.Authorization = token;
        }
        $http.get("https://cs-order-service.herokuapp.com/orders/get/restaurant/" + myRestaurantId)
            .then(function(response) {
                console.log("Получили заказы ресторана " + myRestaurantId);
                console.log(response.data);
                $scope.orders = response.data;

                $scope.currentPage=1; // текущая страница
                $scope.dataLimit=5;  // количество выводимых строк
                $scope.fileLength=$scope.orders.length;
                $scope.pageCount=Math.ceil($scope.fileLength / $scope.dataLimit);

                // ---- изменила id у клиентов, временно ---------
                // angular.forEach($scope.orders, function (value, key) {
                //     value.customerId = i;
                //     i = i + 1;
                //     console.log("Индекс клиента " + value.customerId);
                // });

                //-------------- дата ----------------------------
                if ($scope.orders.length > 0) {
                    for (let i = 0; i < $scope.orders.length; i++) {
                        console.log($scope.orders[i].dateCreated);
                        let date = Date.parse($scope.orders[i].dateCreated);
                        $scope.orders[i].dateCreated = date;
                        console.log($scope.orders[i].dateCreated);
                    }
                }

                //---------------- временно, для получения имени ресторана ---------------
                angular.forEach($scope.orders, function (value, key) {
                    if (token) {
                        $http.defaults.headers.common.Authorization = token;
                    }
                    $http.get("https://cookstarter-restaurant-service.herokuapp.com/restaurant/get/" + value.restaurantId)
                        .success(function (data) {
                            console.log("Получили данные ресторана!");
                            console.log(data);
                            value.restaurantId = data.name;
                        })
                        .error(function (data, status) {
                            console.log("Ошибка при получении ресторана! " + status);
                            $window.location.href = '#/login';
                        });
                });

                //------------ клиенты -------
                angular.forEach($scope.orders, function (value, key) {
                    if (token) {
                        $http.defaults.headers.common.Authorization = token;
                    }
                    $http.get("https://cookstarter-users-service.herokuapp.com/users/info/" + value.customerId)
                        .success(function (data) {
                            console.log("Получили клиента!");
                            console.log(data);
                            value.customerId = data;
                        })
                        .error(function (data, status) {
                            console.log("Ошибка при получении клиента! " + status);
                            // $window.location.href = '#/login';
                        });

                });
            })
            .catch(function (respons) {
                console.log("Ошибка при получении заказов! " + respons.status);
                $scope.fileLength = 0;
            });
//=========================================
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


        $scope.sort_width=function(base){
            $scope.base=base;
            $scope.reverse=!$scope.reverse
        };
// ================================================================
        $scope.getDishes = function(arr) {
            helpDishList = [];
            angular.forEach(arr, function (value, key) {
                console.log("Ключ! ");
                console.log(key);
                console.log("значение! ");
                console.log(value);
                if (token) {
                    $http.defaults.headers.common.Authorization = token;
                }
                $http.get("https://cookstarter-restaurant-service.herokuapp.com/dish/get/" + key)
                    .success(function(data){
                        let d = {
                            id : value.id,
                            name : data.name,
                            price : value.price,
                            quantity : value.quantity
                        }
                        helpDishList.push(d);
                    })
                    .error(function(data, status){
                        console.log("плохо! " + status);
                    });
                console.log("запрос отправлен")
            });
            console.log(helpDishList);
            $scope.dishesList=helpDishList;
        };


    });

})();
