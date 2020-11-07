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

    // контроллер для меню
    app.controller('menuController', function($scope, $http, $window){
// при отрисовки html появляется лишний запрос на получение картинки, надо понять в чем дело
        console.log($scope);

        let token = $window.localStorage.getItem('Authorization');
        let myRestaurantId = $window.localStorage.getItem('restaurantId');
        //== удалить
        $scope.file=[];
        $scope.token='?token=' + $window.localStorage.getItem('Authorization');

        $scope.urlForGet="http://localhost:8089/api/restaurants/menu/"+$window.localStorage.getItem('restaurantId');
        console.log("Контроллер menu!");
        console.log("url для меню: " + $scope.urlForGet);
        //==
        //=== получение всего меню =======
        if (token) {
            $http.defaults.headers.common.Authorization = token;
        }
        $http.get("https://cookstarter-restaurant-service.herokuapp.com/menu/get/"+$window.localStorage.getItem('restaurantId'))
            .success(function(data){
                $scope.file=data;

                console.log($scope.file);

                $scope.currentPage=1; // текущая страница
                $scope.dataLimit=5;  // количество выводимых строк
                console.log($scope.dataLimit); // вывод на консоль

                $scope.fileLength=$scope.file.length;
                $scope.pageCount=Math.ceil($scope.fileLength / $scope.dataLimit);
                console.log($scope.pageCount);

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
            }).error(function(data){});

        $scope.sort_width=function(base){
            $scope.base=base;
            $scope.reverse=!$scope.reverse
        };

        $scope.delete=function (id){
            $http.post()
        };


        //=== для формы добавления блюда ====

        $scope.dish={
            // name:"",
            // price:0,
            // description:"",
            // pictureId:0,
            // restaurantId: myRestaurantId
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
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.post("http://localhost:8087/picture/api/add", fd, conf)
                .success(function (d){
                    console.log(d);
                    console.log(d.pictureId + ' - получили pictureId из json ответа');
                    // присвоили индекс картинки свойству dish.pictureId
                    $scope.dish.pictureId=d.pictureId;
                    console.log($scope.dish.pictureId);
                    $scope.isUploadImj=true;
                })
                .error(function (d){
                    console.log(d);
                });
        };

        //============= запрос на добавление блюда, работает ======
        $scope.addDish=function(dish){
            $scope.dish.restaurantId=myRestaurantId;
            console.log(dish);

            // if($scope.menuForm.$valid){

                if (token) {
                    $http.defaults.headers.common.Authorization = token;
                }
                $http.post("https://cookstarter-restaurant-service.herokuapp.com/dish/add", dish)
                    .success(function(data){
                        console.log("Success save dish");
                        $window.location.href = '#/restaurants';
                    })
                    .error(function(data){
                        console.log("Error for save dish");
                    });

            // } else {
            //     $window.location.href = '#/restaurants'; // изменить
            // }

        };


        //============= запрос на удаление блюда ======
        $scope.deleteDish=function(id){
            console.log("Delete dish by id = " + id);
            if (token) {
                $http.defaults.headers.common.Authorization = token;
            }
            $http.post("https://cookstarter-restaurant-service.herokuapp.com/dish/delete", id)
                .success(function(data){
                    console.log("Success save dish");
                })
                .error(function(data){
                    console.log("Error for save dish");
                });
        };

    });
})();

