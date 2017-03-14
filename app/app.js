const bbs = angular.module('bbs', ['ui.router', 'pascalprecht.translate']);

bbs.apiPrefix = '/api'

bbs.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider
	,$translateProvider) {

    $urlRouterProvider.otherwise('/');
	var states = [
		{
			name: 'login',
			url: '/',
			controller: 'AuthCtrl',
			templateUrl: './app/views/login.html',
			data: {pageTitle: 'BBS'}	
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});

    $translateProvider
        .translations('en', translations)
        .preferredLanguage('en')
        .useSanitizeValueStrategy('escape');
}]);