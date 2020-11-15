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
                    console.log("data.data.id = " + response.data.id);
                    // сохраняем токен в localStorage браузера
                    $window.localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
                    // сохраняем в localStorage restaurantId или id пользователя (нужно получить при авторизации)
                    // $window.localStorage.setItem('restaurantId', '2'); // временно закоментировали

                    let token = $window.localStorage.getItem('Authorization');
                    console.log("Проверка при логировании:\n localStorage.getItem: "
                        + token);
// временно закомментировали
                    // console.log("Проверка при логировании:\n restaurantId: "
                    //     + $window.localStorage.getItem('restaurantId'));

                    // изменяем настройки по умолчанию, записываем в заголовок полученный токен
                    // $http.defaults.headers.common.Authorization = $window.localStorage.getItem('Authorization');
                    // после авторизации переходим на рестораны

                    // временно, чтоб получить все рестораны
                    if (token) {
                        $http.defaults.headers.common.Authorization = token;
                    }
                    $http.get("https://cookstarter-restaurant-service.herokuapp.com/restaurant/getAll")
                        .success(function(data){
                            $scope.restaurants = data;
                            console.log($scope.restaurants);
                            $scope.restLength = $scope.restaurants.length;
                            $scope.ids=[];
                            angular.forEach($scope.restaurants, function (value, key){
                                $scope.ids.push(value.id);
                            });
                            console.log("Создали массив индексов");
                            console.log($scope.ids);
                            // положили в хранилище айди ресторанов
                            $window.localStorage.setItem('restIds', JSON.stringify($scope.ids));
                            console.log("Сохранили $scope.ids- массив индексов");
                            console.log($scope.ids);
                        })
                        .error(function(data, status){
                            if (status === 404) {
                                console.log("404 Not found!");
                                $scope.fileLength = 0;
                            } else {
                                if (status === 403) {
                                    console.log("403 Forbidden!");
                                    $window.location.href = '#/login';
                                } else
                                if (status === 500) {
                                    console.log("500 Error!");
                                    $window.location.href = '#/';
                                }
                            }
                        });

                    $window.location.href = '#/';

                })
                .catch(function(data){
                    console.log("Error authenticate");
                    console.log(data);
                });
        };
    });
})();