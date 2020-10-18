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
            .when('/order', {
                templateUrl: 'order.html',
                controller: 'orderController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    // контроллер для авторизации
    // url-1 для тестирования: https://marketcook.herokuapp.com/market/auth
    // url-2 для тестирования: http://localhost:8085/authenticate

    app.controller('loginController', function($scope, $http, $localStorage, $window) {
        // для url-1
        $scope.authInfo={
            username: "",
            password: ""
        };

        // для url-2
        // $scope.authInfo={
        //     name: "",
        //     password: ""
        // };

        // вспомогательный
        $scope.helpInfo={
            "name" : "admin",
            "password" : "password"
        };

        $scope.authorisation=function(authInfo){
            console.log(authInfo);

            $http.post("https://marketcook.herokuapp.com/market/auth", authInfo)
                .then(function(response){
                    console.log("Success authenticate");
                    console.log(response);
                    console.log("data.data = " + response.data);
                    console.log("data.data.token = " + response.data.token);
                    // сохраняем токен
                    $window.localStorage.setItem('Authorization', 'Bearer ' + response.data.token);

                    console.log("1. localStorage.getItem: " + $window.localStorage.getItem('Authorization'));
                })
                .catch(function(data){
                    console.log("Error authenticate");
                    console.log(data);
                });
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

    // контроллер для заказов, (здесь временно тестируем передачу токена)
    app.controller('orderController', function($scope, $http, $window, $log) {
        $scope.order=''; // временная, для тестирования
        let token = $window.localStorage.getItem('Authorization');
        console.log("2: " + token);

        //=== вариант-1 для передачи токена в headers (работает) ===
        // url-1 для тестирования: https://marketcook.herokuapp.com/market/api/v1/restaurants
        // url-2 для тестирования: http://localhost:8085/user

        $http({
            url : "https://marketcook.herokuapp.com/market/api/v1/restaurants",
            method : 'GET',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : token
            }
        }).success(function(data){
            $log.info("Test-1, success!");
            $log.info(data);
            $scope.order=data;
        }).error(function(data, status, headers, config){
            console.log("Error get data: " + data);
            console.log("Error get status: " + status);
            console.log("Error get headers: " + headers);
            console.log("Error get config: " + config);
        });

        //=== вариант-2 для передачи токена в headers (работает) ===

        // let conf={
        //     headers : {
        //                  'Authorization' : token
        //     }
        // };
        //
        // $http.get("https://marketcook.herokuapp.com/market/api/v1/restaurants", conf)
        //     .success(function(data){
        //         $log.info("Test-2, success!");
        //         $log.info(data);
        //         $scope.order=data;
        //     })
        //     .error(function(data){
        //         console.log("Error get user request " + data);
        //     });

        // === вариант-3 для передачи токена в headers (работает) ===

        // $http.defaults.headers.common.Authorization = token;
        // $http.get("https://marketcook.herokuapp.com/market/api/v1/restaurants")
        //     .success(function(data){
        //         $log.info("Test-3, success!");
        //         $log.info(data);
        //     })
        //     .error(function(data){
        //         console.log("Error get user request " + data);
        //     });

    });

})();





