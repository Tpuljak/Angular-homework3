angular.module('app').config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

angular.module('app').service('AddToFavoritesService', function () {
    this.setNewsToFavorite = function ($scope, $rootScope, localStorageService, selectedNewsId) {
        var indexOfSelectedNews = _.findIndex($rootScope.newsToShow, news => news.Id === selectedNewsId);
        $rootScope.newsToShow[indexOfSelectedNews].Favorite = true;
        $rootScope.newsList[indexOfSelectedNews].Favorite = true;
        localStorageService.set("news", angular.toJson($rootScope.newsList));
    }
});

angular.module('app').service('GetNewsService', function (localStorageService) {
    this.getNews = function (newsId) {
        return _.find(angular.fromJson(localStorageService.get("news")), news => news.Id == newsId);
    }
});

angular.module('app').service('SearchNewsService', function () {
    this.search = function (searchInput, favorites, $rootScope) {
        var searchResaults = _.filter($rootScope.newsList, news => news.Name.includes(searchInput));
        if (favorites === true)
            return _.filter(searchResaults, news => news.Favorite === true);
        return searchResaults;
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
        controller: function ($scope, $rootScope) {
            var newsList = angular.fromJson(localStorageService.get("news"));
            if ($scope.listAllComments === "true") {
                $scope.comments = _.find(newsList, news => news.Id == $scope.newsId).Comments;
            }
            else {
                var selectedNews = _.find($rootScope.newsList, news => news.Id == $scope.newsId);
                $scope.comments = _.take(selectedNews.Comments, 2);
            }
        }
    }
});