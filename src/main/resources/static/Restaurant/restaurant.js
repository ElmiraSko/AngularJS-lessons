var app=angular.module("rApp",['ui.bootstrap']);

app.filter('beginning_data', function (){
    return function(input, begin){
        if (input){
            begin= +begin;
            return input.slice(begin);
        }
        return [];
    }
});
app.controller('restaurantController', function($scope, $http){
    $http.get("http://localhost:8089/api/restaurants").success(function(data){
        $scope.file=data;
        $scope.current_grid=1;
        $scope.data_limit=10;
        $scope.filter_data=$scope.file.length;
        $scope.entire_user=$scope.file.length;
    });

    $scope.page_position=function(page_number){
        $scope.current_grid=page_number;
    };


    $scope.sort_width=function(base){
        $scope.base=base;
        $scope.reverse=!$scope.reverse
    };
});


