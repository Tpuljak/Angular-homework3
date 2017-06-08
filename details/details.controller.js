angular.module('app').controller('DetailsController', function ($state, $scope, localStorageService, $stateParams) {
    $scope.news = _.find(angular.fromJson(localStorageService.get("news"), news => news.Id === $stateParams.newsId));
});