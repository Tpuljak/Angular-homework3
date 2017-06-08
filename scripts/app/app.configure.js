angular.module('app', [
    "LocalStorageModule"
]);

anuglar.module('app').config(function ($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('newsList', {
            url: '/',
            controller: "NewsListController",
            templateUrl: 
        })
})