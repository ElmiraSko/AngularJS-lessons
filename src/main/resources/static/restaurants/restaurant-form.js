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
    app.controller('restFormController', function($scope, $http){

        $scope.restaurant={
            id: 1,   // не указан в api
            name: "",
            description: "",
            picture: 1,
            contact: {
                id: 1,   // не указан в api
                address:"",
                phone:"",
                mail:"",
                website:""
            }
        };

        //отправка картинки, хотела испытать
        // var form = new FormData();
        // form.append("file", fileInput.files[0], "/D:/Учёба/Командная/picture/1.jpg");
        //     console.log($scope.mfiles);

        //$scope.uploadFile=function (){
        //     $http({
        //         method: 'POST',
        //         url: 'http://localhost:8087/upload',
        //         data: form,
        //         headers: {'Content-Type': 'multipart/form-data'}
        //     }).success(function (d){
        //         console.log(d);
        //     }).error(function (d){
        //         console.log(d);
        //         console.log($scope.files);
        //     });
        // };


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
                })
                .error(function (d){
                    console.log(d);
                });
        };

        //============= запрос на регистрацию (добавление) ресторана ======
        $scope.addRestaurant=function (restaurant){
            console.log(restaurant);

            // // отправляем объект ресторана в пост-запросе на бэк, работает, временно закомментир-а
            // $http.post("http://localhost:8089/api/restaurants/", restaurant)
            //     .success(function(data){
            //         console.log("Success save restaurant");
            //     })
            //     .error(function(data){
            //         console.log("Error for save restaurant");
            //     });
        };
            //=============================


    });


})();

