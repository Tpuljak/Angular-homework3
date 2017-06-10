angular.module('app').controller('HomeController', function ($scope, $rootScope, localStorageService, AddToFavoritesService, SearchNewsService) {
    $rootScope.newsList = angular.fromJson(localStorageService.get("news"));

    $rootScope.newsToShow = _.take($rootScope.newsList, 6);
    $scope.next = 12;
    $scope.unshownNews = true;

    $scope.AddMoreNews = function () {
        $rootScope.newsToShow = _.take($rootScope.newsList, $scope.next);
        if ($scope.next === 15)
            $scope.unshownNews = false;
        $scope.next = 15;
    }

    $scope.AddToFavorites = function (newsId) {
        AddToFavoritesService.setNewsToFavorite($scope, $rootScope, localStorageService, newsId);
    }

    $scope.search = function () {
        $rootScope.newsToShow = SearchNewsService.search($scope.searchInput, false, $rootScope);
        if ($scope.searchInput === "") {
            if ($scope.next === 12)
                $rootScope.newsToShow = _.take($rootScope.newsList, 6);
            else if ($scope.unshownNews === true)
                $rootScope.newsToShow = _.take($rootScope.newsList, 12);
            else
                $rootScope.newsToShow = $rootScope.newsList;
        }
    }
})