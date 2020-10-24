"use strict";

(function () {
    var app = angular.module("myApp");

    // контроллер для регистрации менеджера ресторана
    app.controller('registrationController', function($scope, $http, $localStorage, $window) {

        // для url cookstarter:  https://cookstarter-users-service.herokuapp.com/reg/restaurant
        $scope.registrationInfo = {
            username: "",
            password: "",
            role: ""
        };
// Регистрация пока под вопросом
    });
})();