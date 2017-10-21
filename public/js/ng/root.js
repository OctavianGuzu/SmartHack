var root = angular.module("root", ['ngRoute']);

root.controller("loginController", ["$scope", "$http",function( $scope, $http ) {
	$scope.invalid_user = false;

	$('#LoginBtn').click(function (e) {
		var email = $('#InputEmail').val();
		var pass = $('#InputPassword').val();

		if(email != "" && pass != "") {
			$scope.checkLoogin(email, pass, function(resp) {
				console.log(resp);
				if(resp) {	
					window.location.href = '/dashboard';
				} else {
					$scope.invalid_user = true;
				}
			});
		}
	})

	$('#registerAcc').click(function (e) {
		window.location.href = '/register';
	})
	$('#forgotPass').click(function (e) {
		window.location.href = '/forgot-pass';
	})

	$scope.checkLoogin = function(email, pass, cb) {
		var url = "/checkLogin?email=" + email + "&pass=" + pass;

		$http.get(url)
			.then(function (response) {
				cb(response.data.data);
			})
	}

}]);