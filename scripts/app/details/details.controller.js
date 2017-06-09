angular.module('app').controller('DetailsController', function ($state, $scope, localStorageService, $stateParams, GetNewsService) {
    $scope.news = GetNewsService.getNews($stateParams.newsId);

});