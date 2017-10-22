var root = angular.module("root", ['ngRoute']);
var dash = angular.module("dash", ['ngRoute']);

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
	});

	$('#registerAcc').click(function (e) {
		window.location.href = '/register';
	});
	$('#forgotPass').click(function (e) {
		window.location.href = '/forgot-pass';
	});

	$scope.checkLoogin = function(email, pass, cb) {
		var url = "/checkLogin?email=" + email + "&pass=" + pass;

		$http.get(url)
			.then(function (response) {
				cb(response.data.data);
			})
	}

}]);

dash.controller("dashboardController", ["$scope", "$http",function( $scope, $http ) {
	$scope.insertSucc = false;
	$scope.insertFail = false;

	$(document).ready(function(e) {
		$scope.fillTasks();
	});

	$scope.fillTasks = function() {
		var getTaskUrl = "/fetchTasks";
		$http.get(getTaskUrl)
			.then(function(response) {

                var appendToHtml = "";
				var tasks = response["data"].data;
                console.log(tasks);
                for (i = 0; i < tasks.length; i++) {
                    appendToHtml += 
                    	'</td><td>' + tasks[i]["id"] +
                    	'</td><td>' + tasks[i]["name"] +
						'</td><td>' + tasks[i]["Assignee"] +
						'</td><td>' + tasks[i]["Assigner"] +
						'</td><td>' + tasks[i]["Due Date"] +
						'</td><td>' + tasks[i]["Date Created"] +
						'</td><td>' + tasks[i]["Priority"] +
						'</td><td>' + tasks[i]["Description"] +	'</td></tr>';
                }
				$('#dataTable').append(appendToHtml);
		})
	};

    $('#LogoutBtn').click(function (e) {
        window.location.href = "/";
    })


    $('#TaskInsertBtn').click(function (e) {
    	$scope.insertSucc = false;
		$scope.insertFail = false;
		$scope.DoneSucc = false;

    	var taskName = $('#InputNameTask').val();
    	var assignee = $('#InputAssigneeTask').val();
    	var assigner = $('#InputAssignerTask').val();
    	var dueDate = $('#InputDdateTask').val();
    	var descriptionTask = $('#InputDescriptionTask').val();
    	var priotiryTask = $('#PrioritynTask').val();

    	if(taskName != "" && assignee != "" && assigner &&
    		dueDate != "" && descriptionTask != "") {
    		var url="/addTask?taskName=" + taskName +
    				"&assignee=" + assignee +
    				"&assigner=" + assigner +
    				"&dueDate=" + dueDate +
    				"&descriptionTask=" + descriptionTask +
    				"&priority=" + priotiryTask;
    		$http.get(url)
    			.then(function(response) {
    				//TODO afisare succes pentru inserare
    				$scope.$apply(function () {
    					$scope.insertSucc = true;
         			});
    				
    			})
    	} else {
    		$scope.$apply(function () {
    				$scope.insertFail = true;
         	});
    	}
    })

    $('#MessageSendBtn').click(function (e) {
        $scope.insertSucc = false;
        $scope.insertFail = false;
        var receiver = $('#InputReceiver').val();
        var subject = $('#InputSubject').val();
        var message = $('#InputMessage').val();

        if(receiver && subject && message) {
            var url="/addMessage?receiver=" + receiver +
                "&subject=" + subject +
                "&message=" + message;
            $http.get(url)
                .then(function(response) {
                    $scope.$apply(function () {

                    });

                })
        } else {
            $scope.$apply(function () {

            });
        }
    })



    $('#DoneBtn').click(function (e) {
    	//window.location.reload();
    	$scope.DoneSucc = false;
    	var taskIDString = $('#IDTask').val();

    	if(taskID) {
    		var taskID = parseInt(taskIDString, 10);
    		var url = "/doneTask?taskID=" + taskID;
    		$http.get(url)
    			.then(function (response) {
    				window.location.reload();
    			})
    	} else {
    		window.location.reload();
    	}
    })
}]);