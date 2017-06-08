angular.module('app').run(function (localStorageService, $http) {
    $http.get('/./data/newsList.json').then(function (data) {
        localStorageService.set("news", angular.toJson(data.data));
    })
})