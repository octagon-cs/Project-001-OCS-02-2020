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
    $scope.model = {};
    $scope.Datas = [];
    $scope.model.pejabat = {};
    $scope.model.data = {};
    $scope.dataPrint;
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            $scope.ItemPenduduk = penduduk[0];
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.model.pejabat = lurah;
                JenisPermohonanService.getByJenis("Belum Menikah").then(jenis => {
                    $scope.JenisPermohonan = jenis;
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.Datas = angular.copy(permohonans);

                    })
                })
            })
        })
    }

    $scope.Simpan = function () {
        $scope.model.tanggalpengajuan = new Date();
        $scope.model.idjenispermohonan = $scope.JenisPermohonan.idjenispermohonan;
        PermohonanService.post($scope.model).then(param => {
            $scope.model.idpermohonan = param.idpermohonan;
            $scope.Datas.push(angular.copy($scope.model));
            message.info("Berhasil Menyimpan");
            $scope.model = {};
            $scope.ItemPenduduk = "";
        }, error => {
            message.errorText(error.message);
        });
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
    $scope.model.pejabat = {};
    $scope.SuratMenikah.data = {};
    $scope.dataPrint;
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.model.pejabat = lurah;
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
        $scope.SuratMenikah.data.model.pejabat = $scope.model.pejabat
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
    $scope.dataPejabat = [];
    $scope.ListPenduduk = [];
    $scope.model = {};
    $scope.Datasmodel = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.model={};
    $scope.model.data = {};
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
            // $scope.model = {};
            // $scope.model.data = {};
        } else if (item == "Edit") {
            $scope.model = data;
            $scope.TabList = false;
            $scope.TabEdit = true;
            $scope.TabList = false;
            $scope.TabApproved = false;
        } else if (item == "approved") {
            $scope.model = data;
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
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x=>x.status==1);
                    $scope.model.data.pejabat = $scope.dataPejabat.find(x=>x.namajabatan=="Lurah")
                    JenisPermohonanService.getByJenis("Tidak Mampu").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
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
        $scope.model.idpenduduk = a.idpenduduk;
        $scope.model.nama = a.nama;
    }
    $scope.Simpan = function () {
        var Method;
        if ($scope.TabTambah) {
            Method = "post";
        } else {
            Method = "put";
        }
        var today = new Date();
        $scope.model.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // $scope.model.data.pejabat = $scope.model.pejabat
        $scope.model.idpenduduk= angular.copy($scope.model.idpenduduk.idpenduduk)
        
        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            if ($scope.TabTambah) {
                $scope.model.SetButtonPrint = true;
                $scope.model.idpermohonan = param.idpermohonan;
                $scope.DatasSuratTidakMampu.push(angular.copy($scope.model));
                message.info("Berhasil Menyimpan");
                $scope.model = {};
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
    $scope.model={};
    $scope.model.pejabat = {};
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
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                    $scope.model.pejabat = lurah;
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
        $scope.SuratKelahiran.data.model.pejabat = $scope.model.pejabat;
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
    $scope.model = {};
    $scope.model.data = {};
    $scope.Datas = [];
    $scope.dataPrint;
    $scope.TabList = true;
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.model.data.pejabat = lurah;
                JenisPermohonanService.getByJenis("Keterangan Cerai").then(jenis => {
                    $scope.JenisPermohonan = jenis;
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.Datas = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.TabTambah = function () {
        $scope.TabList = false;
        $scope.TabTambah = true;
        $scope.TabEdit = false;
        $scope.TabApproved = false;
        $scope.model= {};
        $scope.model.data={};
    }
    $scope.ShowList= function(){
        $scope.TabList = true;
        $scope.TabTambah = false;
        $scope.TabEdit = false;
        $scope.TabApproved = false;
    }

    $scope.TabEdit = function () {
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
    }
    $scope.Simpan = function () {
        $scope.model.tanggalpengajuan = new Date();
        $scope.model.idjenispermohonan = $scope.JenisPermohonan.idjenispermohonan;
        $scope.model.idpenduduk = $scope.model.data.suami.idpenduduk;
        PermohonanService.post($scope.model).then(param => {
            $scope.model.idpermohonan = param.idpermohonan;
            $scope.Datas.push(angular.copy($scope.model));
            message.info("Berhasil Menyimpan");
            $scope.model = {};
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
    $scope.model.pejabat = {};
    $scope.SuratKetDesa.data = {};
    $scope.dataPrint = {};
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.model.pejabat = lurah;
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
        $scope.SuratKetDesa.data.model.pejabat = $scope.model.pejabat
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
    $scope.model.pejabat = {};
    $scope.SuratKetDesa.data = {};
    $scope.dataPrint = {};
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.model.pejabat = lurah;
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
        $scope.SuratKetDesa.data.model.pejabat = $scope.model.pejabat
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
    $scope.model.pejabat = {};
    $scope.SuratNikah.data = {};
    $scope.dataPrint;
    $scope.suami = "";
    $scope.istri = "";
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.model.pejabat = lurah;
                JenisPermohonanService.getByJenis("Keterangan Lainnya").then(jenis => {
                    PermohonanService.getByJenis(jenis.idjenispermohonan).then(permohonans => {
                        $scope.DatasSuratNikah = angular.copy(permohonans);
                    })
                })
            })
        })
    }
    $scope.SelectedSuami = function () {
        var a = JSON.parse(angular.copy($scope.suami));
        $scope.suami = angular.copy(a);
        $scope.SuratNikah.idpenduduk = a.idpenduduk;
        $scope.SuratNikah.nama = a.nama;
    }
    $scope.SelectedIstri = function () {
        var a = JSON.parse(angular.copy($scope.istri));
        $scope.istri = angular.copy(a);
        $scope.SuratNikah.data.idistri = a.idpenduduk;
        $scope.SuratNikah.data.namaistri = a.nama;
    }

    $scope.Simpan = function () {
        var today = new Date();
        $scope.SuratNikah.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratNikah.data.model.pejabat = $scope.model.pejabat
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
    $scope.model.pejabat = {};
    $scope.SuratDomisili.data = {};
    $scope.dataPrint;
    $scope.Init = function () {
        PendudukService.get().then(penduduk => {
            $scope.ListPenduduk = penduduk;
            PejabatService.getByJabatanName("Lurah", 1).then(lurah => {
                $scope.model.pejabat = lurah;
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
        $scope.SuratDomisili.data.model.pejabat = $scope.model.pejabat
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