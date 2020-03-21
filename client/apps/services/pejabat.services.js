angular
	.module('PejabatService', [])
	.factory('PejabatService', PejabatServices)
	.factory('JabatanService', JabatanServices);

function PejabatServices($http, $q, helperServices, AuthService) {
	var controller = '/api/pejabat';
	var service = {};
	service.data = [];
	service.instance = false;
	return {
		get: get,
		getById: getById,
		put: put,
		post: post,
		getByJabatanName: getByJabatanName
	};

	function get() {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller,
				headers: AuthService.getHeader()
			}).then(
				(res) => {
					service.instance = true;
					service.data = res.data;
					def.resolve(res.data);
				},
				(err) => {
					def.reject(err);
					message.error(err);
				}
			);
		}
		return def.promise;
	}

	function post(data) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(res) => {
				service.data.push(res.data);
				def.resolve(res.data);
			},
			(err) => {
				def.reject(err);
				message.error(err);
			}
		);
		return def.promise;
	}

	function put(data) {
		var def = $q.defer();
		$http({
			method: 'put',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(res) => {
				var item = services.data.find((x) => (x.idpejabat = data.idpejabat));
				if (item) {
					item.nama = data.nama;
				}
				def.resolve(res.data);
			},
			(err) => {
				def.reject(err);
				message.error(err);
			}
		);
		return def.promise;
	}

	function getById(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.data.find((x) => x.idpejabat == id);
			def.resolve(data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/' + id,
				headers: AuthService.getHeader()
			}).then(
				(res) => {
					service.data = res.data;
					def.resolve(res.data);
				},
				(err) => {
					def.reject(err);
					message.error(err);
				}
			);
		}
		return def.promise;
	}

	function getByJabatanName(jabatanName, status) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.data.find((x) => x.namajabatan == jabatanName && x.status == status);
			def.resolve(data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + '/api/pejabat',
				headers: AuthService.getHeader()
			}).then(
				(res) => {
					service.instance = true;
					service.data = res.data;
					var data = service.data.find((x) => x.namajabatan == jabatanName && x.status == status);
					def.resolve(data);
				},
				(err) => {
					def.reject(err);
					message.error(err);
				}
			);
		}
		return def.promise;
	}
}

function JabatanServices($http, $q, helperServices, AuthService) {
	var controller = '/api/jabatan';
	var service = {};
	service.data = [];
	service.instance = false;
	return {
		get: get,
		getById: getById,
		put: put,
		post: post
	};

	function get() {
		var def = $q.defer();
		if (service.instance) {
			def.resolve(service.data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller,
				headers: AuthService.getHeader()
			}).then(
				(res) => {
					service.instance = true;
					service.data = res.data;
					def.resolve(res.data);
				},
				(err) => {
					def.reject(err);
					message.error(err);
				}
			);
		}
		return def.promise;
	}

	function post(data) {
		var def = $q.defer();
		$http({
			method: 'post',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(res) => {
				service.data.push(res.data);
				def.resolve(res.data);
			},
			(err) => {
				def.reject(err);
				message.error(err);
			}
		);
		return def.promise;
	}

	function put(data) {
		var def = $q.defer();
		$http({
			method: 'put',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(res) => {
				var item = service.data.find((x) => (x.idpejabat = data.idpejabat));
				if (item) {
					item.nama = data.nama;
				}
				def.resolve(res.data);
			},
			(err) => {
				def.reject(err);
				message.error(err);
			}
		);
		return def.promise;
	}

	function getById(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.data.find((x) => x.idpejabat == id);
			def.resolve(data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/' + id,
				headers: AuthService.getHeader()
			}).then(
				(res) => {
					service.data = res.data;
					def.resolve(res.data);
				},
				(err) => {
					def.reject(err);
					message.error(err);
				}
			);
		}
		return def.promise;
	}
}
