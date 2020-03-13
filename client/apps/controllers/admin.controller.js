angular.module('admin.controller', [])
    .controller('adminController', adminController)
    .controller('adminHomeController', adminHomeController)
    .controller('admindatakepaladesaController', admindatakepaladesaController)
    .controller('admindataumumdesaController', admindataumumdesaController)
    // .controller('adminsuratpengantarkkController', adminsuratpengantarkkController)
    .controller('admindatapendudukController', admindatapendudukController)
    .controller('adminJenisPermohonanController', adminJenisPermohonanController)
    .controller('adminJabatanController', adminJabatanController)
    .controller('adminpreviewController', adminpreviewController)
    .controller('adminsuratketdomisiliController', adminsuratketdomisiliController)
    .controller('adminsurattidakmampuController', adminsurattidakmampuController)
    .controller('admintambahpermohonanController', admintambahpermohonanController)
    .controller('adminpermohonanController', adminpermohonanController)
    .controller('adminpejabatController', adminpejabatController)
    .controller('adminsuratskckController', adminsuratskckController)
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


function adminController(AuthService) {
    AuthService.Init(["admin"]);
}


function adminsuratbelummenikahController($http, helperServices, AuthService, $scope, message) {
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
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            headers: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/byjenis/2",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasSuratBelumMenikah = angular.copy(param.data);
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

function adminsuratketmenikahController($http, helperServices, AuthService, $scope, message) {
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
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            headers: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/byjenis/2",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasSuratMenikah = angular.copy(param.data);
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


function adminsurattidakmampuController($http, helperServices, AuthService, $scope, message, DTOptionsBuilder, DTColumnBuilder, $state) {
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
        }
        else if (item == "approved") {
            $scope.SuratTidakMampu = data;
            $scope.TabList = false;
            $scope.TabEdit = false;
            $scope.TabList = false;
            $scope.TabApproved = true;
        }
        else {
            $scope.TabList = true;
            $scope.TabTambah = false;
            $scope.TabEdit = false;
        }
    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/jenispermohonan/jenis/Tidak Mampu",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.IdJenis = param.data.idjenispermohonan;
            $http({
                method: "get",
                url: helperServices.url + "/api/permohonan/byjenis/" + param.data.idjenispermohonan,
                headers: AuthService.getHeader()
            }).then(param => {
                if (param.data.length !== 0) {
                    param.data.forEach(value => {
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
                $scope.DatasSuratTidakMampu = angular.copy(param.data);
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
        $state.go('approved-surattidakmampu', { id: item.idpermohonan })
    }
}

function adminsuratkelahiranController($http, helperServices, AuthService, $scope, message) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratKelahiran = {};
    $scope.SuratKelahiran.data={};
    $scope.DatasSuratKelahiran = [];
    $scope.TanggalSurat;
    $scope.TanggalLahir;
    $scope.Jam;
    $scope.Pejabat = {};
    $scope.SuratKelahiran.data = {};
    $scope.dataPrint;
    $scope.JenisKelamin =  helperServices.JenisKelamin;
    $scope.TabList = true;
    $scope.IdJenis
    $scope.TabTambah = false;
    $scope.TabEdit = false;
    $scope.TabApproved = false;
    $scope.ItemAyah="";
    $scope.ItemIbu="";
    $scope.SetTabTambah = function (item, data) {
        if (item == "Tambah") {
            $scope.TabList = false;
            $scope.TabTambah = true;
            $scope.TabEdit = false;
            $scope.TabApproved = false;
        } else if (item == "Edit") {
            $scope.SuratKelahiran = data;
            $scope.ListPenduduk.forEach(params=>{
                if(params.idpenduduk==data.idpenduduk){
                    $scope.ItemAyah=JSON.stringify(params);
                }else if(params.idpenduduk==data.data.idpendudukibu){
                    $scope.ItemIbu=JSON.stringify(params);
                }
            })
            data.data.tanggallahir = new Date(JSON.parse(data.data.tanggallahir));
            $scope.TanggalLahir = data.data.tanggallahir.getFullYear()+"-"+(data.data.tanggallahir.getMonth()+1)+"-"+data.data.tanggallahir.getDate();
            $scope.TabList = false;
            $scope.TabEdit = true;
            $scope.TabList = false;
            $scope.TabApproved = false;
        }
        else if (item == "approved") {
            $scope.SuratKelahiran = data;
            data.data.tanggallahir = Date.parse(data.data.tanggallahir);
            $scope.TanggalLahir = data.data.tanggallahir.getFullYear()+"-"+(data.data.tanggallahir.getMonth()+1)+"-"+data.data.tanggallahir.getDate();
            $scope.TabList = false;
            $scope.TabEdit = false;
            $scope.TabList = false;
            $scope.TabApproved = true;
        }
        else {
            $scope.TabList = true;
            $scope.TabTambah = false;
            $scope.TabEdit = false;
            $scope.TabApproved = false;
        }
    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/jenispermohonan/jenis/Kelahiran",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.IdJenis = param.data.idjenispermohonan;
            $http({
                method: "get",
                url: helperServices.url + "/api/permohonan/byjenis/" + param.data.idjenispermohonan,
                headers: AuthService.getHeader()
            }).then(param => {
                if (param.data.length !== 0) {
                    param.data.forEach(value => {
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
                $scope.DatasSuratKelahiran = angular.copy(param.data);
            })
        })
    }
    $scope.SelectedOrtu = function (item) {
        if(item=="Ayah"){
            var a = JSON.parse(angular.copy($scope.ItemAyah))
            $scope.SuratKelahiran.idpenduduk = a.idpenduduk;
            $scope.SuratKelahiran.nama = a.nama
        }else{
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
    $scope.SelectTanggalLahir = function(){
        var a = $scope.TanggalLahir.split("-");
        $scope.SuratKelahiran.data.tanggallahir =JSON.stringify(new Date(a[0], parseInt(a[1])-1, a[2]));
        $scope.SuratKelahiran.data.harilahir = GetHariIndonesia(new Date(a[0], parseInt(a[1])-1, a[2]));
    }
    $scope.Print = function (id) {
        var innerContents = document.getElementById(id).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><title>Cetak Surat</title></head><body onload="window.print()"><div>' + innerContents + '</html>');
        popupWinindow.document.close();
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', { id: item.idpermohonan })
    }
}

function adminsuratketceraiController($http, helperServices, AuthService, $scope, message) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
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
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            headers: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/byjenis/2",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasSuratKetCerai = angular.copy(param.data);
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
        var today = new Date();
        $scope.SuratKetCerai.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.SuratKetCerai.data.pejabat = $scope.Pejabat
        $scope.SuratKetCerai.idjenispermohonan = 2;
        $http({
            method: 'post',
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.SuratKetCerai
        }).then(param => {
            $scope.SuratKetCerai.idpermohonan = param.idpermohonan;
            $scope.DatasSuratKetCerai.push(angular.copy($scope.SuratKetCerai));
            message.info("Berhasil Menyimpan");
            $scope.SuratKetCerai = {};
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

function adminsuratketdesaController($http, helperServices, AuthService, $scope, message) {
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
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/byjenis/3",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasSuratKetDesa = angular.copy(param.data);
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

function adminsuratketlainnyaController($http, helperServices, AuthService, $scope, message) {
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
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/byjenis/3",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasSuratKetDesa = angular.copy(param.data);
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

function adminsuratketnikahController($http, helperServices, AuthService, $scope, message) {
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
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            headers: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/byjenis/2",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasSuratNikah = angular.copy(param.data);
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

function admininboxController() {

}

function adminpejabatController($http, helperServices, AuthService, $scope) {
    $scope.DatasPejabat = [];
    $scope.DataJabatan = [];
    $scope.Jabatan = {};
    $scope.Pejabat = {};
    $scope.ItemJabatan = ""
    $scope.NoJabatan = false;
    $scope.SetJabatan = "";
    $scope.Agama = helperServices.Agama;
    $scope.PendidikanTerakhir = helperServices.PendidikanTerakhir;
    $scope.SetEmail = false;
    $scope.Init = function () {
        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.DatasPejabat = param.data;
        })

        $http({
            method: "get",
            url: helperServices.url + "/api/jabatan",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.DataJabatan = param.data;

        })
    }
    $scope.SelectedJabatan = function () {
        $scope.ItemJabatan = JSON.parse($scope.ItemJabatan);
        if ($scope.ItemJabatan.nama == "Lurah" || $scope.ItemJabatan.nama == "Sekertaris Lurah" || $scope.ItemJabatan.nama == "Sekertaris Lurah") {
            $scope.NoJabatan = false;
            $scope.Pejabat.idjabatan = $scope.ItemJabatan.idjabatan;
            $scope.SetEmail = true;
        } else {
            $scope.NoJabatan = true;
            $scope.Pejabat.idjabatan = $scope.ItemJabatan.idjabatan;
            $scope.SetJabatan = $scope.ItemJabatan.nama;
            $scope.SetEmail = false;
        }
    }
    $scope.Simpan = function () {
        $http({
            method: 'post',
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader(),
            data: $scope.Pejabat
        }).then(param => {
            $scope.DatasPejabat.push(angular.copy(param.data));
            alert("Berhasil Simpan");
        }, error => {
            alert(error.message)
        })
    }

    $scope.Ubah = function () {
        $http({
            method: 'put',
            url: helperServices.url + "/api/jabatan",
            Header: AuthService.getHeader(),
            data: $scope.InputPermohonan
        }).then(param => {
            alert("Berhasil Melakukan perubahan");
        }, error => {
            alert(error.message)
        })
    }

    $scope.Hapus = function (item) {
        $http({
            method: 'delete',
            url: helperServices.url + "/api/jabatan/" + item.idjenispermohonan,
            Header: AuthService.getHeader()
        }).then(param => {
            alert("Data Berhasil Di hapus");
        }, error => {
            alert(error.message)
        })
    }
}

function adminsuratketusahaController() {

}

function adminsuratpenguasaantanahController() {

}

function adminsuratskckController() {

}

function adminpermohonanController() {

}

function admintambahpermohonanController($http, helperServices, AuthService, $scope) {
    $scope.Selected;
    $scope.Penduduk = [];
    $http({
        method: "get",
        url: helperServices.url + "/api/penduduk",
        Header: AuthService.getHeader()
    }).then(param => {
        $scope.Penduduk = param.data;
    }, error => {

    })


}

function adminsuratketdomisiliController($http, helperServices, AuthService, $scope, message) {
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
        $http({
            method: "get",
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.ListPenduduk = param.data;
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader()
        }).then(param => {
            param.data.forEach(value => {
                if (value.namajabatan == "Lurah" && value.status == 1) {
                    $scope.Pejabat = value;
                }
            })
        })
        $http({
            method: "get",
            url: helperServices.url + "/api/permohonan/byjenis/6",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasSuratDomisili = angular.copy(param.data);
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

function adminpreviewController() {

}

function adminHomeController($http, helperServices, AuthService, $scope, InboxService) {
    $scope.LuasWilayah = {};
    $scope.Profile = {};
    $scope.Penduduk = {};
    $scope.Pekerjaan = {};
    $scope.Jarak = {};
    InboxService.get().then(res => {
        $http({
            method: "get",
            url: helperServices.url + "/api/profildesa",
            Header: AuthService.getHeader()
        }).then(response => {
            response.data.forEach(value => {
                if (value.nama == 'Luas Wilayah') {
                    $scope.LuasWilayah = value;
                } else if (value.nama == 'Profile') {
                    $scope.Profile = value;
                } else if (value.nama == 'Pekerjaan') {
                    $scope.Pekerjaan = value;
                } else if (value.nama == 'Jarak') {
                    $scope.Jarak = value;
                }
            })
        })
    });

    $scope.Simpan = function (item) {
        if (item == 'Profile') {
            if ($scope.Profile.nama == undefined) {
                $scope.Profile.nama = 'Profile';
                $scope.Profile.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Profile
                }).then(response => {
                    alert("Berhasil Simpan");
                }, error => {
                    alert(error.message);
                })
            }

        } else if (item == 'LuasWilayah') {
            if ($scope.LuasWilayah.nama == undefined) {
                $scope.LuasWilayah.nama = 'LuasWilayah';
                $scope.LuasWilayah.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.LuasWilayah
                }).then(response => {
                    alert("Berhasil Simpan");
                }, error => {
                    alert(error.message);
                })
            }
        } else if (item == 'LuasWilayah') {
            if ($scope.Profile.nama == undefined) {
                $scope.Profile.nama = 'LuasWilayah';
                $scope.Profile.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Profile
                }).then(response => {
                    alert("Berhasil Simpan");
                }, error => {
                    alert(error.message);
                })
            }
        } else if (item == 'Pekerjaan') {
            if ($scope.Pekerjaan.nama == undefined) {
                $scope.Pekerjaan.nama = 'Pekerjaan';
                $scope.Pekerjaan.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Pekerjaan
                }).then(response => {
                    alert("Berhasil Simpan");
                }, error => {
                    alert(error.message);
                })
            }
        } else if (item == 'Jarak') {
            if ($scope.Jarak.nama == undefined) {
                $scope.Jarak.nama = 'Jarak';
                $scope.Jarak.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Jarak
                }).then(response => {
                    alert("Berhasil Simpan");
                }, error => {
                    alert(error.message);
                })
            }
        }
    }

}

function admindatakepaladesaController() {

}

function admindataumumdesaController() {

}

function adminJenisPermohonanController($http, $scope, helperServices, AuthService, message) {
    $scope.DatasJenisPermohonan = [];
    $scope.JenisPermohonan = {};
    $scope.JenisPermohonan.persyaratan = [];
    $scope.KepemilikanKTP = helperServices.StatusKepemilikanKTP;
    $scope.InputPermohonan;
    $scope.ItemPersyaratan = "";
    $scope.Persyaratan = [];
    $scope.PermohonanJenis = helperServices.PermohonanJenis;
    $scope.Init = function () {
        $http({
            method: 'get',
            url: helperServices.url + "/api/jenispermohonan",
            headers: AuthService.getHeader()
        }).then(param => {
            $scope.DatasJenisPermohonan = param.data;
        }, error => {

        })
    }
    $scope.addPersyaratan = function () {
        if ($scope.ItemPersyaratan !== "") {
            $scope.Persyaratan.push(angular.copy($scope.ItemPersyaratan));
            $scope.ItemPersyaratan = "";
        }
    }

    $scope.Simpan = function () {
        $scope.JenisPermohonan.persyaratan = $scope.Persyaratan
        $http({
            method: 'post',
            url: helperServices.url + "/api/jenispermohonan",
            headers: AuthService.getHeader(),
            data: $scope.JenisPermohonan
        }).then(param => {
            $scope.JenisPermohonan.idjenispermohonan = param.data.idjenispermohonan;
            $scope.DatasJenisPermohonan.push(angular.copy($scope.JenisPermohonan));
            message.info("Berhasil Simpan");
            $scope.JenisPermohonan = {};
            $scope.ItemPersyaratan = [];
        }, error => {
            message.errorText(error.message);
        })
    }

    $scope.Ubah = function () {
        $http({
            method: 'put',
            url: helperServices.url + "/api/jenispermohonan",
            Header: AuthService.getHeader(),
            data: $scope.InputPermohonan
        }).then(param => {
            alert("Berhasil Melakukan perubahan");
        }, error => {
            alert(error.message)
        })
    }

    $scope.Hapus = function (item) {
        $http({
            method: 'delete',
            url: helperServices.url + "/api/jenispermohonan/" + item.idjenispermohonan,
            Header: AuthService.getHeader()
        }).then(param => {
            alert("Data Berhasil Di hapus");
        }, error => {
            alert(error.message)
        })
    }

}

function adminsuratpengantarktpController() {

}

function admindatapendudukController($scope, $http, helperServices, AuthService) {
    $scope.DataPenduduk = [];
    $scope.KepemilikanKTP = helperServices.StatusKepemilikanKTP;
    $scope.Agama = helperServices.Agama;
    $scope.PenghasilanTetap = helperServices.PenghasilanTetap;
    $scope.Kewarganegaraan = helperServices.Kewarganegaraan;
    $scope.JenisKelamin = helperServices.JenisKelamin;
    $scope.BacaHuruf = helperServices.BacaHuruf;
    $scope.Kewarganegawaan = helperServices.Kewarganegawaan;
    $scope.StatusTT = helperServices.StatusTT
    $scope.StatusSosial = helperServices.StatusSosial
    $scope.StatusKIS = helperServices.StatusKIS;
    $scope.StatusKIP = helperServices.StatusKIP
    $scope.StatusKK = helperServices.StatusKK;
    $scope.StatusKeluarga = helperServices.StatusKeluarga;
    $scope.DataInput = {};
    $scope.Pekerjaan = helperServices.Pekerjaan;
    $scope.Penduduk = {};
    $scope.PendidikanTerakhir = helperServices.PendidikanTerakhir
    $scope.GolonganDarah = helperServices.GolonganDarah;
    $scope.StatusPerkawinan = helperServices.StatusPerkawinan;
    $scope.Penduduk = {};
    $scope.edit = false;
    $scope.view = false;
    $scope.Init = function () {
        $http({
            method: 'get',
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.DataPenduduk = param.data;
        }, error => {

        })
    }
    $scope.SelectedItemPenduduk = function (item, set) {
        $scope.Penduduk = item;
        if (set == "edit") {
            $scope.edit = true;
            $scope.view = false;
        } else {
            $scope.edit = false;
            $scope.view = true;
        }
    }
    $scope.Simpan = function () {
        $http({
            method: 'post',
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader(),
            data: $scope.Penduduk
        }).then(param => {
            alert("Data Berhasil di Simpan")
            $scope.DataPenduduk.push(angular.copy(param.data));
            $scope.Penduduk = {};
        }, error => {

        })
    }
    $scope.Ubah = function () {
        $http({
            method: 'put',
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader(),
            data: $scope.Penduduk
        }).then(param => {
            alert("Data Berhasil di Ubah");
        }, error => {
            alert(error.message);
        })
    }

}

function adminJabatanController($scope, $http, helperServices, AuthService) {
    $scope.DataJabatan = [];
    $scope.DataInput = {};
    $scope.Init = function () {
        $http({
            method: 'get',
            url: helperServices.url + "/jabatan",
            Header: AuthService.getHeader()
        }).then(param => {

        }, error => {

        })
    }
    $scope.Simpan = function () {
        $http({
            method: 'post',
            url: helperServices.url + "/jabatan",
            Header: AuthService.getHeader(),
            data: $scope.DataInput
        }).then(param => {

        }, error => {

        })
    }
    $scope.Ubah = function () {
        $http({
            method: 'put',
            url: helperServices.url + "/jabatan",
            Header: AuthService.getHeader(),
            data: $scope.DataInput
        }).then(param => {

        }, error => {

        })
    }
    $scope.Hapus = function (item) {
        $http({
            method: 'delete',
            url: helperServices.url + "/jabatan/" + item.idjabatan,
            Header: AuthService.getHeader()
        }).then(param => {

        }, error => {

        })
    }
}