angular
	.module('login.component', [])
	.component('userlogin', {
		controller: function($scope, AuthService, $state, $window, PermohonanService, InboxService) {
			this.userName = AuthService.getUserName();
			$scope.logoff = function() {
				AuthService.logOff();
				PermohonanService.clean();
				InboxService.clean();
				setTimeout((x) => {
					$state.go('login');
				}, 500);
			};
		},
		template: `<a href="" class="nav-link" data-toggle="modal" data-target="#logout">Logout</a>
					<div class="modal fade" data-backdrop="false" id="logout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" 132164165411651511>
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">Logout</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<p class=" text-uppercase">Apakah Anda Yakin Ingin Keluar ?</p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								<button ng-click="logoff()" type="button" data-dismiss="modal" class="btn btn-primary">Ok</button>
							</div>
						</div>
					</div>
				</div>`
	})
	.component('profiles', {
		controller: function($scope, AuthService) {},
		template: `<a class="nav-link" ui-sref="dosen-home">Profiles</a>`
	})
	.component('changepassword', {
		controller: function($scope, AuthService, message) {
			$scope.changepassword = function(model) {
				if (model.newpassword !== model.confirmpassword) {
					message.errorText('Password Baru dan Konfirmasi Password Tidak Sama');
				} else {
					AuthService.changepassword(model).then(
						(x) => {
							$scope.model = {};
						},
						(err) => {
							message.errorText(err.data.message);
						}
					);
					$('#changepasswordmodal').modal('hide');
				}
			};
		},
		template: `<button id="btnchangepassword" class="btn btn-outline-primary" data-toggle="modal" data-target="#changepasswordmodal">Ubah Password</span></button>

				<div class="modal fade" id="changepasswordmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">SIPAK</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<form class="form-group" ng-submit="changepassword(model)">
							<div class="modal-body">

								<div class="form-group">
									<label class="control-label">Password Lama</label>
									<input class="form-control" ng-model="model.oldpassword" type="password"
										placeholder="Password Lama" required="">
								</div>

								<div class="form-group">
									<label class="control-label">Password</label>
									<input class="form-control" ng-model="model.newpassword" type="password"
										placeholder="Masukan Password Anda" required="">
								</div>
								<div class="form-group">
									<label class="control-label">Password Lama</label>
									<input class="form-control" ng-model="model.confirmpassword" type="password"
										placeholder="Konfirmasi Password" required="">
								</div>


							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">
									<span class="fas fa-close"></span> Cancel
								</button>
								<button type="submit" class="btn btn-primary">
									<span class="fas fa-edit"></span> Change
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
`
	})
	.component('fotoprofile', {
		controller: function($scope, AuthService, helperServices, $http, StorageService, message) {
			AuthService.profile().then((x) => {
				$scope.Profile = x;
				if (!x.photo) $scope.Profile.photo = 'user.jpg';
			});

			$scope.changeFoto = function(data) {
				setTimeout((x) => {
					$scope.foto = data;
					$http({
						method: 'post',
						url: helperServices.url + '/api/auth/foto',
						headers: AuthService.getHeader(),
						data: data
					}).then(
						(res) => {
							message.info('Berhasil !');
							$scope.Profile.photo = res.data.data;
							StorageService.addObject('profile', $scope.profile);
						},
						(err) => {
							message.errorText('Gagal !');
						}
					);
				}, 300);
			};
		},
		template: `
		<choose-file>
			<div class="image">
				<input id="fileInput" type="file" class="ng-hide">
				<input type="text" ng-model="foto.fileName" class="ng-hide" disabled required>
				<div id="output">
					<img src="/assets/images/profiles/{{Profile.photo}}" class="img-circle elevation-2"
						ng-src="data:image/{{foto.type}};base64,{{foto.data}}">
				</div>
			</div>
			<div class="info">
				<a href="" class="d-block">{{Profile.nama}}</a>
			</div>
		</choose-file>`
	});
