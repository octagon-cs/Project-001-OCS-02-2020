angular.module('account.service', []).factory('AuthService', AuthService);

function AuthService($http, $q, StorageService, $state, helperServices, message) {
	var service = {};

	return {
		login: login,
		logOff: logoff,
		userIsLogin: userIsLogin,
		getUserName: getUserName,
		userIsLogin: userIsLogin,
		userInRole: userInRole,
		getHeader: getHeader,
		getToken: getToken,
		// url: service.url,
		profile: profile,
		Init: Init,
		registrasi: registrasi,
		resetPassword: resetPassword,
		changePassword: changePassword,
		confirmEmail: confirmEmail
	};

	function Init(roles) {
		if (userInRole(roles)) {
			return;
		} else {
			$state.go('login');
		}
	}

	function registrasi(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/registrasi',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				message.info('Berhasil !, Periksa Email Anda Untuk Memverifikasi Account Anda.');
				def.resolve(res.data);
			},
			(err) => {
				def.reject();
				message.error(err);
			}
		);
		return def.promise;
	}

	function confirmEmail(token) {
		var def = $q.defer();
		var header = getHeader();
		header.Authorization = 'Bearer ' + token;
		$http({
			method: 'get',
			url: helperServices.url + '/api/auth/confirmemail',
			headers: header
		}).then(
			(res) => {
				def.resolve(res.data);
				message.info('Berhasil !, Silahkan Login.');
			},
			(err) => {
				def.reject(err);
				message.error(err);
			}
		);
		return def.promise;
	}

	function changePassword(user, token) {
		var def = $q.defer();
		var header = getHeader();
		header.Authorization = 'Bearer ' + token;
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/changepassword',
			headers: header,
			data: user
		}).then(
			(res) => {
				def.resolve(res.data);
			},
			(err) => {
				def.reject(err);
				message.error(err);
			}
		);
		return def.promise;
	}

	function profile() {
		var def = $q.defer();
		var result = StorageService.getObject('profile');
		if (result) def.resolve(result);
		else {
			$http({
				method: 'get',
				url: helperServices.url + '/api/auth/profile',
				headers: getHeader()
			}).then(
				(res) => {
					StorageService.addObject('profile', res.data);
					def.resolve(res.data);
				},
				(err) => {
					def.reject();
					message.error(err);
				}
			);
		}

		return def.promise;
	}

	function login(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/login',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				StorageService.addObject('user', res.data);
				def.resolve(res.data);
			},
			(err) => {
				def.reject();
				message.error(err);
			}
		);
		return def.promise;
	}

	function resetPassword(data) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/resetpassword',
			headers: getHeader(),
			data: data
		}).then(
			(res) => {
				def.resolve(res.data);
			},
			(err) => {
				def.reject();
				message.error(err);
			}
		);
		return def.promise;
	}

	function logoff() {
		StorageService.clear();
	}

	function getHeader() {
		try {
			if (userIsLogin()) {
				var token = getToken();
				if (!token) throw new Error('Not Found Token');

				return {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
				};
			}
			throw new Error('Not Found Token');
		} catch (ex) {
			return {
				'Content-Type': 'application/json'
			};
		}
	}

	function getToken() {
		var result = StorageService.getObject('user');
		if (result) {
			return result.token;
		}
		return '';
	}

	function getUserName() {
		if (userIsLogin) {
			var result = StorageService.getObject('user');
			if (result) return result.username;
		}
	}

	function userIsLogin() {
		var result = StorageService.getObject('user');
		return result ? true : false;
	}

	function userInRole(roles) {
		var user = StorageService.getObject('user');
		var found = false;
		if (user) {
			roles.forEach((role) => {
				var data = user.roles.find((x) => x == role);
				if (data) {
					found = true;
					return;
				}
			});
		}

		return found;
	}
}
