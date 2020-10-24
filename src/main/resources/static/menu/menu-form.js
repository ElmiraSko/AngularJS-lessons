"use strict";

(function (){
    var app=angular.module("myApp");
    app.controller('menuFormController', function($scope, $http){

        $scope.dish={
            name:"",
            price:0,
            description:"",
            picture:0
        };

        $scope.menu={
            dish:{}
        };
// В процессе разработки
    });
/*
*            api:
* "menu": {
          "dish1": {
          "name": 'string',
          "price": 0.99,
          "description": 'string',
          "picture": 10
           },
          "dish2": {
          "name": 'string',
          "price": 0.99,
          "description": 'string',
          "picture": 11 // dish picture_id
          }
     },
* */
})();