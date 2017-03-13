'use strict';

bbs.controller('AuthCtrl', ['$scope', '$http', function($scope, $http){
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
					$scope.msg = res.message;
				}
			}, function errorCallBack (error) {
				$scope.msg = error.data;
			});
	};
}]);