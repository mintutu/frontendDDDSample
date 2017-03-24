'use strict';

bbs.controller('AuthCtrl', ['$scope', '$http', '$translate', '$state',
function($scope, $http, $translate, $state){
	$scope.isShowForm = true;
	$scope.processLogin = function() {
		$scope.msg = '';
		const data = {
			email	: $scope.email,
			password: $scope.password
		};

		$http.post(bbs.apiPrefix + '/user/auth', data)
			.then(function successCallBack(res) {
				if (res.data.success) {
					$state.go("user-list"); // Go to index
				} else {
					$scope.msg = $translate.instant(res.data.message);
				}
			}, function errorCallBack (error) {
				$scope.msg = error.data.message;
			});
	};
}]);
