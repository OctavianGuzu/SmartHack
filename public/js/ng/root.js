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
	var pieChart = null;

	$(document).ready(function(e) {
		$scope.fillTasks();
		$scope.loadChart();
	});

	$scope.fillTasks = function() {
		var getTaskUrl = "/fetchTasks";
		$http.get(getTaskUrl)
			.then(function(response) {

                var appendToHtml = "";
				var tasks = response["data"].data;
                //console.log(tasks);
                for (i = 0; i < tasks.length; i++) {
                    appendToHtml += 
                    	'<tr><td>' + tasks[i]["id"] +
                    	'<tr><td>' + tasks[i]["name"] +
						'</td><td>' + tasks[i]["Assignee"] +
						'</td><td>' + tasks[i]["Assigner"] +
						'</td><td>' + tasks[i]["Due Date"] +
						'</td><td>' + tasks[i]["Priority"] +
						'</td><td>' + tasks[i]["Date Created"] +
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

    	var taskName = $('#InputNameTask').val();
    	var assignee = $('#InputAssigneeTask').val();
    	var assigner = $('#InputAssignerTask').val();
    	var dueDate = $('#InputDdateTask').val();
    	var descriptionTask = $('#InputDescriptionTask').val();

    	if(taskName != "" && assignee != "" && assigner &&
    		dueDate != "" && descriptionTask != "") {
    		var url="/addTask?taskName=" + taskName +
    				"&assignee=" + assignee +
    				"&assigner=" + assigner +
    				"&dueDate=" + dueDate +
    				"&descriptionTask=" + descriptionTask;
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

    $scope.loadChart = function () {
    	var url = "/fetchTasksAll";
    	

    	$http.get(url)
    		.then(function (response) {
    			var users = response.data.data;
    			var usersCount = {};

    			for(var i = 0; i < users.length; i++) {
    				if(usersCount[users[i]["Assignee"]]) {
    					usersCount[users[i]["Assignee"]] ++;
    				} else {
    					usersCount[users[i]["Assignee"]] = 1;
    				}
    			}

    			//console.log(usersCount);

    			var chartData = [];

    			for(var key in usersCount) {
    				chartData.push({y: usersCount[key], label: key});
    			}

    			$scope.showChart(chartData);
    		})
    }

    $scope.showChart = function (chartData) {
    	pieChart = new CanvasJS.Chart("PieChart", {
      		animationEnabled: true,
      		title: {
        		text: "Number of Completed Tasks"
      		},
      		data: [{
        		type: "pie",
        		startAngle: 0,
        		yValueFormatString: "##0\"\"",
        		indexLabel: "{label} {y}",
        		dataPoints: chartData
        		
      		}]
    	});

    	pieChart.render();
    }


}]);