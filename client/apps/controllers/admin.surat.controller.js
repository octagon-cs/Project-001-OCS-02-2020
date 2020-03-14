angular.module('admin.surat.controller', [])
    .controller('adminsuratskckController', adminsuratskckController)
    .controller('adminsuratketdomisiliController', adminsuratketdomisiliController)
    .controller('adminsurattidakmampuController', adminsurattidakmampuController)
    .controller('adminsuratpenguasaantanahController', adminsuratpenguasaantanahController)
    .controller('adminsuratketusahaController', adminsuratketusahaController)
    .controller('adminsuratbelummenikahController', adminsuratbelummenikahController)
    .controller('adminsuratketmenikahController', adminsuratketmenikahController)
    .controller('adminsuratkelahiranController', adminsuratkelahiranController)
    .controller('adminsuratketceraiController', adminsuratketceraiController)
    .controller('adminsuratketdesaController', adminsuratketdesaController)
    .controller('adminsuratketektpController', adminsuratketektpController)
    .controller('adminsuratketlainnyaController', adminsuratketlainnyaController)
    .controller('adminsuratketnikahController', adminsuratketnikahController);

function adminsuratbelummenikahController($http, helperServices, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratBelumMenikah = {};
    $scope.DatasSuratBelumMenikah = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratBelumMenikah.data = {};
    $scope.dataPrint;
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.Pejabat = lurah;
                JenisPermohonanService.getByJenis("Belum Menikah").then(jenis => {
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratBelumMenikah = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedPenduduk = function () {
        var a = JSON.parse(angular.copy($scope.ItemPenduduk));
        $scope.SuratBelumMenikah.idpenduduk = a.idpenduduk;
        $scope.SuratBelumMenikah.nama = a.nama;
    }

    $scope.Simpan = function () {
        var today = new Date();
        $scope.SuratBelumMenikah.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratBelumMenikah.data.pejabat = $scope.Pejabat
        $scope.SuratBelumMenikah.idjenispermohonan = 2;
        $http({
            method: 'post',
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratBelumMenikah
        }).then(param => {
            $scope.SuratBelumMenikah.idpermohonan = param.idpermohonan;
            $scope.DatasSuratBelumMenikah.push(angular.copy($scope.SuratBelumMenikah));
            message.info("Berhasil Menyimpan");
            $scope.SuratBelumMenikah = {};
            $scope.ItemPenduduk = "";
        }, error => {
            message.errorText(error.message);
        })
    }
    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk/" + item.idpenduduk,
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                $scope.Print(id)
            }, 1300);
        })
    }

    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }



}

function adminsuratketmenikahController($http, helperServices, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratMenikah = {};
    $scope.DatasSuratMenikah = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratMenikah.data = {};
    $scope.dataPrint;
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.Pejabat = lurah;
                JenisPermohonanService.getByJenis("Sudah Menikah").then(jenis => {
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratMenikah = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedPenduduk = function () {
        var a = JSON.parse(angular.copy($scope.ItemPenduduk));
        $scope.SuratMenikah.idpenduduk = a.idpenduduk;
        $scope.SuratMenikah.nama = a.nama;
    }

    $scope.Simpan = function () {
        var today = new Date();
        $scope.SuratMenikah.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratMenikah.data.pejabat = $scope.Pejabat
        $scope.SuratMenikah.idjenispermohonan = 2;
        $http({
            method: 'post',
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratMenikah
        }).then(param => {
            $scope.SuratMenikah.idpermohonan = param.idpermohonan;
            $scope.DatasSuratMenikah.push(angular.copy($scope.SuratMenikah));
            message.info("Berhasil Menyimpan");
            $scope.SuratMenikah = {};
            $scope.ItemPenduduk = "";
        }, error => {
            message.errorText(error.message);
        })
    }
    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk/" + item.idpenduduk,
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                $scope.Print(id)
            }, 1300);
        })
    }

    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }


}

