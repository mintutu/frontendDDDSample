var bbs = angular.module('bbs', ['ui.router']);

bbs.apiPrefix = '/api'

bbs.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	let states = [
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
}]);