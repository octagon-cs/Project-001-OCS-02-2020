angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices() {
	var service = {};
	service.url = 'http://localhost:3000';
	return {
		url: service.url
	};
}