function adminsurattidakmampuController($http, helperServices, AuthService, $scope, message, $state,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratTidakMampu = {};
    $scope.DatasSuratTidakMampu = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratTidakMampu.data = {};
    $scope.dataPrint = {};
    $scope.IdJenis;
    $scope.TabList = true;
    $scope.TabTambah = false;
    $scope.TabEdit = false;
    $scope.TabApproved = false;
    $scope.UserRole;
    $scope.SetTabTambah = function (item, data) {
        if (item == "Tambah") {
            $scope.TabList = false;
            $scope.TabTambah = true;
            $scope.TabEdit = false;
            $scope.TabApproved = false;
        } else if (item == "Edit") {
            $scope.SuratTidakMampu = data;
            $scope.TabList = false;
            $scope.TabEdit = true;
            $scope.TabList = false;
            $scope.TabApproved = false;
        } else if (item == "approved") {
            $scope.SuratTidakMampu = data;
            $scope.TabList = false;
            $scope.TabEdit = false;
            $scope.TabList = false;
            $scope.TabApproved = true;
        } else {
            $scope.TabList = true;
            $scope.TabTambah = false;
            $scope.TabEdit = false;
        }
    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                    $scope.Pejabat = lurah;
                    JenisPermohonanService.getByJenis("Tidak Mampu").then(jenis => {
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            if (param.length !== 0) {
                                param.forEach(value => {
                                    if (value.persetujuan != null || value.persetujuan != undefined) {
                                        value.SetButtonPrint = true;
                                        value.persetujuan.forEach(item => {
                                            if (item.role == "lurah" && item.status == "selesai") {
                                                value.SetButtonPrint = false;
                                                value.OpenButtonPrint = true;
                                            } else {
                                                value.SetButtonPrint = true;
                                                value.OpenButtonPrint = false;
                                            }
                                        });
                                        if (value.persetujuan[value.persetujuan.length - 1].role == "seklur" && value.persetujuan[value.persetujuan.length - 1].status == "dikembalikan") {
                                            value.SetButtonApproved = false;
                                            value.OpenButtonApproved = false;
                                        } else {
                                            value.SetButtonApproved = true;
                                        }
                                    } else {
                                        value.SetButtonPrint = true;
                                        value.SetButtonApproved = false;
                                    }
                                })
                            }
                            $scope.DatasSuratTidakMampu = angular.copy(param);
                        })
                    })
                })
            })
        })
    }
    $scope.SelectedPenduduk = function () {
        var a = JSON.parse(angular.copy($scope.ItemPenduduk));
        $scope.SuratTidakMampu.idpenduduk = a.idpenduduk;
        $scope.SuratTidakMampu.nama = a.nama;
    }
    $scope.Simpan = function () {
        var Method;
        if ($scope.TabTambah) {
            Method = "post";
        } else {
            Method = "put";
        }
        var today = new Date();
        $scope.SuratTidakMampu.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratTidakMampu.data.pejabat = $scope.Pejabat
        $scope.SuratTidakMampu.idjenispermohonan = $scope.IdJenis;
        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratTidakMampu
        }).then(param => {
            if ($scope.TabTambah) {
                $scope.SuratTidakMampu.SetButtonPrint = true;
                $scope.SuratTidakMampu.idpermohonan = param.idpermohonan;
                $scope.DatasSuratTidakMampu.push(angular.copy($scope.SuratTidakMampu));
                message.info("Berhasil Menyimpan");
                $scope.SuratTidakMampu = {};
                $scope.ItemPenduduk = "";
            } else {
                message.info("Berhasil Mengubah data");
            }

        }, error => {
            message.errorText(error.message);
        })
    }
    $scope.Selecteddata = function (id, item) {
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk/" + item.idpenduduk,
            headers: AuthService.getHeader()
        }).then(param => {
            item.penduduk = param.data;
            $scope.dataPrint = angular.copy(item);
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                $scope.Print(id)
            }, 1300);
        })

    }
    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}

