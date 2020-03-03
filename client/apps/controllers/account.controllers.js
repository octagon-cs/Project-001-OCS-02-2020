angular
	.module('account.controller', [])
	.controller('AccountController', AccountController)
	.controller('LoginController', LoginController)
	.controller('RegisterController', RegisterController);

function AccountController(AuthService, $state, $scope) {
	// if (AuthService.userIsLogin()) {
	// AuthService.profile().then(
	// (x) => {
	// if (x) $state.go(x.rolename + '-home');
	// else $state.go('admin' + '-home');
	// },
	// (err) => {
	// $state.go('login');
	// }
	// );
	// }
}

function LoginController($scope, $state, AuthService) {
	$scope.login = function (user) {
		$state.go('admin');
		// AuthService.login(user).then((x) => {
		// 	// if (x.roles.length == 1) {
		// 	// 	var role = x.roles[0];
		// 	// 	$state.go(role + '-home');
		// 	// } else {
		// 	// 	var role = x.roles.find((x) => x !== 'dosen');
		// 		$state.go(role + '-home');
		// 	// }
		// });
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