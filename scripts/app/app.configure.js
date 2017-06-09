angular.module('app', [
    'LocalStorageModule',
    'ui.router'
]);

angular.module('app').config(function ($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeController',
            templateUrl: 'scripts/app/home/home.html'
        })
        .state('details', {
            url: '/details/:newsId',
            controller: 'DetailsController',
            templateUrl: 'scripts/app/details/details.html'
        })

});

angular.module('app').service('AddToFavoritesService', function () {
    this.setNewsToFavorite = function ($scope, localStorageService, selectedNewsId) {
        var indexOfSelectedNews = _.findIndex($scope.newsToShow, news => news.Id === selectedNewsId);
        $scope.newsToShow[indexOfSelectedNews].Favorite = true;
        localStorageService.set("news", angular.toJson($scope.newsToShow));
    }
});

angular.module('app').service('GetNewsService', function (localStorageService) {
    this.getNews = function (newsId) {
        return _.find(angular.fromJson(localStorageService.get("news")), news => news.Id == newsId);
    }
});

angular.module('app').directive('commentLister', function (localStorageService) {
    return {
        restrict: "EA",
        scope: {
            newsId: '@',
            listAllComments: '@'
        },
        template: '<div ng-repeat="comment in comments">{{comment.Text}}</div>',
        controller: function ($scope) {
            var newsList = angular.fromJson(localStorageService.get("news"));
            if ($scope.listAllComments) {
                $scope.comments = _.find(newsList, news => news.Id == $scope.newsId).Comments;
            }
            else {
                $scope.comments = _
                    .chain(newsList)
                    .find(news => news.Id == $scope.newsId)
                    .take(newsList.Comments, 2);
            }
        }
    }
});