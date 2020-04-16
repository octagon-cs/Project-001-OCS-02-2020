function getTanggalIndonesia(params) {
var bulan = ["Januari", "Februari", "Maret", "April" ,"Mei","Juni","Juli","Agustus","September","Oktober","November","Desember",];
var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis" ,"Jum'at","Sabtu"];


hari = hari[params.getDay()];
bulan = bulan[params.getMonth()];
var result = params.getDate()+" " + bulan + " " +params.getFullYear();

return result; 

    
}

function GetHariIndonesia(params) {
    var bulan = ["Januari", "Februari", "Maret", "April" ,"Mei","Juni","Juli","Agustus","September","Oktober","November","Desember",];
    var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis" ,"Jum'at","Sabtu"];


    hari = hari[params.getDay()];
    bulan = bulan[params.getMonth()];
    var result =hari+", " + params.getDate()+" " + bulan + " " +params.getFullYear();

    return hari; 
}
