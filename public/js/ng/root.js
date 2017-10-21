var root = angular.module("root", ['ngRoute']);

root.controller("loginController", ["$scope", "$http",function( $scope, $http ) {
	$('#LoginBtn').click(function (e) {
		var email = $('#InputEmail').val();
		var pass = $('#InputPassword').val();

		if(email != "" && pass != "") {
			$scope.checkLoogin(email, pass);
		}

		//window.location.href = '/dashboard';
		//return false;
	})

	$scope.checkLoogin = function(email, pass) {
		var url = "/checkLogin?email=" + email + "&pass=" + pass;

		$http.get(url)
			.then(function (response) {
				//console.log(response);
			})
	}

}]);