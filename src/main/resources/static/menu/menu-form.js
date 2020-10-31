"use strict";

(function (){
    let app=angular.module("myApp");
    // дублирование кода - как избавиться?
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

    });


/*
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