function adminsuratkelahiranController($http, helperServices, AuthService,
    PejabatService, PendudukService, JenisPermohonanService, PermohonanService,
    $scope, message) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratKelahiran = {};
    $scope.SuratKelahiran.data = {};
    $scope.DatasSuratKelahiran = [];
    $scope.TanggalSurat;
    $scope.TanggalLahir;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratKelahiran.data = {};
    $scope.dataPrint;
    $scope.JenisKelamin = helperServices.JenisKelamin;
    $scope.TabList = true;
    $scope.IdJenis
    $scope.TabTambah = false;
    $scope.TabEdit = false;
    $scope.TabApproved = false;
    $scope.ItemAyah = "";
    $scope.ItemIbu = "";
    $scope.SetTabTambah = function (item, data) {
        if (item == "Tambah") {
            $scope.TabList = false;
            $scope.TabTambah = true;
            $scope.TabEdit = false;
            $scope.TabApproved = false;
        } else if (item == "Edit") {
            $scope.SuratKelahiran = data;
            $scope.ListPenduduk.forEach(params => {
                if (params.idpenduduk == data.idpenduduk) {
                    $scope.ItemAyah = JSON.stringify(params);
                } else if (params.idpenduduk == data.data.idpendudukibu) {
                    $scope.ItemIbu = JSON.stringify(params);
                }
            })
            data.data.tanggallahir = new Date(JSON.parse(data.data.tanggallahir));
            $scope.TanggalLahir = data.data.tanggallahir.getFullYear() + "-" + (data.data.tanggallahir.getMonth() + 1) + "-" + data.data.tanggallahir.getDate();
            $scope.TabList = false;
            $scope.TabEdit = true;
            $scope.TabList = false;
            $scope.TabApproved = false;
        } else if (item == "approved") {
            $scope.SuratKelahiran = data;
            data.data.tanggallahir = Date.parse(data.data.tanggallahir);
            $scope.TanggalLahir = data.data.tanggallahir.getFullYear() + "-" + (data.data.tanggallahir.getMonth() + 1) + "-" + data.data.tanggallahir.getDate();
            $scope.TabList = false;
            $scope.TabEdit = false;
            $scope.TabList = false;
            $scope.TabApproved = true;
        } else {
            $scope.TabList = true;
            $scope.TabTambah = false;
            $scope.TabEdit = false;
            $scope.TabApproved = false;
        }
    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                    $scope.Pejabat = lurah;
                    JenisPermohonanService.getByJenis("Kelahiran").then(jenis => {
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            if (param.length !== 0) {
                                param.forEach(value => {
                                    if (value.persetujuan != null || value.persetujuan != undefined) {
                                        value.SetButtonPrint = true;
                                        value.persetujuan.forEach(item => {
                                            if (item.role == "lurah" && item.status == "selesai") {
                                                value.SetButtonPrint = false;
                                                value.OpenButtonPrint = true;
                                            } else {
                                                value.SetButtonPrint = true;
                                                value.OpenButtonPrint = false;
                                            }
                                        });
                                        if (value.persetujuan[value.persetujuan.length - 1].role == "seklur" && value.persetujuan[value.persetujuan.length - 1].status == "dikembalikan") {
                                            value.SetButtonApproved = false;
                                            value.OpenButtonApproved = false;
                                        } else {
                                            value.SetButtonApproved = true;
                                        }
                                    } else {
                                        value.SetButtonPrint = true;
                                        value.SetButtonApproved = false;
                                    }
                                })
                            }
                            $scope.DatasSuratKelahiran = angular.copy(param);
                        })
                    })
                })
            })
        })
    }
    $scope.SelectedOrtu = function (item) {
        if (item == "Ayah") {
            var a = JSON.parse(angular.copy($scope.ItemAyah))
            $scope.SuratKelahiran.idpenduduk = a.idpenduduk;
            $scope.SuratKelahiran.nama = a.nama
        } else {
            var a = JSON.parse(angular.copy($scope.ItemIbu))
            $scope.SuratKelahiran.data.idpendudukibu = a.idpenduduk;
            $scope.SuratKelahiran.data.namaibu = a.nama;
        }

    }
    $scope.Simpan = function () {
        var Method;
        if ($scope.TabTambah) {
            Method = "post";
        } else {
            Method = "put";
        }
        var today = new Date();
        $scope.SuratKelahiran.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratKelahiran.data.pejabat = $scope.Pejabat;
        $scope.SuratKelahiran.idjenispermohonan = $scope.IdJenis;

        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratKelahiran
        }).then(param => {
            $scope.SuratKelahiran.idpermohonan = param.idpermohonan;
            $scope.DatasSuratKelahiran.push(angular.copy($scope.SuratKelahiran));
            message.info("Berhasil Menyimpan");
            $scope.SuratKelahiran = {};
            $scope.ItemPenduduk = "";
            $scope.TabList = true;
            $scope.TabTambah = false;
            $scope.TabEdit = false;
            $scope.TabApproved = false;
        }, error => {
            message.errorText(error.message);
        })
    }
    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk/" + item.idpenduduk,
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                $scope.Print(id)
            }, 1300);
        })
    }
    $scope.SelectTanggalLahir = function () {
        var a = $scope.TanggalLahir.split("-");
        $scope.SuratKelahiran.data.tanggallahir = JSON.stringify(new Date(a[0], parseInt(a[1]) - 1, a[2]));
        $scope.SuratKelahiran.data.harilahir = GetHariIndonesia(new Date(a[0], parseInt(a[1]) - 1, a[2]));
    }
    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}

