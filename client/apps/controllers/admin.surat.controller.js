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
    PejabatService, PendudukService, JenisPermohonanService, PermohonanService,
    approvedService, $scope, message, tabService) {

    $scope.JenisKelamin = helperServices.JenisKelamin;
    $scope.ListRT = [];
    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.Datas = [];
    $scope.ListPenduduk = [];
    $scope.model = {};
    $scope.model.data = {};
    $scope.dataPrint;
    $scope.IdJenis
    $scope.ItemAyah = "";
    $scope.ItemIbu = "";
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x => x.status == 1);
                    $scope.model.data.pejabat = $scope.dataPejabat.find(x => x.namajabatan == "Lurah");
                    $scope.ListRT = pejabat.filter(x => x.status == 1 && x.namajabatan == "RT");
                    JenisPermohonanService.getByJenis("Belum Menikah").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            approvedService.approvedView(param, $scope.UserRole);
                            $scope.Datas = angular.copy(param);
                        })
                    })
                })
            })
        })
    }

    $scope.setHari = function (item) {
        $scope.model.data.hari = item.getDay();
    }

    $scope.Edit = function (data) {
        $scope.model = data;
        $scope.model.data.tanggalsuratpengantar = new Date(angular.copy($scope.model.data.tanggalsuratpengantar));
        $scope.model.data.idpenduduk = $scope.ListPenduduk.find(x => x.idpenduduk == data.data.idpenduduk);
        // data.data.tanggallahir = new Date(data.data.tanggallahir);
        $scope.tab.show('edit');
    }

    $scope.Approved = function (data) {
        $scope.model = data;
        data.data.tanggallahir = new Date(data.data.tanggallahir);
        $scope.tab.show('approved');
    }


    $scope.SelectedRT = function () {
        $scope.model.data.RT = $scope.ListRT.find(x => x.data.nomorrt == $scope.model.data.idpenduduk.rt && x.data.nomorrw == $scope.model.data.idpenduduk.rw);
    }
    $scope.Simpan = function () {
        var Method;
        if ($scope.tab.tambah) {
            Method = "post";
            $scope.model.tanggalpengajuan = new Date();
        } else {
            Method = "put";
            $scope.model.tanggalpengajuan = new Date($scope.model.tanggalpengajuan);
        }
        $scope.model.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);
        $scope.model.data.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);

        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            if ($scope.tab.tambah) {
                $scope.model.idpermohonan = param.idpermohonan;
                $scope.Datas.push(angular.copy($scope.model));
                message.info("Berhasil Menyimpan");
            } else {
                message.info("Berhasil Mengubah Data");
            }
            $scope.model = {};
            $scope.tab.show('list');
        }, error => {
            message.errorText(error.message);
        })
    }


    $scope.Print = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        PendudukService.getById(item.idpenduduk).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                helperServices.print(id);
            }, 1300);
        })
    }
    $scope.SelectTanggalLahir = function () {
        var a = $scope.TanggalLahir.split("-");
        $scope.model.data.tanggallahir = JSON.stringify(new Date(a[0], parseInt(a[1]) - 1, a[2]));
        $scope.model.data.harilahir = GetHariIndonesia(new Date(a[0], parseInt(a[1]) - 1, a[2]));
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}

