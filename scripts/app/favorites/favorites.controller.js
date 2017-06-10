angular.module('app').controller('FavoritesController', function ($state, $scope, $rootScope, localStorageService, SearchNewsService) {
    $scope.favoriteNewsList = _.filter($rootScope.newsList, news => news.Favorite === true);

    $scope.anyNews = function () {
        if ($scope.favoriteNewsList.length !== 0)
            $scope.anyFavorites = true;
        else
            $scope.anyFavorites = false;
    }

    $scope.anyNews();
    $scope.removeFromFavorites = function (selectedNewsId) {
        $rootScope.newsList[selectedNewsId - 1].Favorite = false;
        localStorageService.set("news", angular.toJson($rootScope.newsList));
        $scope.refreshNewsList();
        $scope.anyNews();
    }

    $scope.refreshNewsList = function () {
        $scope.favoriteNewsList = _.filter($rootScope.newsList, news => news.Favorite === true);
    }

    $scope.search = function () {
        $scope.favoriteNewsList = SearchNewsService.search($scope.searchInput, true, $rootScope);
        if ($scope.searchInput === "") {
            $scope.refreshNewsList();
        }
    }
});