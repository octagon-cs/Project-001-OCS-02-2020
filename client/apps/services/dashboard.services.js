angular.module('dashboard.service', []).factory('DashboardService', DashboarServices);

function DashboarServices(params) {
	var controller = '/api/dashboard';
	var dash = { instance: false };

	function dashboard($q, $http, AuthService, helperService, message) {
		var def = $.defer();
		if (dash.instance) {
			def.resolve(dash.data);
		} else {
			$http({
				methode: 'Get',
				utl: helperService.url + controller + '/dashboard',
				headers: AuthService.getHeader()
			}).then(
				(response) => {
					dash.data = response.data;
					def.resolve(dash.data);
				},
				(err) => {
					message.errorText(err.message);
					def.reject(ex);
				}
			);
		}
		return def.promise;
	}

	return { dashboard: dashboard };
}
