angular.module("approved.controller", [])
    .controller("approvedSuratTidakMampuController", approvedSuratTidakMampuController);

function approvedSuratTidakMampuController($http, helperServices, AuthService, $scope, message, $stateParams, $state) {
    $scope.DataApproved = {};
    $http({
        method: "get",
        url: helperServices.url + "/api/permohonan/" + $stateParams.id,
        headers: AuthService.getHeader()
    }).then(params => {
        $scope.DataApproved = params.data;
    })
    $scope.Setujui = function () {
        message.dialog("Yakin ingin Menyetujui Berkas???", "Setujui", "Batal").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "get",
                    url: helperServices.url + "/api/permohonan/approve/" + $scope.DataApproved.idpermohonan,
                    headers: AuthService.getHeader()
                }).then(paramapproved => {
                    message.info("Disetujui");
                    AuthService.profile().then(paramrole => {
                        if (paramrole.rolename == "admin") {
                            $state.go('admin-surattidakmampu');
                        } else if (paramrole.rolename == "seklur") {
                            $state.go('seklur-surattidakmampu');
                        } else {
                            $state.go('lurah-surattidakmampu');
                        }
                    })

                })
            } else {
                message.errorText("Proses Dibatalkan");
            }
        });
    }

    $scope.Tolak = function () {
        message.dialog("Yakin ingin membatalkan Permohonan???", "Batalkan", "Kembali").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "get",
                    url: helperServices.url + "/api/permohonan/approve/" + $scope.DataApproved.idpermohonan,
                    headers: AuthService.getHeader()
                }).then(paramapproved => {
                    message.info("Disetujui");
                    AuthService.profile().then(paramrole => {
                        if (paramrole.rolename == "admin") {
                            $state.go('admin-surattidakmampu');
                        } else if (paramrole.rolename == "seklur") {
                            $state.go('seklur-surattidakmampu');
                        } else {
                            $state.go('lurah-surattidakmampu');
                        }
                    })

                })
            } else {
                message.errorText("Proses Dibatalkan");
            }
        });
    }
}