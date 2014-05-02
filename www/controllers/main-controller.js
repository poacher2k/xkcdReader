var mainController = app.controller('MainController', ['$scope', 'XKCDService', '$ionicPopup', function($scope, XKCDService, $ionicPopup){
	// an init function to keep order of everything that should happen when the controller is initialized
	var init = function() {
		$scope.isLoading = true;
		var comicPromise = XKCDService.get(); // get the latest comic
		comicPromise.then(function(data) {
			$scope.xkcd = data; // set it to the xkcd variable on the scope object
			$scope.isLoading = false;
		});
	};

	$scope.getNextComic = function() {
		$scope.isLoading = true;
		var nextComicNumber = $scope.xkcd.num + 1; // find next comic number
		var comicPromise = XKCDService.get(nextComicNumber); // and ask for the comic
		comicPromise.then(function(data) {
			$scope.xkcd = data;
			$scope.isLoading = false;
		});
		comicPromise.error(function() {
			$scope.isLoading = false;
		});
	};

	$scope.getPreviousComic = function() {
		$scope.isLoading = true;
		var nextComicNumber = $scope.xkcd.num - 1; // find previous comic number
		var comicPromise = XKCDService.get(nextComicNumber); // and ask for the comic
		comicPromise.then(function(data) {
			$scope.xkcd = data;
			$scope.isLoading = false;
		});
		comicPromise.error(function() {
			$scope.isLoading = false;
		});
	};
	
	$scope.showAlt = function() {
		$ionicPopup.alert({
			'template': $scope.xkcd.alt
		});
	};

	init();
}]);