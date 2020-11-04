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

       //Для получения списка ресторанов использую url: http://localhost:8089/api/restaurants
        // Для получения одного ресторана по его id:    http://localhost:8089/api/restaurants/id
        // Послед. изменения: http://localhost:8089/restaurant/id
        // в переменную $scope.token положили токен из локального репозтит-я браузера, для передачи в параметре запроса в <img>
        $scope.token='?token=' + $window.localStorage.getItem('Authorization');
        $scope.imageURL="http://localhost:8087/picture/get/";
        $scope.restaurants={};

        $scope.contacts= {};

        // запрашиваем ресторан по id= (1- это второй ресторан в ArrayList)
        $http.get("http://localhost:8089/restaurant/" + $window.localStorage.getItem('restaurantId'))
            .success(function(data){
                $scope.restaurants=data; // в переменную restaurants сохранили список ресторанов
                console.log("Get restaurant!\n: "+ data.id);
                $scope.currentPage=1; // текущая страница
                $scope.dataLimit=1;  // количество выводимых строк
                $scope.fileLength=$scope.restaurants.length;
                $scope.pageCount=Math.ceil($scope.fileLength / $scope.dataLimit);
                //пытаемся получить контакты
                $http.get("http://localhost:8089/restaurant/contact/get/" + $window.localStorage.getItem('restaurantId'))
                    .success(function(data){
                        $scope.contacts=data;
                        $scope.contactsLength=$scope.contacts.length;
                    })
                    .error(function (data){
                        console.log("Not contact: "+ data);
                    });

                // временная проверка, вывод в лог
                console.log("All ok! All restaurant getting!\n" + data);
                // console.log("idStorage.getId(): "+ idStorage.getId());
                console.log("2: "+ $scope.imageURL+$scope.token);
            })
            .error(function(data){
                console.log("Error get restaurants");
            });

        $scope.prevPage=function (){
            return $scope.currentPage--;
        };

        $scope.nextPage=function (){
            return $scope.currentPage++;
        };

        $scope.firstPage=function (){
            return $scope.currentPage === 1;
        };

        $scope.lastPage=function (){
            return $scope.currentPage === $scope.pageCount;
        };

        $scope.start=function (){
            return ($scope.currentPage - 1) * $scope.dataLimit;
        };

        // для удаления записи
        $scope.delete=function(restaurant){
            console.log("Delete restaurant " +  restaurant);
            $http.post("http://localhost:8089/api/restaurants/delete", restaurant)
                .success(function(data){
                    console.log("Success delete restaurant");

                    $http.get("http://localhost:8089/api/restaurants")
                        .success(function(data){
                            $scope.restaurants=data;
                            console.log("All ok! All restaurant getting!");
                        })
                        .error(function(data){
                            console.log("Error get restaurants");
                        });
                })
                .error(function(data){
                    console.log("Error get restaurants " + restaurant);
                });
        };
//====================================================================================================
        // для формы ресторана
        $scope.restaurant={
            id: 1,
            name: "",
            description: "",
            picture: 1,
        };
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
            // let token = $window.localStorage.getItem('Authorization');
            // if (token) {
            //     $http.defaults.headers.common.Authorization = token;
            // }
            $http.post("http://localhost:8089/restaurant/add", restaurant)
                .success(function(data){
                    console.log("Success save restaurant");
                })
                .error(function(data){
                    console.log("Error for save restaurant");
                });
        };
        //============ для контактов ==============

        $scope.editContact=function(contact){
            $scope.contacts.address =contact.address;
            $scope.contacts.phone = contact.phone;
            $scope.contacts.location = contact.location;
            $scope.contacts.mail = contact.mail;
            $scope.contacts.website = contact.website;
            $scope.contacts.restaurantId = contact.restaurantId;
        };

        //============= запрос на добавление контакта ======
        $scope.addContact=function (contact){
            console.log(contact);
            // let token = $window.localStorage.getItem('Authorization');
            // if (token) {
            //     $http.defaults.headers.common.Authorization = token;
            // }
            $http.post("http://localhost:8089/restaurant/contact/add", contact)
                .success(function(data){
                    console.log("Success save restaurant " + data);
                })
                .error(function(data){
                    console.log("Error for save restaurant " + data);
                });
        };




    });



})();