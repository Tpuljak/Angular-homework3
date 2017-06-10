angular.module('app').config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeController',
            templateUrl: 'scripts/app/home/home.html'
        });
});