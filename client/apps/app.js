angular
	.module('app', [

		'app.services',
		'app.routers',
		'app.controllers',
		'app.component',
		'datatables',
		'swangular',
		'message.service',
		"ui.bootstrap",'ngLocale'
	])
	.directive('chooseFile', function () {
		return {
			link: function (scope, elem, attrs) {
				var button = elem.find('#output');
				var input = angular.element(elem[0].querySelector('input#fileInput'));
				button.bind('click', function () {
					input[0].click();
				});
				input.bind('change', function (e) {
					scope.$apply(function () {
						var files = e.target.files;
						if (files[0]) {
							var f = files[0];
							var foto = {};
							foto.fileName = f.name;
							r = new FileReader();
							r.onload = (function (theFile) {
								return function (e) {
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
	});