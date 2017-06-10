angular.module('app').controller('HomeController', function ($scope, $rootScope, localStorageService, AddToFavoritesService, SearchNewsService) {
    $rootScope.newsList = angular.fromJson(localStorageService.get("news"));

    $rootScope.newsToShow = _.take($rootScope.newsList, 6);
    $scope.next = 12;
    $scope.unshownNews = true;

    $scope.AddMoreNews = function () {
        $rootScope.newsToShow = _.take($rootScope.newsList, $scope.next);
        if ($scope.next > $rootScope.newsList.length)
            $scope.unshownNews = false;
        $scope.next += 6;
        $scope.searchInput = "";
    }

    $scope.AddToFavorites = function (newsId) {
        AddToFavoritesService.setNewsToFavorite($scope, $rootScope, localStorageService, newsId);
    }

    $scope.search = function () {
        $rootScope.newsToShow = SearchNewsService.search($scope.searchInput, false, $rootScope);
        if ($scope.searchInput === "") {
            $rootScope.newsToShow = _.take($rootScope.newsList, $scope.next - 6);
        }
    }
})