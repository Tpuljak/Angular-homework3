angular.module('app').controller('DetailsController', function ($state, $scope, localStorageService, $stateParams, GetNewsService, AddToFavoritesService) {
    $scope.news = GetNewsService.getNews($stateParams.newsId);

    switch ($scope.news.Raiting) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            $scope.raitingText = "Loše";
            break;
        case 6:
        case 7:
        case 8:
            $scope.raitingText = "Solidno";
            break;
        case 9:
        case 10:
            $scope.raitingText = "Odlično";
            break;
        default:
            $scope.raitingText = "error";
            break;
    }

    $scope.AddToFavorites = function (newsId) {
        AddToFavoritesService.setNewsToFavorite($scope, localStorageService, newsId);
    }
});