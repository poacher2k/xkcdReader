app.factory('PhoneService', ['$http', function($http) {
	var endPoint = 'http://xkcd.com/';
	var urlEnd = '/info.0.json';
	return {
		get: function(comicNumber) {
			if(!comicNumber){ // comicNumber has not been supplied. this will only happen when the app is first opened or when the last update was more than 12 hours ago
				comicNumber = ''; // this will ensure we get the latest, according to the XKCD API
			}
			return $http.get(endPoint + comicNumber + urlEnd); // make the request, return the request promise
		}
	};
}]);