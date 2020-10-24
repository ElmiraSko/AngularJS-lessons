"use strict";

(function (){
    var app=angular.module("myApp");

    // контроллер для заказов
    // (здесь временно тестирую передачу токена, буду менять)
    app.controller('orderController', function($scope, $http, $window, $log){

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

