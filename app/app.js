const bbs = angular.module('bbs', [
	'sample.repository',
	'sample.resource',
	'ui.router',
	'ngResource',
	'ui.grid',
	'ui.grid.pagination',
	'ui.grid.autoResize',
	'ui.grid.selection',
	'ui.grid.exporter',
	'ui.grid.saveState',
	'ui.grid.treeView',
	'ui.grid.pinning',
	'ui.grid.resizeColumns',	
	'pascalprecht.translate']);

bbs.apiPrefix = '/api'

bbs.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider) {

    $urlRouterProvider.otherwise('/');
    var states = [{
            name: 'login',
            url: '/',
            controller: 'AuthCtrl',
            templateUrl: './app/views/login.html',
            data: {
                pageTitle: 'BBS'
            }
        },
        {
            name: 'user-list',
            url: '/user-list',
            controller: 'UserCtrl',
            templateUrl: './app/views/user/list.html',
            data: {
                pageTitle: 'User List'
            }
        }
    ];

		function authenticate($q, $cookies, $state, $timeout) {
			if (!_.isEmpty($cookies.getAll())) {
				return $q.when();
			} else {
				$timeout(function() {
					$state.go('login');
				});
				return $q.reject();
			}
		};

    states.forEach(function(state) {
        $stateProvider.state(state);
    });

    $translateProvider
        .translations('en', translations)
        .preferredLanguage('en')
        .useSanitizeValueStrategy('escape');
}]);
