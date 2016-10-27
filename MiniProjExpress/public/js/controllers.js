angular.module('mihajaApp.controllers', [])

.controller('FilmCtrl', function($scope, filmService, categorieService){

	$scope.initialiser = function () {
		$scope.films = [];
		$scope.categories = [];
		filmService.getAll().success(function(response) {
			$scope.films = response;
		}).finally(function() {
			
		});
		categorieService.getAll().success(function(response) {
			$scope.categories = response;
		}).finally(function() {
			
		});
	};

	$scope.ajouter = function () {
		alert(filmService.enregistrer($scope.form));
		var resets = {categorie: "", titre: "", date_sortie: "", description: "", acteur: "", realisateur: "", img: ""};
		$scope.form = angular.copy(resets);
		$scope.initialiser();
	};

	$scope.supprimer = function (film) {
		if (confirm("Voulez-vous vraiment supprimer?")) {
			filmService.supprimer(film.idFilm).success(function(response) {
				var index = $scope.films.indexOf(film);
				$scope.films.splice(index,1);
				alert("Le film a été supprimé");
			}).finally(function() {
				
			});
		}
	};

})

.controller('DetailCtrl', function($scope, $routeParams, filmService){
	var idFilm = $routeParams.idFilm;
	filmService.details(idFilm).success(function(response) {
		$scope.detail = response[0];
	}).finally(function() {
			
	});
});                                  