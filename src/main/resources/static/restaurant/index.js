"use strict";

(function (){
    var app=angular.module("myApp",['ngRoute']);

    app.config(function ($routeProvider){
        $routeProvider
            .when('/', {
                template: '<h3>Добро пожаловать в CookStarter!</h3>'
            })
            .when('/restaurant-form', {
                templateUrl: 'restaurant-form.html',
                controller: 'restFormController'
            })
            .when('/menu', {
                templateUrl: 'menu.html',
                controller: 'menuController'
            })
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'loginController'
            })
            .when('/restaurants', {
                templateUrl: 'restaurants.html',
                controller: 'restaurantsController'
            })
    });

    // контроллер для авторизации
    app.controller('loginController', function($scope) {
        $scope.authInfo={
            login: "",
            password: ""
        };
        $scope.authorisation=function(authInfo){
            console.log(authInfo); // вывод на консоль
            console.log("authInfo"); // вывод на консоль
        };
    });

    // контроллер для меню
    app.controller('menuController', function($scope, $http){
        $http.get("http://localhost:8089/api/restaurants/menu")
            .success(function(data){
            $scope.file=data;
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

// контроллер для формы регистрации ресторана
    app.controller('restFormController', function($scope, $http){
        $scope.contact={
            id: 1,
            address:"",
            phone:"",
            email:"",
            website:""
        };
        $scope.restaurant={
            id: 1,
            name: "",
            contact: "",
            description: ""
        };
        $scope.addRestaurant=function (restaurant){
            console.log(restaurant); // вывели на консоль

            // отправляем объект в пост запросе на бэк
            $http.post("http://localhost:8089/api/restaurants/", restaurant)
                .success(function(data){
                    console.log("Success save restaurant");
                })
                .error(function(data){
                    console.log("Error for save restaurant");
                });
        };
    });

    // контроллер для получения списка ресторанов
    app.controller('restaurantsController', function($scope, $http){
        $http.get("http://localhost:8089/api/restaurants")
            .success(function(data){
                $scope.restaurants=data;
                $scope.currentPage=1; // текущая страница
                $scope.dataLimit=2;  // количество выводимых строк
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





