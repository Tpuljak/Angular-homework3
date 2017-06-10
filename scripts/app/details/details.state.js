angular.module('app').config(function ($stateProvider) {
$stateProvider
    .state('details', {
        url: '/details/:newsId',
        controller: 'DetailsController',
        templateUrl: 'scripts/app/details/details.html'
    })
})
