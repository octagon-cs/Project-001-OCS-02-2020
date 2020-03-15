angular.module("approved.controller", [])
    .controller("approvedSuratTidakMampuController", approvedSuratTidakMampuController)
    .controller("approvedSuratKelahiranController", approvedSuratKelahiranController)
    .controller("approvedSuratBelumMenikahController", approvedSuratBelumMenikahController);

function approvedSuratTidakMampuController($http, helperServices, AuthService, $scope, message, $stateParams, $state) {
    $scope.model = {};
    $http({
        method: "get",
        url: helperServices.url + "/api/permohonan/" + $stateParams.id,
        headers: AuthService.getHeader()
    }).then(params => {
        $scope.model = params.data;
    })
    $scope.Setujui = function () {
        message.dialog("Yakin ingin Menyetujui Berkas???", "Setujui", "Batal").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "get",
                    url: helperServices.url + "/api/permohonan/approve/" + $scope.model.idpermohonan,
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
    $scope.DataPesan;
    $scope.Reject = function () {
        var item = {};
        item.idpermohonan = $scope.SuratKelahiran.idpermohonan,
            item.message = $scope.DataPesan;
        message.dialog("Yakin ingin membatalkan Permohonan???", "Batalkan", "Kembali").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "post",
                    url: helperServices.url + "/api/permohonan/reject",
                    headers: AuthService.getHeader(),
                    data: item
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
    $scope.Back = function () {
        var item = {};
        item.idpermohonan = $scope.SuratKelahiran.idpermohonan,
            item.message = $scope.DataPesan;
        message.dialog("Yakin ingin membatalkan Permohonan???", "Batalkan", "Kembali").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "post",
                    url: helperServices.url + "/api/permohonan/back",
                    headers: AuthService.getHeader(),
                    data: item
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

function approvedSuratKelahiranController($http, helperServices, AuthService, $scope, message, $stateParams, $state) {
    $scope.ListPenduduk = [];
    $scope.SuratKelahiran = {};
    $scope.ItemAyah = "";
    $scope.DataPesan = "";
    $scope.ItemIbu = "";
    $scope.TanggalLahir;
    $scope.JenisKelamin = helperServices.JenisKelamin;
    $scope.Tampil = false;
    $scope.Init = function () {
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/" + $stateParams.id,
            headers: AuthService.getHeader()
        }).then(params => {
            $scope.SuratKelahiran = params.data;
            $http({
                method: "get",
                url: helperServices.url + "/api/penduduk/" + params.data.idpenduduk,
                Header: AuthService.getHeader()
            }).then(ayah => {
                $scope.ItemAyah = JSON.stringify(angular.copy(ayah.data));
                $http({
                    method: "get",
                    url: helperServices.url + "/api/penduduk/" + params.data.data.idpendudukibu,
                    Header: AuthService.getHeader()
                }).then(Ibu => {
                    $scope.ItemIbu = JSON.stringify(angular.copy(Ibu.data));
                    $scope.Tampil = true;
                })
            })
            $scope.SuratKelahiran.data.tanggallahir = new Date(JSON.parse($scope.SuratKelahiran.data.tanggallahir));
            $scope.TanggalLahir = $scope.SuratKelahiran.data.tanggallahir.getFullYear() + "-" + ($scope.SuratKelahiran.data.tanggallahir.getMonth() + 1) + "-" + $scope.SuratKelahiran.data.tanggallahir.getDate();
        })
    }

    $scope.Setujui = function () {
        message.dialog("Yakin ingin Menyetujui Berkas???", "Setujui", "Batal").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "get",
                    url: helperServices.url + "/api/permohonan/approve/" + $scope.SuratKelahiran.idpermohonan,
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
    $scope.DataPesan;
    $scope.Reject = function () {
        var item = {};
        item.idpermohonan = $scope.SuratKelahiran.idpermohonan,
            item.message = $scope.DataPesan;
        message.dialog("Yakin ingin membatalkan Permohonan???", "Batalkan", "Kembali").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "post",
                    url: helperServices.url + "/api/permohonan/reject",
                    headers: AuthService.getHeader(),
                    data: item
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
    $scope.Back = function () {
        var item = {};
        item.idpermohonan = $scope.SuratKelahiran.idpermohonan,
            item.message = $scope.DataPesan;
        message.dialog("Yakin ingin membatalkan Permohonan???", "Batalkan", "Kembali").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "post",
                    url: helperServices.url + "/api/permohonan/back",
                    headers: AuthService.getHeader(),
                    data: item
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

function approvedSuratBelumMenikahController($http, helperServices, AuthService, $scope, message, $stateParams, $state) {
    $scope.ListPenduduk = [];
    $scope.ListRT = [];
    $scope.ItemRT = "";
    $scope.SuratBelumMenikah = {};
    $scope.ItemAyah = "";
    $scope.DataPesan = "";
    $scope.ItemPenduduk = "";
    $scope.TanggalLahir;
    $scope.JenisKelamin = helperServices.JenisKelamin;
    $scope.Tampil = false;
    $scope.Init = function () {
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/" + $stateParams.id,
            headers: AuthService.getHeader()
        }).then(params => {
            $scope.SuratBelumMenikah = params.data;
            $http({
                method: "get",
                url: helperServices.url + "/api/penduduk/" + params.data.idpenduduk,
                Header: AuthService.getHeader()
            }).then(penduduk => {
                $scope.ItemPenduduk = JSON.stringify(angular.copy(penduduk.data));
                $http({
                    method: "get",
                    url: helperServices.url + "/api/pejabat/idjabatan/5",
                    headers: AuthService.getHeader()
                }).then(datart => {
                    $scope.ListRT = datart.data
                    $scope.ListRT.forEach(rt => {
                        if (rt.idpejabat == params.data.data.idpejabatrt) {
                            $scope.ItemRT = JSON.stringify(rt);
                        }
                    })
                    $scope.SuratBelumMenikah.data.tanggalsurat = new Date(angular.copy($scope.SuratBelumMenikah.data.tanggalsurat));
                    $scope.TanggalSurat = $scope.SuratBelumMenikah.data.tanggalsurat.getFullYear() + "-" + ($scope.SuratBelumMenikah.data.tanggalsurat.getMonth() + 1) + "-" + $scope.SuratBelumMenikah.data.tanggalsurat.getDate();


                    $scope.Tampil = true;
                }, error => {
                    message.errorText(error.message)
                })
            })

        })


    }

    $scope.Setujui = function () {
        message.dialog("Yakin ingin Menyetujui Berkas???", "Setujui", "Batal").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "get",
                    url: helperServices.url + "/api/permohonan/approve/" + $scope.SuratBelumMenikah.idpermohonan,
                    headers: AuthService.getHeader()
                }).then(paramapproved => {
                    message.info("Disetujui");
                    AuthService.profile().then(paramrole => {
                        if (paramrole.rolename == "admin") {
                            $state.go('admin-suratbelummenikah');
                        } else if (paramrole.rolename == "seklur") {
                            $state.go('seklur-suratbelummenikah');
                        } else {
                            $state.go('lurah-suratbelummenikah');
                        }
                    })

                })
            } else {
                message.errorText("Proses Dibatalkan");
            }
        });
    }
    $scope.DataPesan;
    $scope.Reject = function () {
        var item = {};
        item.idpermohonan = $scope.SuratBelumMenikah.idpermohonan,
            item.message = $scope.DataPesan;
        message.dialog("Yakin ingin membatalkan Permohonan???", "Batalkan", "Kembali").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "post",
                    url: helperServices.url + "/api/permohonan/reject",
                    headers: AuthService.getHeader(),
                    data: item
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
    $scope.Back = function () {
        var item = {};
        item.idpermohonan = $scope.SuratBelumMenikah.idpermohonan,
            item.message = $scope.DataPesan;
        message.dialog("Yakin ingin membatalkan Permohonan???", "Batalkan", "Kembali").then(parammessage => {
            if (parammessage == true) {
                $http({
                    method: "post",
                    url: helperServices.url + "/api/permohonan/back",
                    headers: AuthService.getHeader(),
                    data: item
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