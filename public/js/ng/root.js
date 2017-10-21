var root = angular.module("root", ['ngRoute']);
var dash = angular.module("dash", ['ngRoute']);

root.controller("loginController", ["$scope", "$http",function( $scope, $http ) {
	$('#LoginBtn').click(function (e) {
		var email = $('#InputEmail').val();
		var pass = $('#InputPassword').val();

		if(email != "" && pass != "") {
			$scope.checkLoogin(email, pass);
		}

		//window.location.href = '/dashboard';
		//return false;
	});

	$scope.checkLoogin = function(email, pass) {
		var url = "/checkLogin?email=" + email + "&pass=" + pass;

		$http.get(url)
			.then(function (response) {
				//console.log(response);
			})
	}

}]);

dash.controller("dashboardController", ["$scope", "$http",function( $scope, $http ) {
	$(document).ready(function(e) {
		console.log("First");
		$scope.fillTasks();
	});

	$scope.fillTasks = function() {
		var getTaskUrl = "/fetchTasks";
		console.log("da");
		$http.get(getTaskUrl)
			.then(function(response) {
				console.table(response);
		})
	}
}]);