angular
	.module('account.controller', [])
	.controller('AccountController', AccountController)
	.controller('LoginController', LoginController)
	.controller('RegisterController', RegisterController)
	.controller('InboxController', InboxController);

function AccountController(AuthService, $state, $scope) {
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

function LoginController($scope, $state, AuthService, socket) {
	$scope.login = function (user) {
		AuthService.login(user).then((x) => {
			if (x.roles.length == 1) {
				var role = x.roles[0];
				$state.go(role + '-home');
				socket.start();
			} else {
				var role = x.roles.find((x) => x !== 'dosen');
				$state.go(role + '-home');
			}
		});

	};

	$scope.registrasi = function (user) {};
}

function RegisterController(
	$scope,
	$state,
	AuthService,
	UniversitasService,
	FakultasService,
	JabatanService,
	ProgdiService
) {
	UniversitasService.get().then((x) => {
		$scope.Universitas = x;
		JabatanService.get().then((x) => {
			$scope.Jabatans = x;
		});
	});

	$scope.SelectUniversitas = function (params) {
		setTimeout((x) => {
			FakultasService.getByParent(params.iduniversitas).then(
				(x) => {
					$scope.Fakultas = x;
				},
				(err) => {}
			);
		}, 100);
	};
	$scope.SelectFakultas = function (params) {
		if (params) {
			ProgdiService.getByParent(params.idfakultas).then(
				(x) => {
					$scope.ProgramStudis = x;
				},
				(err) => {}
			);
		}
	};

	$scope.registrasi = function (user) {
		user.idprogramstudi = $scope.ProgramStudi.idprogramstudi;
		user.idjabatan = $scope.Jabatan.idjabatan;
		AuthService.registerdosen(user).then((x) => {
			$state.go('login');
		});
	};
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