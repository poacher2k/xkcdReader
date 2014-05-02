// For å få ukedag der uka starter på mandag i stedet for søndag
Date.prototype.mGetDay = function() {
	return (this.getDay() + 6) % 7;
};

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
};

var app = /**
* myApp Module
*
* Description
*/
angular.module('xkcdReader', ['ionic', 'ngRoute', 'ngTouch']);

app.config(['$routeProvider', '$provide', function ($routeProvider, $provide){
	$routeProvider
		.when('/',
			{
				templateUrl: 'views/main.html',
				controller: 'MainController'
			})
		.otherwise(
			{
				redirectTo: '/'
			});












		return $provide.decorator('$rootScope', [
			'$delegate', function($delegate) {
				$delegate.safeApply = function(fn) {
					var phase = $delegate.$$phase;
					if (phase === "$apply" || phase === "$digest") {
						if (fn && typeof fn === 'function') {
							fn();
						}
					} else {
						$delegate.$apply(fn);
					}
				};
				return $delegate;
			}
		]);
	}]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});