"use strict";

(function (){
    let app=angular.module("myApp");

    // контроллер для формы регистрации ресторана
    app.controller('contactController', function($scope, $http, $window){

        $scope.contact= {
            address:"",
            phone:"",
            location: "string",
            mail:"",
            website:"",
            restaurantId: ""
        }

        $scope.editContact=function (cont){
            $scope.contact.address =cont.address;
            $scope.contact.phone = cont.phone;
            $scope.contact.location = cont.location;
            $scope.contact.mail = cont.mail;
            $scope.contact.website = cont.website;
            $scope.contact.restaurantId = cont.restaurantId;
        };

        //============= запрос на добавление контакта ======
        $scope.addContact=function (contact){
            console.log(contact);

            contact.restaurantId=$window.localStorage.getItem('restaurantId');
            console.log(contact);

            let token = $window.localStorage.getItem('Authorization');
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.post("http://localhost:8089/restaurant/contact/add", contact)
                .success(function(data){
                    console.log("Success save restaurant " + data);
                })
                .error(function(data){
                    console.log("Error for save restaurant " + data);
                });
        };
        //=============================


    });


})();

