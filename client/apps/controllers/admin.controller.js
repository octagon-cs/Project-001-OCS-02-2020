angular.module('admin.controller',[])
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

;

function adminsuratketdomisiliController(){

}
function adminsurattidakmampuController(){

}
function adminpreviewController(){

}

function adminHomeController($http, helperServices, AuthService, $scope) {
    $scope.LuasWilayah = {};
    $scope.Profile={};
    $scope.Penduduk = {};
    $scope.Pekerjaan = {};
    $scope.Jarak = {};
    $http({
        method: "get",
        url: helperServices.url + "/api/profildesa",
        Header: AuthService.getHeader()
    }).then(response =>{
        response.data.forEach(value =>{
            if(value.nama == 'Luas Wilayah'){
                $scope.LuasWilayah = value;
            }else if(value.nama == 'Profile'){
                $scope.Profile = value;
            }else if(value.nama == 'Pekerjaan'){
                $scope.Pekerjaan = value;
            }else if(value.nama == 'Jarak'){
                $scope.Jarak = value;
            }
        })
    })

    $scope.Simpan = function(item){
        if(item=='Profile'){
            if($scope.Profile.nama == undefined){
                $scope.Profile.nama = 'Profile';
                $scope.Profile.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Profile
                }).then(response=>{
                    alert("Berhasil Simpan");
                },error=>{
                    alert(error.message);
                })
            }
            
        }else if(item=='LuasWilayah'){
            if($scope.LuasWilayah.nama == undefined){
                $scope.LuasWilayah.nama = 'LuasWilayah';
                $scope.LuasWilayah.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.LuasWilayah
                }).then(response=>{
                    alert("Berhasil Simpan");
                },error=>{
                    alert(error.message);
                })
            }
        }else if(item=='LuasWilayah'){
            if($scope.Profile.nama == undefined){
                $scope.Profile.nama = 'LuasWilayah';
                $scope.Profile.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Profile
                }).then(response=>{
                    alert("Berhasil Simpan");
                },error=>{
                    alert(error.message);
                })
            }
        }else if(item=='Pekerjaan'){
            if($scope.Pekerjaan.nama == undefined){
                $scope.Pekerjaan.nama = 'Pekerjaan';
                $scope.Pekerjaan.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Pekerjaan
                }).then(response=>{
                    alert("Berhasil Simpan");
                },error=>{
                    alert(error.message);
                })
            }
        }else if(item=='Jarak'){
            if($scope.Jarak.nama == undefined){
                $scope.Jarak.nama = 'Jarak';
                $scope.Jarak.tahun = new Date().getFullYear();
                $http({
                    method: 'post',
                    url: helperServices.url + "/api/profildesa",
                    Header: AuthService.getHeader(),
                    data: $scope.Jarak
                }).then(response=>{
                    alert("Berhasil Simpan");
                },error=>{
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
    $scope.Init= function(){
        $http({
            method: 'get',
            url: helperServices.url + "/api/jenispermohonan",
            Header: AuthService.getHeader()
        }).then(param=>{
            $scope.JenisPermohonan= param.data;

        },error=>{

        })
    }
    $scope.SelectedPermohonan = function(){
        $scope.ShowTable=true;
        var a = $scope.JenisPermohonan;
    }

    $scope.Simpan = function(){
        $http({
            method: 'post',
            url: helperServices.url + "/api/jenispermohonan",
            Header: AuthService.getHeader(),
            data: $scope.InputPermohonan
        }).then(param=>{
            alert("Berhasil Menyimpan");
        }, error=>{
            alert(error.message)
        })
    }

    $scope.Ubah = function(){
        $http({
            method: 'put',
            url: helperServices.url + "/api/jenispermohonan",
            Header: AuthService.getHeader(),
            data: $scope.InputPermohonan
        }).then(param=>{
            alert("Berhasil Melakukan perubahan");
        }, error=>{
            alert(error.message)
        })
    }

    $scope.Hapus = function(item){
        $http({
            method: 'delete',
            url: helperServices.url + "/api/jenispermohonan/"+item.idjenispermohonan,
            Header: AuthService.getHeader()
        }).then(param=>{
            alert("Data Berhasil Di hapus");
        }, error=>{
            alert(error.message)
        })
    }

}
function adminsuratpengantarktpController(){

}
function admindatapendudukController($scope, $http, helperServices, AuthService){













    $scope.DataPenduduk = [];
    $scope.DataInput={};
    $scope.Init = function(){
        $http({
            method: 'get',
            url: helperServices.url + "/jabatan",
            Header: AuthService.getHeader()
        }).then(param=>{
            $scope.DataPenduduk = param.data;
        }, error=>{

        })
    }
    $scope.Simpan=function(){
        $http({
            method: 'post',
            url: helperServices.url + "/penduduk",
            Header: AuthService.getHeader(),
            data: $scope.DataInput
        }).then(param=>{

        }, error=>{

        })
    }
    $scope.Ubah=function(){
        $http({
            method: 'put',
            url: helperServices.url + "/penduduk",
            Header: AuthService.getHeader(),
            data: $scope.DataInput
        }).then(param=>{

        }, error=>{

        })
    }
    
}
function adminJabatanController($scope, $http, helperServices, AuthService) {
    $scope.DataJabatan = [];
    $scope.DataInput={};
    $scope.Init = function(){
        $http({
            method: 'get',
            url: helperServices.url + "/jabatan",
            Header: AuthService.getHeader()
        }).then(param=>{

        }, error=>{

        })
    }
    $scope.Simpan=function(){
        $http({
            method: 'post',
            url: helperServices.url + "/jabatan",
            Header: AuthService.getHeader(),
            data: $scope.DataInput
        }).then(param=>{

        }, error=>{

        })
    }
    $scope.Ubah=function(){
        $http({
            method: 'put',
            url: helperServices.url + "/jabatan",
            Header: AuthService.getHeader(),
            data: $scope.DataInput
        }).then(param=>{

        }, error=>{

        })
    }
    $scope.Hapus=function(item){
        $http({
            method: 'delete',
            url: helperServices.url + "/jabatan/" + item.idjabatan,
            Header: AuthService.getHeader()
        }).then(param=>{

        }, error=>{

        })
    }
}