function adminsuratketceraiController($http, helperServices, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.SuratKetCerai = {};
    $scope.DatasSuratKetCerai = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratKetCerai.data = {};
    $scope.dataPrint;
    $scope.ItemSuami = "";
    $scope.ItemIstri = "";
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.Pejabat = lurah;
                JenisPermohonanService.getByJenis("Keterangan Cerai").then(jenis => {
                    $scope.JenisPermohonan = jenis;
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratKetCerai = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedSuami = function () {
        var a = JSON.parse(angular.copy($scope.ItemSuami));
        $scope.ItemSuami = angular.copy(a);
        $scope.SuratKetCerai.idpenduduk = a.idpenduduk;
        $scope.SuratKetCerai.nama = a.nama;
    }
    $scope.SelectedIstri = function () {
        var a = JSON.parse(angular.copy($scope.ItemIstri));
        $scope.ItemIstri = angular.copy(a);
        $scope.SuratKetCerai.data.idistri = a.idpenduduk;
        $scope.SuratKetCerai.data.namaistri = a.nama;
    }

    $scope.Simpan = function () {
        $scope.SuratKetCerai.tanggalpengajuan = new Date();
        $scope.SuratKetCerai.data.pejabat = $scope.Pejabat
        $scope.SuratKetCerai.idjenispermohonan = $scope.JenisPermohonan.idjenispermohonan;
        PermohonanService.post($scope.SuratKetCerai).then(param => {
            $scope.SuratKetCerai.idpermohonan = param.idpermohonan;
            $scope.DatasSuratKetCerai.push(angular.copy($scope.SuratKetCerai));
            message.info("Berhasil Menyimpan");
            $scope.SuratKetCerai = {};
            $scope.ItemPenduduk = "";
        })
    }
    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk/" + item.idpenduduk,
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                $scope.Print(id)
            }, 1300);
        })
    }

    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }

}

function adminsuratketdesaController($http, helperServices, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratKetDesa = {};
    $scope.DatasSuratKetDesa = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratKetDesa.data = {};
    $scope.dataPrint = {};
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.Pejabat = lurah;
                JenisPermohonanService.getByJenis("Keterangan Desa").then(jenis => {
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratKetDesa = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedPenduduk = function () {
        var a = JSON.parse(angular.copy($scope.ItemPenduduk));
        $scope.SuratKetDesa.idpenduduk = a.idpenduduk;
        $scope.SuratKetDesa.nama = a.nama;
    }

    $scope.Simpan = function () {
        var today = new Date();
        $scope.SuratKetDesa.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratKetDesa.data.pejabat = $scope.Pejabat
        $scope.SuratKetDesa.idjenispermohonan = 3;
        $http({
            method: 'post',
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratKetDesa
        }).then(param => {
            $scope.SuratKetDesa.idpermohonan = param.idpermohonan;
            $scope.DatasSuratKetDesa.push(angular.copy($scope.SuratKetDesa));
            message.info("Berhasil Menyimpan");
            $scope.SuratKetDesa = {};
            $scope.ItemPenduduk = "";
        }, error => {
            message.errorText(error.message);
        })
    }

    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
        $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
        setTimeout(function () {
            $scope.Print(id)
        }, 1300);
    }

    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }



}

function adminsuratketektpController() {

}

