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
            templateUrl: 'home/home.html'
        })
        .state('details', {
            url: '/details/:newsId',
            controller: 'DetailsController',
            templateUrl: 'details/details.html'
        })

});
