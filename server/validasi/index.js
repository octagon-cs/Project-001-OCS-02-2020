var fn = {};
var db = require("../db");


fn.validate = async (data) => {
    try {
        var param = await db.JenisPermohonan.getById(data.idjenispermohonan)
        if (param.jenis) {

            switch (param.jenis) {
                case "Pengantar KTP":
                    break;
                case "Pengantar KK":
                    break;
                case "Tidak Mampu":
                    return TidakMampu(data);
                case "Keterangan Domisili":
                    break;
                case "Keterangan SKCK":
                    break;
                case "Keterangan Usaha":
                    break;
                case "Penguasaan Tanah":
                    break;
                case "Keterangan Desa":
                    break;
                case "Keterangan Cerai":
                    return await cerai(data);
                case "Keterangan eKTP":
                    break;
                case "Keterangan Nikah":
                    break;
                case "Kelahiran":
                    break;
                case "Sudah Menikah":
                    break;
                case "Belum Menikah":
                    break;
                case "Kematian":
                    break;
                case "Keterangan Lainnya":
                    break;
                case "Pindah":
                    break;
                default:
                    break;
            }
        } {
            return validate(false, "Jenis data Required");
        }
    } catch (error) {
        return validate(false, err.message);
    }

}

cerai = async (data) => {

    var suami = await db.Penduduk.getById(data.idpenduduk);
    if (!suami)
        return validate(false, "Data Suami Tidak Ditemukan");

    var istri = await db.Penduduk.getById(data.data.idistri)
    if (!istri)
        return validate(false, "Data Istri Tidak Ditemukan");

    if (!data.data.keterangan)
        return validate(false, "Keterangan Tidak Boleh Kosong");
    data.data.suami = suami;
    data.data.istri = istri;
    return validate(true, null)
}


TidakMampu = async (data) => {
    var suami = await db.Penduduk.getByNIK(data.nik);
    if (!suami)
        return validate(false, "Data Suami Tida: break; Ditemukan");

    var istri = db.Penduduk.getByNIK(data)
    if (!istri)
        return validate(false, "Data Istri Tida: break; Ditemukan");
}



function validate(valid, message) {
    return {
        valid: valid,
        message: message
    };
}



module.exports = fn;