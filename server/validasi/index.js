var fn = {};
var db = require("../db");


fn.validate = async (data) => {
    try {
        var param = await db.JenisPermohonan.getById(data.idjenispermohonan)
        if (param.jenis) {

            switch (param.jenis) {
                case "Pengantar KTP":
                    return validate(true, null);
                case "Pengantar KK":
                    return validate(true, null);
                case "Tidak Mampu":
                    return tidakMampu(data);
                case "Keterangan Domisili":
                    return validate(true, null);
                case "Keterangan SKCK":
                    return validate(true, null);
                case "Keterangan Usaha":
                    return validate(true, null);
                case "Penguasaan Tanah":
                    return validate(true, null);
                case "Keterangan Desa":
                    return validate(true, null);
                case "Keterangan Cerai":
                    return await cerai(data);
                case "Keterangan eKTP":
                    return validate(true, null);
                case "Keterangan Nikah":
                    return validate(true, null);
                case "Kelahiran":
                    return await kelahiran(data);
                    return validate(true, null);
                case "Sudah Menikah":
                    return validate(true, null);
                case "Belum Menikah":
                    return validate(true, null);
                case "Kematian":
                    return validate(true, null);
                case "Keterangan Lainnya":
                    return validate(true, null);
                case "Pindah":
                    return validate(true, null);
                default:
                    return validate(true, null);
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

    var istri = await db.Penduduk.getById(data.data.idpenduduk)
    if (!istri)
        return validate(false, "Data Istri Tidak Ditemukan");

    if (!data.data.keterangan)
        return validate(false, "Keterangan Tidak Boleh Kosong");
    data.data.suami = suami;
    data.data.istri = istri;
    return validate(true, null)
}


tidakMampu = async (data) => {
    if (!data.idpenduduk)
        return validate(false, "Data Penduduk Tidak Boleh Kosong");

    return validate(true, null)
}

kelahiran = async (item) => {
    if (!item.idpenduduk)
        return validate(false, "Data Pemohon Tidak Boleh Kosong");
    if (item.data.tanggallahir)
        return validate(false, "Tanggal Lahir Tidak Boleh Kosong");
    if (item.data.tempatlahir)
        return validate(false, "Tempat Lahir Tidak Boleh Kosong");
    if (item.data.namaanak)
        return validate(false, "Nama Anak Tidak Boleh Kosong");
    if (item.data.jeniskelamin)
        return validate(false, "Jenis Kelamin Tidak Boleh Kosong");
    if (item.data.idayah)
        return validate(false, "Ayah Tidak Boleh Kosong");
    if (item.data.idayah)
        return validate(false, "Ayah Tidak Boleh Kosong");

    if (item.idayah)



        return validate(true, null)
}

function validate(valid, message) {
    return {
        valid: valid,
        message: message
    };
}



module.exports = fn;