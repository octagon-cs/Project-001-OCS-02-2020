angular.module('admin.controller', [])
    .controller('adminHomeController', adminHomeController)
    .controller('admindatakepaladesaController', admindatakepaladesaController)
    .controller('admindataumumdesaController', admindataumumdesaController)
    .controller('adminsuratpengantarkkController', adminsuratpengantarkkController)
    .controller('admindatapendudukController', admindatapendudukController)
    .controller('adminsuratpengantarktpController', adminsuratpengantarktpController)
    .controller('adminJabatanController', adminJabatanController)
    .controller('adminpreviewController', adminpreviewController)
    .controller('adminsuratketdomisiliController', adminsuratketdomisiliController)
    .controller('adminsurattidakmampuController', adminsurattidakmampuController)
    .controller('admintambahpermohonanController', admintambahpermohonanController)
    .controller('admininboxController', admininboxController)
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

 function   adminsuratbelummenikahController(){
     
 }
 function   adminsuratketmenikahController(){
     
 }
 function   adminsuratkelahiranController(){
     
 }
 function   adminsuratketceraiController(){
     
 }
 function   adminsuratketdesaController(){
     
 }
 function   adminsuratketektpController(){
     
 }
 function   adminsuratketlainnyaController(){
     
 }
 function   adminsuratketnikahController(){
     
 }
    
function admininboxController(){

}

function adminpejabatController($http, helperServices, AuthService, $scope){
    $scope.DatasPejabat = [];
    $scope.DataJabatan =[];
    $scope.Jabatan={};
    $scope.Pejabat={};
    $scope.ItemJabatan=""
    $scope.NoJabatan = false;
    $scope.SetJabatan="";
    $scope.Agama = helperServices.Agama;
    $scope.PendidikanTerakhir = helperServices.PendidikanTerakhir;
    $scope.SetEmail=false;
    $scope.Init=function(){
        $http({
            method: "get", 
            url: helperServices.url + "/api/pejabat",
            Header: AuthService.getHeader()
        }).then(param=>{
            $scope.DatasPejabat = param.data;
        })

        $http({
            method: "get", 
            url: helperServices.url + "/api/jabatan",
            Header: AuthService.getHeader()
        }).then(param=>{
            $scope.DataJabatan = param.data;
            
        })
    }
    $scope.SelectedJabatan = function(){
        $scope.ItemJabatan = JSON.parse($scope.ItemJabatan);
        if($scope.ItemJabatan.nama=="Lurah" || $scope.ItemJabatan.nama=="Sekertaris Lurah" || $scope.ItemJabatan.nama=="Sekertaris Lurah"){
            $scope.NoJabatan = false;
            $scope.Pejabat.idjabatan = $scope.ItemJabatan.idjabatan;
            $scope.SetEmail = true;
        }else{
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

function adminsuratketusahaController(){
    
}
function adminsuratpenguasaantanahController(){

}
function adminsuratskckController(){

}

function adminpermohonanController() {

}
function admintambahpermohonanController($http, helperServices, AuthService, $scope){
    $scope.Selected;
    $scope.Penduduk = [];
    $http({
        method: "get", 
        url: helperServices.url + "/api/penduduk",
        Header: AuthService.getHeader()
    }).then(param=>{
        $scope.Penduduk = param.data;
    }, error=>{

    })


}

function adminsuratketdomisiliController() {

}

function adminsurattidakmampuController() {

}

function adminpreviewController() {

}

function adminHomeController($http, helperServices, AuthService, $scope) {
    $scope.LuasWilayah = {};
    $scope.Profile = {};
    $scope.Penduduk = {};
    $scope.Pekerjaan = {};
    $scope.Jarak = {};
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

function adminsuratpengantarkkController($http, $scope, helperServices, AuthService) {
    $scope.JenisPermohonan = [];
    $scope.KepemilikanKTP = helperServices.StatusKepemilikanKTP;
    $scope.ShowTable = false;
    $scope.InputPermohonan;
    $scope.JenisPermohonan;
    $scope.Init = function () {
        $http({
            method: 'get',
            url: helperServices.url + "/api/jenispermohonan",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.JenisPermohonan = param.data;

        }, error => {

        })
    }
    $scope.SelectedPermohonan = function () {
        $scope.ShowTable = true;
        var a = $scope.JenisPermohonan;
    }

    $scope.Simpan = function () {
        $http({
            method: 'post',
            url: helperServices.url + "/api/jenispermohonan",
            Header: AuthService.getHeader(),
            data: $scope.InputPermohonan
        }).then(param => {
            alert("Berhasil Menyimpan");
        }, error => {
            alert(error.message)
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
    $scope.JenisKelamin=helperServices.JenisKelamin;
    $scope.BacaHuruf=helperServices.BacaHuruf;
    $scope.Kewarganegawaan=helperServices.Kewarganegawaan;
    $scope.StatusTT=helperServices.StatusTT
    $scope.StatusSosial=helperServices.StatusSosial
    $scope.StatusKIS = helperServices.StatusKIS;
    $scope.StatusKIP = helperServices.StatusKIP
    $scope.StatusKK = helperServices.StatusKK;
    $scope.StatusKeluarga= helperServices.StatusKeluarga;
    $scope.DataInput={};
    $scope.Pekerjaan = helperServices.Pekerjaan;
    $scope.Penduduk={};
    $scope.PendidikanTerakhir=helperServices.PendidikanTerakhir
    $scope.GolonganDarah = helperServices.GolonganDarah;
    $scope.StatusPerkawinan= helperServices.StatusPerkawinan;
    $scope.Penduduk = {};
    $scope.edit = false;
    $scope.view = false;
    $scope.Init = function(){
        $http({
            method: 'get',
            url: helperServices.url + "/api/penduduk",
            Header: AuthService.getHeader()
        }).then(param => {
            $scope.DataPenduduk = param.data;
        }, error => {

        })
    }
    $scope.SelectedItemPenduduk = function(item, set){
        $scope.Penduduk = item;
        if(set=="edit"){
            $scope.edit=true;
            $scope.view=false;
        }else{
            $scope.edit=false;
            $scope.view=true;
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