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
    this.setNewsToFavorite = function (newsList, selectedNewsId) {
        var indexOfSelectedNews = _.findIndex(newsList, news => news.Id === selectedNewsId);
        newsList[indexOfSelectedNews].Favorite = true;
        localStorageService.set("news", angular.toJson(newsList));
    }
});

angular.module('app').service('GetNewsService', function (localStorageService) {
    this.getNews = function (newsId) {
        return _.find(angular.fromJson(localStorageService.get("news"), news => news.Id == newsId));
    }
});

angular.module('app').directive('commentLister', function (localStorageService, attrs) {
    return {
        restrict: "EA",
        scope: {
            comments: _.take((_.find(angular.fromJson(localStorageService.get("news")), news => news.Id == attrs.newsId).Comments, parseInt(attr.commentsToDisplay)))
        },
        template: '<div ng-repeat="comment in comments">{{comment.Text}}</div>',
        controller: function () {
            console.log("a");
        }
    }
});