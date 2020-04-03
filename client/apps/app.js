angular
	.module('app', [
		'app.services',
		'app.routers',
		'app.controllers',
		'app.component',
		'datatables',
		'swangular',
		'message.service',
		'ngAnimate',
		'ngSanitize',
		'ui.bootstrap',
		'ngLocale',
		'chart.js',
		'naif.base64'
	])
	.config(function (ChartJsProvider) {
		Chart.defaults.global.colors = [
			'#97bbcd',
			'#dcdcdc',
			'#f7464a',
			'#46bfbd',
			'#fdb45c',
			'#949fb1',
			'#4d5360',
			'#803690',
			'#00ADF9',
			'#DCDCDC',
			'#46BFBD',
			'#FDB45C',
			'#949FB1',
			'#4D5360'
		];
		ChartJsProvider.setOptions({
			colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
		});
		ChartJsProvider.setOptions('doughnut', {
			cutoutPercentage: 60
		});
	})
	.directive('select', function ($interpolate) {
		return {
			restrict: 'E',
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				var defaultOptionTemplate;
				scope.defaultOptionText = attrs.defaultOption || 'Pilih...';
				defaultOptionTemplate =
					'<option value="" disabled selected style="display: none;">{{defaultOptionText}}</option>';
				elem.prepend($interpolate(defaultOptionTemplate)(scope));
			}
		};
	})
	.directive('select2', function ($timeout, $parse) {
		return {
			restrict: 'AC',
			require: 'ngModel',
			link: function (scope, element, attrs) {
				//console.log(attrs);
				$timeout(function () {
					element.select2();
					element.select2Initialized = true;
				});

				var refreshSelect = function () {
					if (!element.select2Initialized) return;
					$timeout(function () {
						element.trigger('change');
					});
				};

				var recreateSelect = function () {
					if (!element.select2Initialized) return;
					$timeout(function () {
						element.select2('destroy');
						element.select2();
					});
				};

				scope.$watch(attrs.ngModel, refreshSelect);

				if (attrs.ngOptions) {
					var list = attrs.ngOptions.match(/ in ([^ ]*)/)[1];
					// watch for option list change
					scope.$watch(list, recreateSelect);
				}

				if (attrs.ngDisabled) {
					scope.$watch(attrs.ngDisabled, refreshSelect);
				}
			}
		};
	})
	.filter('capitalize', function () {
		return function (input) {
			if (input.indexOf(' ') !== -1) {
				var inputPieces,
					i;

				input = input.toLowerCase();
				inputPieces = input.split(' ');

				for (i = 0; i < inputPieces.length; i++) {
					inputPieces[i] = capitalizeString(inputPieces[i]);
				}

				return inputPieces.toString().replace(/,/g, ' ');
			}
			else {
				input = input.toLowerCase();
				return capitalizeString(input);
			}

			function capitalizeString(inputString) {
				return inputString.substring(0, 1).toUpperCase() + inputString.substring(1);
			}
		};
	})
	.directive('capitalizee', function () {
		return {
			require: 'ngModel',
			link: function (scope, element, attrs, modelCtrl) {
				var capitalize = function (inputValue) {
					if (inputValue == undefined) inputValue = '';
					var capitalized = inputValue.toUpperCase();
					if (capitalized !== inputValue) {
						// see where the cursor is before the update so that we can set it back
						var selection = element[0].selectionStart;
						modelCtrl.$setViewValue(capitalized);
						modelCtrl.$render();
						// set back the cursor after rendering
						element[0].selectionStart = selection;
						element[0].selectionEnd = selection;
					}
					return capitalized;
				}
				modelCtrl.$parsers.push(capitalize);
				capitalize(scope[attrs.ngModel]); // capitalize initial value
			}
		};
	})
	.directive('fileModel', function ($parse) {
		return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel),
                    modelSetter = model.assign;
                element.bind("change", function () {
                    scope.$apply(function () {
                        var file = element[0].files[0];
                        getFileBuffer(file).then(function (resp) {
                            modelSetter(scope, resp);
                        });
                    });
                });
            }
        };
        function getFileBuffer(file) {
            var deferred = new $q.defer();
            var reader = new FileReader();
            reader.onloadend = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        }
	})
	;