function adminsuratketmenikahController($http, helperServices, AuthService, $scope, message,
    PejabatService, PendudukService, JenisPermohonanService, PermohonanService,
    approvedService, $scope, message, tabService) {

    $scope.JenisKelamin = helperServices.JenisKelamin;
    $scope.ListRT = [];
    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.Datas = [];
    $scope.ListPenduduk = [];
    $scope.model = {};
    $scope.model.data = {};
    $scope.dataPrint;
    $scope.IdJenis
    $scope.ItemAyah = "";
    $scope.ItemIbu = "";
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x => x.status == 1);
                    $scope.model.data.pejabat = $scope.dataPejabat.find(x => x.namajabatan == "Lurah");
                    $scope.ListRT = pejabat.filter(x => x.status == 1 && x.namajabatan == "RT");
                    JenisPermohonanService.getByJenis("Sudah Menikah").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            approvedService.approvedView(param, $scope.UserRole);
                            $scope.Datas = angular.copy(param);
                        })
                    })
                })
            })
        })
    }

    $scope.setHari = function (item) {
        $scope.model.data.hari = item.getDay();
    }

    $scope.Edit = function (data) {
        $scope.model = data;
        $scope.model.data.tanggalsuratpengantar = new Date(angular.copy($scope.model.data.tanggalsuratpengantar));
        $scope.model.data.idpenduduk = $scope.ListPenduduk.find(x => x.idpenduduk == data.data.idpenduduk);
        // data.data.tanggallahir = new Date(data.data.tanggallahir);
        $scope.tab.show('edit');
    }

    $scope.Approved = function (data) {
        $scope.model = data;
        data.data.tanggallahir = new Date(data.data.tanggallahir);
        $scope.tab.show('approved');
    }


    $scope.SelectedRT = function () {
        $scope.model.data.RT = $scope.ListRT.find(x => x.data.nomorrt == $scope.model.data.idpenduduk.rt && x.data.nomorrw == $scope.model.data.idpenduduk.rw);
    }
    $scope.Simpan = function () {
        var Method;
        if ($scope.tab.tambah) {
            Method = "post";
            $scope.model.tanggalpengajuan = new Date();
        } else {
            Method = "put";
            $scope.model.tanggalpengajuan = new Date($scope.model.tanggalpengajuan);
        }
        $scope.model.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);
        $scope.model.data.idpenduduk = angular.copy($scope.model.data.idpenduduk.idpenduduk);

        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            if ($scope.tab.tambah) {
                $scope.model.idpermohonan = param.idpermohonan;
                $scope.Datas.push(angular.copy($scope.model));
                message.info("Berhasil Menyimpan");
            } else {
                message.info("Berhasil Mengubah Data");
            }
            $scope.Init();
            $scope.tab.show('list');
        }, error => {
            message.errorText(error.message);
        })
    }


    $scope.Print = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        PendudukService.getById(item.idpenduduk).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                helperServices.print(id);
            }, 1300);
        })
    }
    $scope.SelectTanggalLahir = function () {
        var a = $scope.TanggalLahir.split("-");
        $scope.model.data.tanggallahir = JSON.stringify(new Date(a[0], parseInt(a[1]) - 1, a[2]));
        $scope.model.data.harilahir = GetHariIndonesia(new Date(a[0], parseInt(a[1]) - 1, a[2]));
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}

function adminsurattidakmampuController($http, helperServices, AuthService, $scope, message, $state,
    tabService, approvedService,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {

    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.dataPejabat = [];
    $scope.ListPenduduk = [];
    $scope.Datas = [];
    $scope.model = {};
    $scope.model.data = {};
    $scope.model.data.pejabat = {};
    $scope.dataPrint = {};
    $scope.IdJenis;
    $scope.UserRole;

    $scope.Edit = function (data) {
        $scope.model = data;
        PendudukService.getById(data.idpenduduk).then(penduduk => {
            $scope.model.idpenduduk = penduduk;
            $scope.model.idpejabat = angular.copy($scope.dataPejabat.find(x => x.idpejabat == data.idpejabat));
            $scope.tab.show('edit');
        })

    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x => x.status == 1);
                    $scope.model.idpejabat = $scope.dataPejabat.find(x => x.namajabatan == "Lurah");
                    JenisPermohonanService.getByJenis("Tidak Mampu").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            approvedService.approvedView(param, $scope.UserRole);
                            $scope.Datas = angular.copy(param);
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
        if ($scope.tab.tambah) {
            Method = "post";
        } else {
            Method = "put";
        }
        var today = new Date();
        $scope.model.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // $scope.model.data.pejabat = $scope.model.pejabat
        $scope.model.idpenduduk = angular.copy($scope.model.idpenduduk.idpenduduk);
        $scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            if ($scope.tab.tambah) {
                $scope.model.SetButtonPrint = true;
                $scope.model.idpermohonan = param.idpermohonan;
                $scope.Datas.push(angular.copy($scope.model));
                $scope.tab.show('list');
                message.info("Berhasil Menyimpan");
            } else {
                message.info("Berhasil Mengubah");
                $scope.tab.show('list');
            }
            $scope.model = {};
            $scope.model.data = {};
            $scope.Init();
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
                $scope.Print(id, item)
            }, 1300);
        })

    }
    $scope.Print = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        PendudukService.getById(item.idpenduduk, true).then(param => {
            PejabatService.getById(item.idpejabat).then(datapejabat => {
                $scope.dataPrint = param;
                $scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.tanggallahir)));
                $scope.dataPrint.tampiltanggalsurat = getTanggalIndonesia(new Date(item.persetujuan[item.persetujuan.length - 1].created));
                $scope.dataPrint.pejabat = datapejabat;
                setTimeout(function () {
                    helperServices.print(id);
                }, 900);
            })

        })
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}

