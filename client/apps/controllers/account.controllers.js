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

function AccountController(AuthService, $state, loaderService) {
	loaderService.setValue(false);
	if (AuthService.userIsLogin()) {
		AuthService.profile().then(
			(x) => {
				if (x) $state.go(x.rolename + '-home');
				else $state.go('admin' + '-home');
			},
			(err) => {
				$state.go('login');
			}
		);
	}
}

function LoginController($scope, $state, AuthService, FcmService, loaderService) {
	$scope.login = function (user) {
		$scope.isBusy = true;
		loaderService.setValue(true);
		AuthService.login(user).then((x) => {
			$scope.isBusy = false;
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

	$scope.registrasi = function (user) { };
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
		AuthService.resetPassword(model).then((res) => {
			message.info('Password Anda telah di reset, Periksa Email Anda Untuk Membuat Password Baru');
		});
	};
}

function NewPasswordController($scope, $stateParams, AuthService, message) {
	var token = $stateParams.token;
	$scope.changePassword = function (data) {
		AuthService.changePassword(data, token).then((res) => {
			message.info('Password Anda Berhasil Diubah, Silahkan Login Dengan Password Yang Baru');
		});
	};
}

function ConfirmPasswordController() { }

function ConfirmEmailController($state, $stateParams, AuthService) {
	var token = $stateParams.token;
	AuthService.confirmEmail(token).then((x) => {
		$state.go('login');
	});
}

function InboxController(AuthService, $state, $scope, InboxService, loaderService, helperServices, PermohonanService, message, loaderService) {
	AuthService.profile().then((profile) => {
		$scope.Role = profile.rolename
	})
	InboxService.get().then((res) => {
		$scope.messages = res;
		loaderService.setValue(false);
	});

	$scope.changedate = (date) => {
		date = new Date(date);

		return timesince(date);
	};

	$scope.delete = (messages) => {
		var datas = messages.filter((x) => x.isChecked);
		loaderService.setValue(true)
		$scope.deleteBusy = true;
		if(datas.length>0){
			message.dialog('Anda Yakin Ingin Menyimpan', 'Simpan', 'Batal').then(x=>{
				InboxService.delete(datas).then((res) => {
					if (res.data) {
						datas.forEach((element) => {
							var index = messages.indexOf(element);
							datas.splice(index, 1);
						});
					}
					$scope.deleteBusy = false;
					loaderService.setValue(false)
				});
			},
			(error) => {
				message.errorText('Batal');
				$scope.deleteBusy = false;
				loaderService.setValue(false)
			})
		}else{
			message.errorText('Pilih Pesan');
			$scope.deleteBusy = false;
			loaderService.setValue(false)
		}
		
	};
	$scope.checkAll= false;
	$scope.Checklist=()=>{
		if($scope.checkAll==true){
			$scope.messages.forEach((x)=>{
				x.isChecked=true;
			})
		}else{
			$scope.messages.forEach((x)=>{
				x.isChecked=false;
			})
		}
	}

	$scope.read = (item) => {
		loaderService.setValue(true);
		PermohonanService.getById(item.data.iddata).then(x => {
			var state = helperServices.stateEdit(x.jenis, $scope.Role);
			InboxService.read(item).then(unread=>{
				$state.go(state, { id: item.data.iddata }, { reload: true });
			})
		});
	};

	function timesince(date) {
		var seconds = Math.floor((new Date() - date) / 1000);
		var interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + ' years';
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + ' months';
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + ' days';
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + ' hours';
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + ' minutes';
		}
		return Math.floor(seconds) + ' seconds';
	}
}