function adminsuratketlainnyaController($http, helperServices, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratKetDesa = {};
    $scope.DatasSuratKetDesa = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratKetDesa.data = {};
    $scope.dataPrint = {};
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.Pejabat = lurah;
                JenisPermohonanService.getByJenis("Keterangan Lainnya").then(jenis => {
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratKetDesa = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedPenduduk = function () {
        var a = JSON.parse(angular.copy($scope.ItemPenduduk));
        $scope.SuratKetDesa.idpenduduk = a.idpenduduk;
        $scope.SuratKetDesa.nama = a.nama;
    }

    $scope.Simpan = function () {
        var today = new Date();
        $scope.SuratKetDesa.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratKetDesa.data.pejabat = $scope.Pejabat
        $scope.SuratKetDesa.idjenispermohonan = 3;
        $http({
            method: 'post',
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratKetDesa
        }).then(param => {
            $scope.SuratKetDesa.idpermohonan = param.idpermohonan;
            $scope.DatasSuratKetDesa.push(angular.copy($scope.SuratKetDesa));
            message.info("Berhasil Menyimpan");
            $scope.SuratKetDesa = {};
            $scope.ItemPenduduk = "";
        }, error => {
            message.errorText(error.message);
        })
    }

    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
        $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
        setTimeout(function () {
            $scope.Print(id)
        }, 1300);
    }

    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }

}

function adminsuratketnikahController($http, helperServices, PejabatService, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratNikah = {};
    $scope.DatasSuratNikah = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratNikah.data = {};
    $scope.dataPrint;
    $scope.ItemSuami = "";
    $scope.ItemIstri = "";
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.Pejabat = lurah;
                JenisPermohonanService.getByJenis("Keterangan Lainnya").then(jenis => {
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratNikah = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedSuami = function () {
        var a = JSON.parse(angular.copy($scope.ItemSuami));
        $scope.ItemSuami = angular.copy(a);
        $scope.SuratNikah.idpenduduk = a.idpenduduk;
        $scope.SuratNikah.nama = a.nama;
    }
    $scope.SelectedIstri = function () {
        var a = JSON.parse(angular.copy($scope.ItemIstri));
        $scope.ItemIstri = angular.copy(a);
        $scope.SuratNikah.data.idistri = a.idpenduduk;
        $scope.SuratNikah.data.namaistri = a.nama;
    }

    $scope.Simpan = function () {
        var today = new Date();
        $scope.SuratNikah.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratNikah.data.pejabat = $scope.Pejabat
        $scope.SuratNikah.idjenispermohonan = 2;
        $http({
            method: 'post',
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratNikah
        }).then(param => {
            $scope.SuratNikah.idpermohonan = param.idpermohonan;
            $scope.DatasSuratNikah.push(angular.copy($scope.SuratNikah));
            message.info("Berhasil Menyimpan");
            $scope.SuratNikah = {};
            $scope.ItemPenduduk = "";
        }, error => {
            message.errorText(error.message);
        })
    }
    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk/" + item.idpenduduk,
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                $scope.Print(id)
            }, 1300);
        })
    }

    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }
}

function adminsuratketusahaController() {

}

function adminsuratpenguasaantanahController() {

}

function adminsuratskckController() {

}

function adminsuratketdomisiliController($http, helperServices, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratDomisili = {};
    $scope.DatasSuratDomisili = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratDomisili.data = {};
    $scope.dataPrint;
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.Pejabat = lurah;
                JenisPermohonanService.getByJenis("Keterangan Domisili").then(jenis => {
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratDomisili = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedPenduduk = function () {
        var a = JSON.parse(angular.copy($scope.ItemPenduduk));
        $scope.SuratDomisili.idpenduduk = a.idpenduduk;
        $scope.SuratDomisili.nama = a.nama;
    }

    $scope.Simpan = function () {
        var today = new Date();
        $scope.SuratDomisili.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratDomisili.data.pejabat = $scope.Pejabat
        $scope.SuratDomisili.idjenispermohonan = 6;
        $http({
            method: 'post',
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratDomisili
        }).then(param => {
            $scope.SuratDomisili.idpermohonan = param.idpermohonan;
            $scope.DatasSuratDomisili.push(angular.copy($scope.SuratDomisili));
            message.info("Berhasil Menyimpan");
            $scope.SuratDomisili = {};
            $scope.ItemPenduduk = "";
        }, error => {
            message.errorText(error.message);
        })
    }
    $scope.Selecteddata = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk/" + item.idpenduduk,
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                $scope.Print(id)
            }, 1300);
        })
    }

    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }

}