function adminsuratkelahiranController($http, helperServices, AuthService, tabService,
    PejabatService, PendudukService, JenisPermohonanService, PermohonanService,
    approvedService, $scope, message) {

    $scope.JenisKelamin = helperServices.JenisKelamin;
    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.Datas = [];
    $scope.ListPenduduk = [];
    $scope.model = {};
    $scope.model.data = {};
    $scope.dataPrint;
    $scope.IdJenis
    $scope.ItemAyah = "";
    $scope.ItemIbu = "";
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x => x.status == 1);
                    $scope.model.data.pejabat = $scope.dataPejabat.find(x => x.namajabatan == "Lurah");
                    JenisPermohonanService.getByJenis("Kelahiran").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            approvedService.approvedView(param, $scope.UserRole);
                            $scope.Datas = angular.copy(param);
                        })
                    })
                })
            })
        })
    }

    $scope.setHari = function (item) {
        $scope.model.data.hari = item.getDay();
    }

    $scope.Edit = function (data) {
        $scope.model = data;
        $scope.model.data.tanggallahir = new Date(angular.copy($scope.model.data.tanggallahir));
        $scope.ListPenduduk.forEach(params => {
            if (params.idpenduduk == data.data.idpendudukayah) {
                $scope.model.data.idpendudukayah = params;
            } else if (params.idpenduduk == data.data.idpendudukibu) {
                $scope.model.data.idpendudukibu = params;
            }
        })
        // data.data.tanggallahir = new Date(data.data.tanggallahir);
        $scope.tab.show('edit');
    }

    $scope.Approved = function (data) {
        $scope.model = data;
        data.data.tanggallahir = new Date(data.data.tanggallahir);
        $scope.tab.show('approved');
    }


    $scope.SelectedOrtu = function (item) {
        if (item == "Ayah") {
            var a = JSON.parse(angular.copy($scope.ItemAyah))
            $scope.model.idpenduduk = a.idpenduduk;
            $scope.model.nama = a.nama
        } else {
            var a = JSON.parse(angular.copy($scope.ItemIbu))
            $scope.model.data.idpendudukibu = a.idpenduduk;
            $scope.model.data.namaibu = a.nama;
        }

    }
    $scope.Simpan = function () {
        var Method;
        if ($scope.tab.tambah) {
            Method = "post";
        } else {
            Method = "put";
        }

        $scope.model.tanggalpengajuan = new Date();
        $scope.model.idpenduduk = angular.copy($scope.model.data.idpendudukayah.idpenduduk);
        $scope.model.data.idpendudukayah = angular.copy($scope.model.data.idpendudukayah.idpenduduk);
        $scope.model.data.idpendudukibu = angular.copy($scope.model.data.idpendudukibu.idpenduduk);

        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            $scope.model.idpermohonan = param.idpermohonan;
            $scope.Datas.push(angular.copy($scope.model));
            message.info("Berhasil Menyimpan");
            $scope.model = {};
            $scope.ItemPenduduk = "";
            $scope.tab.show('list');
        }, error => {
            message.errorText(error.message);
        })
    }


    $scope.Print = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        PendudukService.getById(item.idpenduduk).then(param => {
            $scope.dataPrint.penduduk = param.data;
            var a = new Date(item.persetujuan[item.persetujuan.length - 1].created);
            $scope.dataPrint.tampiltanggal = getTanggalIndonesia(a);
            setTimeout(function () {
                helperServices.print(id);
            }, 1300);
        })
    }
    $scope.SelectTanggalLahir = function () {
        var a = $scope.TanggalLahir.split("-");
        $scope.model.data.tanggallahir = JSON.stringify(new Date(a[0], parseInt(a[1]) - 1, a[2]));
        $scope.model.data.harilahir = GetHariIndonesia(new Date(a[0], parseInt(a[1]) - 1, a[2]));
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}

