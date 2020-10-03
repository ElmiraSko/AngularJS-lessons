angular.module("app", []).controller("appController", function($scope){
    $scope.fd="Admin";
});

angular.module("appRestaurants",[]).controller("restaurantsController", function($scope, $http){
    $scope.restaurants=[];
    $http.get("http://localhost:8089/api/restaurants").success(function (data){
        $scope.restaurants=data;
    })
});
