angular.module('appRoutes', [])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider

		.when('/', {
			templateUrl: '/static/views/film.html',
			controller: 'FilmCtrl'
		})
		.when('/ajouter', {
			templateUrl: '/static/views/ajouter.html',
			controller: 'FilmCtrl'
		})
		.when('/detail/:idFilm', {
			templateUrl: '/static/views/detail.html',
			controller: 'DetailCtrl'
		})
		.otherwise({
			redirectTo: "/"
		});

}]);