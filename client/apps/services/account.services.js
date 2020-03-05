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
		url: service.url,
		registerdosen: registerdosen,
		profile: profile,
		Init: Init,
		changepassword: changepassword
	};

	function Init(roles) {
		if (userInRole(roles)) {
			return;
		} else {
			$state.go('login');
		}
	}

	function changepassword(data) {
		var def = $q.defer();
		var user = StorageService.getObject('user');
		user.password = data.oldpassword;
		user.newpassword = data.newpassword;
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/changepassword',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {
				message.info('Password Berhasil Diubah');
			},
			(err) => {
				def.reject(err);
			}
		);
		return def.promise;
	}

	function profile() {
		var def = $q.defer();


		var result = StorageService.getObject('user');

		if (result)
			def.resolve({
				rolename: result.roles[0]
			});
		else {
			def.reject();
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

	function registerdosen(user) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + '/api/auth/registerdosen',
			headers: getHeader(),
			data: user
		}).then(
			(res) => {

				def.resolve(res.data);
			},
			(err) => {
				message.error(err);
			}
		);
		return def.promise;
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

	function logoff() {
		StorageService.clear();
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
		var result = StorageService.getObject('user');
		var found = false;
		if (result) {
			roles.forEach((role) => {
				var data = result.roles.find((x) => (x.name = role));
				if (data) {
					found = true;
					return;
				}
			});
		}

		return found;
	}
}