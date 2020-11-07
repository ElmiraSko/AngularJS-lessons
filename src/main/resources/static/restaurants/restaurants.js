(function (){
    "use strict";

    let app=angular.module("myApp");

    app.directive('fileInput', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('change', function(){
                    $parse(attrs.fileInput)
                        .assign(scope, element[0].files)
                    scope.$apply();
                });
            }
        };
    }]);

  // контроллер для получения списка ресторанов (или один ресторан по его id)
    app.controller('restaurantsController', function($scope, $http, $window){

        let token = $window.localStorage.getItem('Authorization');
        let myRestaurantId = $window.localStorage.getItem('restaurantId');

        // в переменную $scope.token положили токен из локального репозтит-я браузера, для передачи в параметре запроса в <img>
        $scope.token='?token=' + $window.localStorage.getItem('Authorization');
        $scope.imageURL="http://localhost:8087/picture/get/";
        $scope.restaurants={};
        $scope.contacts= {};

        // ======== запрашиваем ресторан по id ====== $scope.getRestaurant=function (id){};
        // $scope.getRestaurant=function (){  // не работает как отдельный метод - ?
        // $window.localStorage.getItem('restaurantId')

            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.get("https://cookstarter-restaurant-service.herokuapp.com/restaurant/get/" + myRestaurantId)
                .then(function(response) {
                    $scope.restaurants = response.data;
                    console.log("Get restaurant! restaurant id: " + response.data.id);
                    console.log("Get restaurant! restaurant name: " + response.data.name);
                    console.log("Get restaurant! status: " + response.status);
                    $scope.fileLength = $scope.restaurants.length;
                    //пытаемся получить контакты
                    if (token) {
                        $http.defaults.headers.common.Authorization = token;
                    }
                    $http.get("https://cookstarter-restaurant-service.herokuapp.com/contact/get/" + myRestaurantId)
                        .then(function(response) {
                            $scope.contacts = response.data;
                            $scope.contactsLength = $scope.contacts.length;
                            console.log("Success contact, status: " + response.status);
                        })
                        .catch(function(response){
                            if (response.status === 500) {
                                $window.location.href = '#/login';
                            } else {
                                console.log("Not contact: " + response.status);
                                $scope.contactsLength = 0;
                            }
                        });
                })
                .catch(function(response){
                    if (response.status === 500) {
                        $window.location.href = '#/login';
                    } else {
                        console.log("Error get restaurants");
                        $scope.fileLength = 0;
                    }
                });


        // }; // не работает как отдельный метод


       // для удаления карточки ресторана, нужно переписать
        $scope.deleteRestaurant=function(id){
            console.log("Delete restaurant " +  id);
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.post("https://cookstarter-restaurant-service.herokuapp.com/restaurant/delete/" + id)
                .then(function(response) {
                    $window.location.href = '#/restaurants';
                    console.log("Success delete restaurant: " + response.status);
                })
                .catch(function(response){
                    $window.location.href = '#/restaurants';
                    console.log("Error delete restaurant: " + response.status);
                });
        };
//====================================================================================================
        // для формы ресторана
        $scope.restaurant={};

        $scope.restaurant={
            id: 1,
            name: "",
            description: "",
            picture: 1,
        };
        // $scope.restaurant.id="";
        // $scope.restaurant.name="";
        // $scope.restaurant.description="";
        // $scope.restaurant.picture="";

        $scope.isUploadImj=false; // картинку еще не загружали

        //========= загрузка картинки ============
        $scope.uploadFile=function (){
            let conf={
                transformRequest:angular.identity,
                headers : {'Content-Type': undefined}
            };

            var fd = new FormData();
            angular.forEach($scope.files, function (file){
                fd.append('file', file);
            });

        // послали запрос на сохраниние картинки в бд, получили айди картинки
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.post("http://localhost:8087/picture/api/add", fd, conf)
                .success(function (d){
                    console.log(d);
                    console.log(d.pictureId + ' - получили pictureId из json ответа');
                    // присвоили индекс картинки свойству restaurant.picture
                    $scope.restaurant.picture=d.pictureId;
                    console.log($scope.restaurant.picture);
                    $scope.isUploadImj=true;
                })
                .error(function (d){
                    console.log(d);
                });
        };

        //============= запрос на добавление ресторана ======
        $scope.addRestaurant=function (restaurant){
            console.log(restaurant);
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.post("http://localhost:8089/restaurant/add", restaurant)
                .success(function(data){
                    console.log("Success save restaurant");
                    $window.location.href = '#/restaurants';
                })
                .error(function(data){
                    console.log("Error for save restaurant");
                    $window.location.href = '#/';
                });
        };
        //============= Запрос на обновление ресторана, не работает ===============
        $scope.editRestaurant=function (restaurant){
            console.log(restaurant.description + " - restaurant.description");

            $scope.restaurant={
                name:restaurant.name,
                description: restaurant.description
            };

            console.log($scope.restaurant.description + " - description!!!");

        };

        //============ для контактов ==============
        //============= запрос на обновление контакта, пока не работает ====

        $scope.editContact=function(contact){
            $scope.contacts.address =contact.address;
            $scope.contacts.phone = contact.phone;
            $scope.contacts.location = contact.location;
            $scope.contacts.mail = contact.mail;
            $scope.contacts.website = contact.website;
            $scope.contacts.restaurantId = contact.restaurantId;
        };

        //============= запрос на добавление контакта, работает======
        $scope.addContact=function(contact){

            contact.restaurantId=myRestaurantId; // не забыть!
            console.log(contact);
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.post("https://cookstarter-restaurant-service.herokuapp.com/contact/add", contact)
                .success(function(data){
                    console.log("Success save contact " + data);
                    $window.location.href = '#/restaurants';
                })
                .error(function(data){
                    console.log("Error for save contact " + data);
                    $window.location.href = '#/login';
                });
        };

        //============= запрос на удаление контакта, работает =====
        $scope.deleteContact=function(){
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.get("https://cookstarter-restaurant-service.herokuapp.com/contact/delete/"+ myRestaurantId)
                .success(function(data){
                    console.log("Success delete contact " + data);
                    $window.location.href = '#/restaurants';
                })
                .error(function(data){
                    console.log("Error delete contact " + data);
                    $window.location.href = '#/login';
                });
        };




    });



})();