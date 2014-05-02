// we need ionic for all ionic-related stuff, ngRoute to provide the routing specified in the config, and ngTouch to provide directives for swiping
var app = angular.module('xkcdReader', ['ionic', 'ngRoute', 'ngTouch']); // this is where we create the actual module, and store it in the variable 'app'
// 
app.config(['$routeProvider', function ($routeProvider){ // the config of the app, only run once
	$routeProvider // we need this to provide routing, seen as http://.../index.html#/{route}, only that index.html is usually hidden
		.when('/', // when the user hits the index.html/
			{
				templateUrl: 'views/main.html', // load this template
				controller: 'MainController' // hook it up with this controller
			})
		.otherwise( // if the user hits anywhere else than index.html/ , for example index.html/cake, 
			{
				redirectTo: '/' // redirect the user to index.html/
			});
	}]);

app.run(function($ionicPlatform) { // ionic specific stuff
  $ionicPlatform.ready(function() {
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});