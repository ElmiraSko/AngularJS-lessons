"use strict";

(function () {
    let app = angular.module("myApp");

    app.controller('loginController', function($scope, $http, $localStorage, $window) {

        // информация для отправки: логин и пароль
        $scope.authInfo={
            username: "",
            password: ""
        };

        $scope.authorisation = function(authInfo){
            console.log(authInfo);

            $http.post("https://cookstarter-users-service.herokuapp.com/auth", authInfo)
                .then(function(response){
                    console.log("Success authenticate");
                    console.log(response); // объект - ответ, из него достаем data - данные
                    console.log("data.data = " + response.data);
                    console.log("data.data.token = " + response.data.token);
                    console.log("restaurantId = " + response.data.restaurantId);
                    // сохраняем токен в localStorage браузера
                    $window.localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
                    // сохраняем в localStorage restaurantId или id пользователя (нужно получить при авторизации)
                    $window.localStorage.setItem('restaurantId', response.data.restaurantId);

                    let token = $window.localStorage.getItem('Authorization');
                    console.log("Проверка при логировании:\n localStorage.getItem: "
                        + token);

                    console.log("Проверка при логировании:\n restaurantId: "
                        + $window.localStorage.getItem('restaurantId'));
                    $window.location.href = '#/';
                })
                .catch(function(data){
                    console.log("Error authenticate");
                    console.log(data);
                });
        };
    });
})();