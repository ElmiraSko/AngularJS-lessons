"use strict";

(function (){
    var app=angular.module("myApp",['ngRoute', 'ngStorage']);

    app.config(function ($routeProvider, $httpProvider){
        $routeProvider
            .when('/', {
                template: '<h3>Добро пожаловать в CookStarter!</h3>'
            })
            .when('/login', {
                templateUrl: 'auth/login.html',
                controller: 'loginController'
            })
            .when('/registration', {
                templateUrl: 'auth/registration.html',
                controller: 'registrationController'
            })
            .when('/restaurants', {
                templateUrl: 'restaurants/restaurants.html',
                controller: 'restaurantsController'
            })
            .when('/restaurant-form', {
                templateUrl: 'restaurants/restaurant-form.html',
                controller: 'restFormController'
            })
            .when('/menu', {
                templateUrl: 'menu/menu.html',
                controller: 'menuController'
            })
            .when('/menu-form', {
                templateUrl: 'menu/menu-form.html',
                controller: 'menuFormController'
            })
            .when('/order', {
                templateUrl: 'orders/orders.html',
                controller: 'orderController'
            })
            .otherwise({
                redirectTo: '/'
            });
        $httpProvider.defaults.headers.common.Authorization = 'Bearer -some accessToken to be generated later'
    });
})();





