angular.module('PendudukService', []).factory('PendudukService', PendudukServices);

function PendudukServices($http, $q, helperServices, AuthService) {
	var controller = '/api/penduduk';

	var service = {};
	service.data = [];
	service.instance = false;
	return {
		get: get,
		post: post,
		put: put,
		getById: getById,
		getByNIK: getByNIK,
		getByNKK: getByNKK,
		upload:upload
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

	function upload(file, data) {
		var def = $q.defer();
		var a = {};
		var b = file.filename.split(".");
		a.idpenduduk = data.idpenduduk;
		a.idpersyaratan = data.idpersyaratan;
		a.typefile = file.filetype;
		a.data = file.base64;
		a.extention = b[1];

		$http({
			method: 'post',
			url: helperServices.url + controller + '/dokumen',
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
				var item = services.data.find((x) => (x.idpenduduk = data.idpenduduk));
				if (item) {
					item.nama = data.nama;
					item.nik = data.nik;
					item.nkk = data.nkk;
					item.data = data.data;
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

	function getById(id, hard) {
		var def = $q.defer();
		if (service.instance && !hard) {
			var data = service.data.find((x) => x.idpenduduk == id);
			if (data) {
				def.resolve(data);
			}
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/' + id,
				headers: AuthService.getHeader()
			}).then(
				(res) => {
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

	function getByNIK(nik, hard) {
		var def = $q.defer();
		if (service.instance && !hard) {
			var data = service.find((x) => x.nik == nik);
			if (data) {
				def.resolve(data);
				return;
			}
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/bynik/' + nik,
				headers: AuthService.getHeader()
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
		}

		return def.promise;
	}

	function getByNKK(nkk) {
		var def = $q.defer();
		$http({
			method: 'get',
			url: helperServices.url + controller + '/bynkk/' + nkk,
			headers: AuthService.getHeader()
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
}
