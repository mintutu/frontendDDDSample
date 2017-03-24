'use strict';

bbs.controller('UserCtrl', ['$scope', '$filter', '$translate', 'UserRepo', function($scope, $filter, $translate, UserRepo){

	$scope.introOptions = {
        steps:[],
        disableInteraction: true,
        showStepNumbers: false,
        exitOnOverlayClick: true,
        exitOnEsc:true,
        nextLabel: '<strong>' + $filter("translate")("all.next") + '</strong>',
        prevLabel: '<span style="color:green">' + $filter('translate')("all.previous") + '</span>',
        skipLabel: $filter('translate')("all.exit"),
        doneLabel: $filter('translate')("all.done")
    };

	$scope.gridOptions = {
	        columnDefs: $scope.columnDefs,
	        enableGridMenu: false,
	        enableFiltering: true,
	        enableSorting: true,
	        i18n: 'en',
	        enableColumnResize: true,
	        paginationPageSizes: [100, 200, 300],
	        paginationPageSize: 100,
	        paginationCurrentPage: 1,
	        minRowsToShow: 12,
	        enableSelectAll: true,
	        enablePaginationControls: true,
	        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
	        onRegisterApi: function(gridApi){
	            $scope.gridApi = gridApi;
	        }
	    };
	$scope.gridOptions.columnDefs = [
		{
			name: 	'Id',
			field: 	'userId',
			width:	40,
			enableColumnMenu: false,
			enableFiltering: false
		},
		{
			displayName: 	$translate.instant('user.label.name'),
			field: 	'username',
			width:	140,
			enableColumnMenu: false,
			//TODO sorting
		},
		{
			displayName: 	$translate.instant('user.label.enail'),
			field: 	'email',
			width:	180,
			enableColumnMenu: false,
			//TODO sorting
		},
		{
			displayName: 	$translate.instant('all.is_inactive'),
			field: 	'isInactive',
			width:	50,
			cellTemplate: '<input type="checkbox" ng-model="row.entity.isInactive" ng-change="grid.appScope.updateInactiveStatus(row.entity)">',
			enableColumnMenu: false,
			enableFiltering: false
			//TODO sorting
		},
	];

	$scope.init = function(){
		$scope.getAllUserList();
	};

	$scope.formatToDisplay = function (data) {
		angular.forEach(data, function (val, idx) {
				data[idx].number = ($scope.gridOptions.paginationCurrentPage - 1) * $scope.gridOptions.paginationPageSize + idx + 1;
		});
		return data;
};

	$scope.getAllUserList = function(){
		UserRepo.getUserList('all').then(
			function(result) {
				$scope.gridOptions.data = $scope.formatToDisplay((_.orderBy(result, ['createdDate','userId'], ['desc','desc'])));                				
			},
			function(error) {
				console.alert(error.data)
			}
		)
	};

	$scope.introOptions.steps = [
		{
			element: '.ui-grid-render-container-body .ui-grid-header',
			intro: $translate.instant("intro.user_list_header"),
			position: 'top'
		},
		{
				element: '#reset-filter-btn',
				intro: $translate.instant("intro.reset_filter_btn"),
				position: 'left'
		},
		{
				element: '.action-btn',
				intro: $translate.instant("intro.action_btn"),
				position: 'top'
		}
	];
}]);
