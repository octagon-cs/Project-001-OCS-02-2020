angular
	.module('account.controller', [])
	.controller('AccountController', AccountController)
	.controller('LoginController', LoginController)
	.controller('RegisterController', RegisterController)
	.controller('ResetPasswordController', ResetPasswordController)
	.controller('NewPasswordController', NewPasswordController)
	.controller('ConfirmPasswordController', ConfirmPasswordController)
	.controller('ConfirmEmailController', ConfirmEmailController)
	.controller('InboxController', InboxController);

function AccountController(AuthService, $state, $scope) {
	// if (AuthService.userIsLogin()) {
	// 	AuthService.profile().then(
	// 		(x) => {
	// 			if (x) $state.go(x.rolename + '-home');
	// 			else $state.go('admin' + '-home');
	// 		},
	// 		(err) => {
	// 			$state.go('login');
	// 		}
	// 	);
	// }
}

function LoginController($scope, $state, AuthService, FcmService) {
	$scope.login = function (user) {
		AuthService.login(user).then((x) => {
			if (x.roles.length == 1) {
				var role = x.roles[0];
				$state.go(role + '-home');
				FcmService.start();
			} else {
				var role = x.roles.find((x) => x !== 'dosen');
				$state.go(role + '-home');
			}
		});

	};

	$scope.registrasi = function (user) {};
}

function RegisterController($scope, $state, AuthService) {

	$scope.registrasi = function (user) {
		AuthService.registrasi(user).then((x) => {
			$state.go('login');
		});
	};
}

function ResetPasswordController($scope, AuthService, message) {
	$scope.resetPassword = (model) => {
		AuthService.resetPassword(model).then(res => {
			message.info("Password Anda telah di reset, Periksa Email Anda Untuk Membuat Password Baru");
		});
	}
}


function NewPasswordController($scope, $stateParams, AuthService, message) {
	var token = $stateParams.token;
	$scope.changePassword = function (data) {
		AuthService.changePassword(data, token).then(res => {
			message.info("Password Anda Berhasil Diubah, Silahkan Login Dengan Password Yang Baru");
		});
	}
}

function ConfirmPasswordController() {

}

function ConfirmEmailController($state, $stateParams, AuthService) {
	var token = $stateParams.token;
	AuthService.confirmEmail(token).then((x) => {
		$state.go('login');
	});
}


function InboxController(AuthService, $state, $scope, InboxService) {

	InboxService.get().then(res => {
		$scope.messages = res;
	});


	$scope.changedate = (date) => {
		date = new Date(date);

		return timesince(date);

	}


	$scope.delete = (messages) => {
		var datas = messages.filter(x => x.isChecked);
		InboxService.delete(datas).then(res => {
			if (res.data) {
				datas.forEach(element => {
					var index = messages.indexOf(element);
					datas.splice(index, 1);
				});
			}
		})
	}


	$scope.read = (data) => {
		InboxService.read(data).then(res => {
			//messages.info()
		})
	}

	function timesince(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		var interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}




}