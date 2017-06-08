﻿angular.module('app').controller('HomeController', function ($state, $scope, localStorageService) {
    $scope.newsList = _.chunk(angular.fromJson(localStorageService.get("news")), 6);

    $scope.newsToShow = $scope.newsList[0];
    $scope.next = 1;
    $scope.unshownNews = true;

    $scope.AddMoreNews = function () {
        $scope.newsToShow = _.concat($scope.newsToShow, $scope.newsList[$scope.next++]);
        if ($scope.next === 3)
            $scope.unshownNews = false;
    }

    $scope.AddToFavorites = function (newsId) {
        var indexOfSelectedNews = _.findIndex($scope.newsToShow, news => news.Id === newsId);
        $scope.newsToShow[indexOfSelectedNews].Favorite = true;
        localStorageService.set("news", angular.toJson($scope.newsToShow));
    }
})