function adminsuratketceraiController($http, helperServices, AuthService, $scope, message,
    tabService, approvedService,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {

    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.dataPejabat = [];
    $scope.ListPenduduk = [];
    $scope.Datas = [];
    $scope.model = {};
    $scope.model.data = {};
    $scope.dataPrint = {};
    $scope.IdJenis;
    $scope.UserRole;

    $scope.Edit = function (data) {
        $scope.model = data;
        $scope.model.data.idpenduduksuami = $scope.ListPenduduk.find(x => x.idpenduduk == angular.copy(data.data.idpenduduksuami));
        $scope.model.data.idpendudukistri = $scope.ListPenduduk.find(x => x.idpenduduk == angular.copy(data.data.idpendudukistri));
        $scope.model.idpejabat = $scope.dataPejabat.find(x => x.idpejabat == angular.copy(data.idpejabat));
        $scope.tab.show('edit');
    }
    $scope.Batal = function () {
        $scope.tab.show('list');
        $scope.model = {};
        $scope.model.data = {};
        $scope.Init();
    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x => x.status == 1);
                    $scope.model.idpejabat = $scope.dataPejabat.find(x => x.namajabatan == "Lurah");
                    JenisPermohonanService.getByJenis("Keterangan Cerai").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            approvedService.approvedView(param, $scope.UserRole);
                            $scope.Datas = angular.copy(param);
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
        if ($scope.tab.tambah) {
            Method = "post";
            var today = new Date();
            $scope.model.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        } else {
            Method = "put";
        }
        // $scope.model.data.pejabat = $scope.model.pejabat
        $scope.model.idpenduduk = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
        $scope.model.data.idpenduduksuami = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
        $scope.model.data.idpendudukistri = angular.copy($scope.model.data.idpendudukistri.idpenduduk);
        $scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            if ($scope.tab.tambah) {
                $scope.model.SetButtonPrint = true;
                $scope.model.idpermohonan = param.idpermohonan;
                $scope.Datas.push(angular.copy($scope.model));
                $scope.tab.show('list');
                $scope.Init();
                message.info("Berhasil Menyimpan");
            } else {
                message.info("Berhasil Mengubah");
                $scope.Init();
                $scope.tab.show('list');
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
                $scope.Print(id, item)
            }, 1300);
        })

    }
    $scope.Print = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        PendudukService.getById(item.idpenduduk, true).then(param => {
            PejabatService.getById(item.idpejabat).then(datapejabat => {
                $scope.dataPrint = param;
                $scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.tanggallahir)));
                $scope.dataPrint.tampiltanggalsurat = getTanggalIndonesia(new Date(item.persetujuan[item.persetujuan.length - 1].created));
                $scope.dataPrint.pejabat = datapejabat;
                setTimeout(function () {
                    helperServices.print(id);
                }, 900);
            })

        })
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }

}

function adminsuratketdesaController($http, helperServices, AuthService, $scope, message,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratKetDesa = {};
    $scope.Datas = [];
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
                        $scope.Datas = angular.copy(permohonans);
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
    tabService,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {

    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.ListPenduduk = [];
    $scope.SuratKetDesa = {};
    $scope.Datas = [];
    $scope.TanggalSurat;
    $scope.Jam;
    $scope.model = {};
    $scope.model.data = {};
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
                        $scope.Datas = angular.copy(permohonans);
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

function adminsuratketnikahController($http, helperServices, AuthService, $scope, message, $state,
    tabService, approvedService,
    JenisPermohonanService, PermohonanService, PendudukService, PejabatService) {

    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.dataPejabat = [];
    $scope.ListPenduduk = [];
    $scope.Datas = [];
    $scope.model = {};
    $scope.model.data = {};
    $scope.dataPrint = {};
    $scope.IdJenis;
    $scope.UserRole;

    $scope.Edit = function (data) {
        $scope.model = data;
        $scope.model.data.idpenduduksuami = $scope.ListPenduduk.find(x => x.idpenduduk == angular.copy(data.data.idpenduduksuami));
        $scope.model.data.idpendudukistri = $scope.ListPenduduk.find(x => x.idpenduduk == angular.copy(data.data.idpendudukistri));
        $scope.model.idpejabat = $scope.dataPejabat.find(x => x.idpejabat == angular.copy(data.idpejabat));
        $scope.tab.show('edit');
    }
    $scope.Batal = function () {
        $scope.tab.show('list');
        $scope.model = {};
        $scope.model.data = {};
        $scope.Init();
    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x => x.status == 1);
                    $scope.model.idpejabat = $scope.dataPejabat.find(x => x.namajabatan == "Lurah");
                    JenisPermohonanService.getByJenis("Keterangan Nikah").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            approvedService.approvedView(param, $scope.UserRole);
                            $scope.Datas = angular.copy(param);
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
        if ($scope.tab.tambah) {
            Method = "post";
            var today = new Date();
            $scope.model.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        } else {
            Method = "put";
        }
        // $scope.model.data.pejabat = $scope.model.pejabat
        $scope.model.idpenduduk = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
        $scope.model.data.idpenduduksuami = angular.copy($scope.model.data.idpenduduksuami.idpenduduk);
        $scope.model.data.idpendudukistri = angular.copy($scope.model.data.idpendudukistri.idpenduduk);
        $scope.model.idpejabat = angular.copy($scope.model.idpejabat.idpejabat);
        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            if ($scope.tab.tambah) {
                $scope.model.SetButtonPrint = true;
                $scope.model.idpermohonan = param.idpermohonan;
                $scope.Datas.push(angular.copy($scope.model));
                $scope.tab.show('list');
                $scope.Init();
                message.info("Berhasil Menyimpan");
            } else {
                message.info("Berhasil Mengubah");
                $scope.Init();
                $scope.tab.show('list');
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
                $scope.Print(id, item)
            }, 1300);
        })

    }
    $scope.Print = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        PendudukService.getById(item.idpenduduk, true).then(param => {
            PejabatService.getById(item.idpejabat).then(datapejabat => {
                $scope.dataPrint = param;
                $scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.tanggallahir)));
                $scope.dataPrint.tampiltanggalsurat = getTanggalIndonesia(new Date(item.persetujuan[item.persetujuan.length - 1].created));
                $scope.dataPrint.pejabat = datapejabat;
                setTimeout(function () {
                    helperServices.print(id);
                }, 900);
            })

        })
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}

