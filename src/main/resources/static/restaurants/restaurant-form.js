"use strict";

(function (){
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

    // контроллер для формы регистрации ресторана
    app.controller('restFormController', function($scope, $http, $window){

        $scope.restaurant={
            id: 1,   // не указан в api
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
            //=============================


    });


})();

