angular.module('app').controller('HomeController', function ($state, $scope, localStorageService, AddToFavoritesService) {
    $scope.newsList = angular.fromJson(localStorageService.get("news"));

    $scope.newsToShow = _.take($scope.newsList, 6);
    $scope.next = 12;
    $scope.unshownNews = true;

    $scope.AddMoreNews = function () {
        $scope.newsToShow = _.take($scope.newsList, $scope.next);
        if ($scope.next === 15)
            $scope.unshownNews = false;
        $scope.next = 15;
    }

    $scope.AddToFavorites = function (newsId) {
        AddToFavoritesService.setNewsToFavorite($scope, localStorageService, newsId);
    }
})