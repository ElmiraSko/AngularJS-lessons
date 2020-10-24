"use strict";

(function () {
    var app = angular.module("myApp");

    // контроллер для авторизации, нужно переместить в отдельный файл
    // url-1 для тестирования: https://marketcook.herokuapp.com/market/auth
    // url-2 для тестирования: http://localhost:8085/authenticate
    // url-3 наш cookstarter:  https://cookstarter-users-service.herokuapp.com/auth

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


        $scope.authorisation=function(authInfo){
            console.log(authInfo);

            $http.post("https://cookstarter-users-service.herokuapp.com/auth", authInfo)
                .then(function(response){
                    console.log("Success authenticate");
                    console.log(response);
                    console.log("data.data = " + response.data);
                    console.log("data.data.token = " + response.data.token);
                    // сохраняем токен в localStorage браузера
                    $window.localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
                    console.log("1. localStorage.getItem: " + $window.localStorage.getItem('Authorization'));
                    // изменяем настройки по умолчанию
                    $http.defaults.headers.common.Authorization = $window.localStorage.getItem('Authorization');
                })
                .catch(function(data){
                    console.log("Error authenticate");
                    console.log(data);
                });
        };
    });
    //====================================================


})();