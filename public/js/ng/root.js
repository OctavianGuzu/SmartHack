var root = angular.module("root", ['ngRoute']);

root.controller("loginController", ["$scope", "$http",function( $scope, $http ) {
	$('#LoginBtn').click(function (e) {
		window.location.href = '/dashboard';
		return false;
	})

}]);