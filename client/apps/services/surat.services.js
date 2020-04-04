angular
	.module('SuratService', [])
	.factory('PermohonanService', PermohonanService)
	.factory('JenisPermohonanService', JanisPermohonanService);

function JanisPermohonanService($http, $q, helperServices, AuthService, message) {
	var controller = '/api/jenispermohonan';

	var service = {};
	service.data = [];
	service.instance = false;
	return {
		get: get,
		getById: getById,
		post: post,
		put: put,
		getByJenis: getByJenis,
		postPersyaratan: postPersyaratan,
		deletePersyaratan: deletePersyaratan
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
					def.resolve(service.data);
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
			method: 'Post',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(param) => {
				service.data.push(param.data);
				def.resolve(param.data);
			},
			(error) => {
				message.error(error);
			}
		);
		return def.promise;
	}

	function postPersyaratan(data) {
		var def = $q.defer();
		$http({
			method: 'Post',
			url: helperServices.url + controller + '/persyaratan',
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(param) => {
				data.iddetailpersyaratan = param.data.iddetailpersyaratan;
				delete data.itemsyarat;
				var item = service.data.find((x) => x.idjenispermohonan == data.idjenispermohonan);
				item.persyaratan.push(data);
				def.resolve(param.data);
			},
			(error) => {
				message.error(error);
			}
		);
		return def.promise;
	}

	function put(data) {
		var def = $q.defer();
		$http({
			method: 'PUT',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(param) => {
				def.resolve(param);
			},
			(error) => {
				message.error(error);
			}
		);
		return def.promise;
	}

	function deletePersyaratan(data) {
		var def = $q.defer();
		$http({
			method: 'DELETE',
			url: helperServices.url + controller + '/persyaratan/' + data.iddetailpersyaratan,
			headers: AuthService.getHeader()
		}).then(
			(param) => {
				var item = service.data.find((x) => x.idjenispermohonan == data.idjenispermohonan);
				delete data.idjenispermohonan;
				var index = item.persyaratan.indexOf(data);
				item.persyaratan.splice(index, 1);
				def.resolve(param);
			},
			(error) => {
				message.error(error);
			}
		);
		return def.promise;
	}

	function getById(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.data.find((x) => x.idjenispermohonan == id);
			def.resolve(data);
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

	function getByJenis(jenis) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.data.find((x) => x.jenis == jenis);
			def.resolve(data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/jenis/' + jenis,
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
}
function PermohonanService($http, $q, helperServices, AuthService, message) {
	var controller = '/api/permohonan';
	var service = {};
	clean();

	return {
		get: get,
		post: post,
		put: put,
		getById: getById,
		getByJenis: getByJenis,
		clean: clean,
		approved: approved,
		getDocument: getDocument
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
					def.resolve(service.data);
				},
				(err) => {
					def.reject(err);
					message.error(err);
				}
			);
		}
		return def.promise;
	}

	function getDocument(id) {
		var def = $q.defer();
		var data = service.data.find((x) => x.idpermohonan == id);
		if (data.persyaratan) {
			def.resolve(data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/dokumen/:idpermohonan',
				headers: AuthService.getHeader()
			}).then(
				(res) => {
					data.persyaratan = res.data;
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

	function post(data) {
		var def = $q.defer();
		$http({
			method: 'Post',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(param) => {
				data.idpermohonan = param.idpermohonan;
				service.data.push(param.data);
				def.resolve(param.data);
			},
			(error) => {
				message.error(error);
			}
		);
		return def.promise;
	}

	function put(data) {
		var def = $q.defer();
		$http({
			method: 'PUT',
			url: helperServices.url + controller,
			headers: AuthService.getHeader(),
			data: data
		}).then(
			(param) => {
				def.resolve(param.data);
			},
			(error) => {
				message.error(error);
				def.reject(error);
			}
		);
		return def.promise;
	}

	function getById(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.data.find((x) => x.idpermohonan == id);
			if (data.persyaratan) {
				def.resolve(data);
			} else {
				$http({
					method: 'get',
					url: helperServices.url + controller + '/dokumen/' + id,
					headers: AuthService.getHeader()
				}).then(
					(res) => {
						res.data.forEach(status => {
							status.file? status.upload=true : status.upload=false
						});
						data.persyaratan = res.data;
						def.resolve(data);
					},
					(err) => {
						def.reject(err);
						message.error(err);
					}
				);
			}
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/' + id,
				headers: AuthService.getHeader()
			}).then(
				(res) => {
					var data = res.data;
					$http({
						method: 'get',
						url: helperServices.url + controller + '/dokumen/' + id,
						headers: AuthService.getHeader()
					}).then(
						(pers) => {
							pers.data.forEach(status => {
								status.file? status.upload=true : status.upload=false
							});
							data.persyaratan = pers.data;
							service.data.push(data);
							def.resolve(data);
						},
						(err) => {
							def.reject(err);
							message.error(err);
						}
					);
				},
				(err) => {
					def.reject(err);
					message.error(err);
				}
			);
		}
		return def.promise;
	}

	function getByJenis(id) {
		var def = $q.defer();
		if (service.instance) {
			var data = service.data.filter((x) => x.idjenispermohonan == id);
			def.resolve(data);
		} else {
			$http({
				method: 'get',
				url: helperServices.url + controller + '/byjenis/' + id,
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

	function clean() {
		service.data = [];
		service.instance = false;
	}

	function approved(id) {
		var def = $q.defer();
		$http({
			method: 'get',
			url: helperServices.url + controller + '/approve/' + id,
			headers: AuthService.getHeader()
		}).then(
			(res) => {
				var item = service.data.find((x) => x.idpermohonan == id);
				if (item) {
					item.SetButtonApproved = false;
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
}
