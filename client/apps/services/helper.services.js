angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices() {
	var service = {};
	service.url = 'http://localhost:3000';
	service.KepemilikanKTP=["Sudah Memiliki KTP", "Belum Memiliki KTP", "Pembuatan KTP Dalam Proses"];
	return {
		url: service.url,
		StatusKepemilikanKTP: service.KepemilikanKTP
	};
}