function adminsuratketusahaController() {

}

function adminsuratpenguasaantanahController() {

}

function adminsuratskckController() {

}

function adminsuratketdomisiliController(
    $http, helperServices, AuthService, $scope,
    PejabatService, PendudukService, JenisPermohonanService, PermohonanService,
    approvedService, $scope, message, tabService) {
    $scope.tab = tabService.createTab();
    $scope.ItemPenduduk = "";
    $scope.dataPejabat = [];
    $scope.ListPenduduk = [];
    $scope.Datas = [];
    $scope.model = {};
    $scope.model.data = {};
    $scope.model.data.pejabat = {};
    $scope.dataPrint = {};
    $scope.IdJenis;
    $scope.UserRole;

    $scope.Edit = function (data) {
        $scope.model = data;
        PendudukService.getById(data.idpenduduk).then(penduduk => {
            $scope.model.idpenduduk = penduduk;
            $scope.tab.show('edit');
        })

    }
    $scope.Init = function () {
        AuthService.profile().then(param => {
            $scope.UserRole = param.rolename;
            PendudukService.get().then(penduduk => {
                $scope.ListPenduduk = penduduk;
                PejabatService.get().then(pejabat => {
                    $scope.dataPejabat = pejabat.filter(x => x.status == 1);
                    $scope.model.data.pejabat = $scope.dataPejabat.find(x => x.namajabatan == "Lurah");
                    JenisPermohonanService.getByJenis("Keterangan Domisili").then(jenis => {
                        $scope.model.idjenispermohonan = jenis.idjenispermohonan;
                        PermohonanService.getByJenis(jenis.idjenispermohonan).then(param => {
                            approvedService.approvedView(param, $scope.UserRole);
                            $scope.Datas = angular.copy(param);
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
        if ($scope.tab.tambah) {
            Method = "post";
        } else {
            Method = "put";
        }
        var today = new Date();
        $scope.model.tanggalpengajuan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // $scope.model.data.pejabat = $scope.model.pejabat
        $scope.model.idpenduduk = angular.copy($scope.model.idpenduduk.idpenduduk)

        $http({
            method: Method,
            url: helperServices.url + "/api/permohonan",
            headers: AuthService.getHeader(),
            data: $scope.model
        }).then(param => {
            if ($scope.tab.tambah) {
                $scope.model.SetButtonPrint = true;
                $scope.model.idpermohonan = param.idpermohonan;
                $scope.Datas.push(angular.copy($scope.model));
                $scope.tab.show('list');
                $scope.Init();
                message.info("Berhasil Menyimpan");
            } else {
                message.info("Berhasil Mengubah");
                $scope.Init();
                $scope.TabList = true;
                $scope.TabTambah = false;
                $scope.TabEdit = false;
                $scope.TabApproved = false;
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
    $scope.Print = function (id, item) {
        $scope.dataPrint = angular.copy(item);
        PendudukService.getById(item.idpenduduk).then(param => {
            $scope.dataPrint.penduduk = param.data;
            $scope.dataPrint.tampiltanggallahir = getTanggalIndonesia(new Date(angular.copy(param.data.tanggallahir)));
            $scope.dataPrint.tampiltanggalsurat = getTanggalIndonesia(new Date(item.persetujuan[item.persetujuan.length - 1].created));

            setTimeout(function () {
                helperServices.print(id);
            }, 1300);
        })
    }
    $scope.Setujui = function (item) {
        $state.go('approved-surattidakmampu', {
            id: item.idpermohonan
        })
    }
}