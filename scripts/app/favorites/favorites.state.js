angular.module('app').config(function ($stateProvider) {
    $stateProvider
        .state('favorites', {
            url: '/favorites',
            controller: 'FavoritesController',
            templateUrl: 'scripts/app/favorites/favorites.html'
        });
});