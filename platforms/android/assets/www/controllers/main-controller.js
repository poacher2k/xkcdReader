var mainController = app.controller('MainController', ['$scope', 'XKCDService', '$ionicPopup', function($scope, XKCDService, $ionicPopup){
	var init = function() {
		$scope.isLoading = true;
		var comicPromise = XKCDService.get();
		comicPromise.then(function(data) {
			$scope.xkcd = data;
			$scope.isLoading = false;
		});
	};

	$scope.getNextComic = function() {
		$scope.isLoading = true;
		var nextComicNumber = $scope.xkcd.num + 1;
		var comicPromise = XKCDService.get(nextComicNumber);
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
		var nextComicNumber = $scope.xkcd.num - 1;
		var comicPromise = XKCDService.get(nextComicNumber);
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
			// 'title': 'Alt-text',
			'template': $scope.xkcd.alt
		});
	};

	init();
}]);