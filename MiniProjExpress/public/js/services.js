angular.module('mihajaApp.services', [])

.directive('fileModel', ['$parse', function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
		  var model = $parse(attrs.fileModel);
		  var modelSetter = model.assign;
		  
		  element.bind('change', function(){
			 scope.$apply(function(){
				modelSetter(scope, element[0].files[0]);
			 });
		  });
	   }
	};
}])

.service('photoService', function($http) {

    this.uploadPhoto = function(files) {
		var fd = new FormData();
		console.log(files);
		fd.append("file",files);
		return $http.post('http://www.mihaja23.netai.net/WebService/upload.php',fd, {
			transformRequest: angular.identity, 
			headers: {'Content-Type': undefined}
		});
	};

})


.service('filmService', function($http, photoService) {	

	var baseUrl = 'http://mihaja23.netai.net/';

	this.getAll = function() {
		return $http.get(baseUrl+'WebService/main.php');
	};

	this.supprimer = function(idFilm) {
		return $http.get(baseUrl+'WebService/main.php?action=deleteFilm&idFilm='+idFilm);
	};

	this.details = function(idFilm) {
		return $http.get(baseUrl+'WebService/main.php?action=getMovie&idFilm='+idFilm);
	};

	this.supprimerDernierEnregistrement = function() {
		return $http.get(baseUrl+'WebService/main.php?action=deleteLastFilm');
	};
		
	this.enregistrer = function(film) {
		var msg = "Enregistrement réussi";
		var upload = photoService.uploadPhoto(film.img);
		var urlImg = "http://mihaja23.netai.net/Photo/"+film.img.name;
		console.log(urlImg);
		var Indata = {'idCategorie': film.categorie, 'titre': film.titre,'date_sortie': film.date_sortie, 'description': film.description, 
		'acteur': film.acteur, 'realisateur': film.realisateur, 'image' : urlImg };
		$http.post("http://mihaja23.netai.net/WebService/main.php?add=movie", Indata).then(function(data) {
			upload.then(function(data) {
				console.log("Success save");
			})
			.catch(function(error, status) {
				this.supprimerDernierEnregistrement();
				msg = "Erreur lors de l'enregistrement : "+error;
			});
		})
		.catch(function(error, status) {
			msg = "Erreur lors de l'enregistrement : "+error;
		});
		return msg;
	};

})

.factory('categorieService', function($http) {
	var baseUrl = 'http://mihaja23.netai.net/';
	return {
		getAll: function() {
			return $http.get(baseUrl+'WebService/main.php?action=getCat');
		}
	};
});
