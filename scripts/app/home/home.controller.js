angular.module('app').controller('HomeController', function ($state, $scope, localStorageService, AddToFavoritesService) {
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
        AddToFavoritesService.setToFavorites($scope.newsToShow, newsId);
    }
})