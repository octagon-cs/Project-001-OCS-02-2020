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
		'chart.js'
	])
	.config(function(ChartJsProvider) {
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
			colors: [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360' ]
		});
		ChartJsProvider.setOptions('doughnut', {
			cutoutPercentage: 60
		});
	})
	.directive('chooseFile', function() {
		return {
			link: function(scope, elem, attrs) {
				var button = elem.find('#output');
				var input = angular.element(elem[0].querySelector('input#fileInput'));
				button.bind('click', function() {
					input[0].click();
				});
				input.bind('change', function(e) {
					scope.$apply(function() {
						var files = e.target.files;
						if (files[0]) {
							var f = files[0];
							var foto = {};
							foto.fileName = f.name;
							r = new FileReader();
							r.onload = (function(theFile) {
								return function(e) {
									//var binaryData = e.target.result;
									var img = document.createElement('img');
									img.src = e.target.result;
									setTimeout((z) => {
										var canvas = document.createElement('canvas');
										var ctx = canvas.getContext('2d');

										var MAX_WIDTH = 150;
										var MAX_HEIGHT = 200;
										var width = img.width;
										var height = img.height;

										if (width > height) {
											if (width > MAX_WIDTH) {
												height *= MAX_WIDTH / width;
												width = MAX_WIDTH;
											}
										} else {
											if (height > MAX_HEIGHT) {
												width *= MAX_HEIGHT / height;
												height = MAX_HEIGHT;
											}
										}
										canvas.width = width;
										canvas.height = height;
										ctx.drawImage(img, 0, 0, width, height);

										dataurl = canvas.toDataURL(f.type);
										var parts = dataurl.split(';base64,');
										var contentType = parts[0].split(':')[1];
										var raw = window.atob(parts[1]);
										//Converting Binary Data to base 64
										var base64String = window.btoa(raw);
										//showing file converted to base64
										foto.type = contentType;
										foto.data = base64String;
										scope.changeFoto(foto);
									}, 300);
								};
							})(f);
							r.readAsDataURL(f);
						}
					});
				});
			}
		};
	})
	.directive('select', function($interpolate) {
		return {
			restrict: 'E',
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl) {
				var defaultOptionTemplate;
				scope.defaultOptionText = attrs.defaultOption || 'Pilih...';
				defaultOptionTemplate =
					'<option value="" disabled selected style="display: none;">{{defaultOptionText}}</option>';
				elem.prepend($interpolate(defaultOptionTemplate)(scope));
			}
		};
	})
	.directive('select2', function($timeout, $parse) {
		return {
			restrict: 'AC',
			require: 'ngModel',
			link: function(scope, element, attrs) {
				//console.log(attrs);
				$timeout(function() {
					element.select2();
					element.select2Initialized = true;
				});

				var refreshSelect = function() {
					if (!element.select2Initialized) return;
					$timeout(function() {
						element.trigger('change');
					});
				};

				var recreateSelect = function() {
					if (!element.select2Initialized) return;
					$timeout(function() {
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
	});
