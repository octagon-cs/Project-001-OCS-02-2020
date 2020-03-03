angular.module('admin.controller',[])
.controller('adminHomeController', adminHomeController)
.controller('admindatakepaladesaController', admindatakepaladesaController)
.controller('admindataumumdesaController', admindataumumdesaController)
.controller('adminsuratpengantarkkController', adminsuratpengantarkkController)
.controller('admindatapendudukController', admindatapendudukController)
.controller('admininputdatapendudukController', admininputdatapendudukController)
.controller('adminsuratpengantarktpController', adminsuratpengantarktpController);

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
function adminsuratpengantarkkController() {
    
}
function adminsuratpengantarktpController(){

}
function admindatapendudukController(){
    
}
function admininputdatapendudukController(){
    
}