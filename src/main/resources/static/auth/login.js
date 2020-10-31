"use strict";

(function () {
    let app = angular.module("myApp");

    // контроллер для авторизации, нужно переместить в отдельный файл
    // url-1 для тестирования: https://marketcook.herokuapp.com/market/auth
    // url-2 для тестирования: http://localhost:8085/authenticate
    // url-3 наш cookstarter:  https://cookstarter-users-service.herokuapp.com/auth

    app.controller('loginController', function($scope, $http, $localStorage, $window, idStorage) {
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
            console.log(authInfo); // информация для отправки: логин и пароль

            $http.post("https://cookstarter-users-service.herokuapp.com/auth", authInfo)
                .then(function(response){
                    console.log("Success authenticate");
                    console.log(response); // объект - ответ, из него достаем data - данные
                    console.log("data.data = " + response.data);
                    console.log("data.data.token = " + response.data.token);
                    // сохраняем токен в localStorage браузера
                    $window.localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
                    console.log("Проверка при логировании:\n localStorage.getItem: " + $window.localStorage.getItem('Authorization'));
                    // изменяем настройки по умолчанию, записываем в заголовок полученный токен
                    $http.defaults.headers.common.Authorization = $window.localStorage.getItem('Authorization');
                    // после авторизации переходим на рестораны
                    $window.location.href = '#/restaurants';

                    //К нам после авторизациии или регистрации(по идее группы)
                    // прилетает id пользователя. Сразу делаем запрос на получение id его
                    // ресторана. Потом, объявили функцию, которая передает id  ресторана для получения меню
                    $scope.forMenu=function (id){
                        idStorage.setId(id);
                        console.log("idStorage.set(id): " + idStorage.getId(id));
                    };
                    // выполнили эту функцию
                    $scope.forMenu(1);

                })
                .catch(function(data){
                    console.log("Error authenticate");
                    console.log(data);
                });
        };



    });
    //====================================================


})();