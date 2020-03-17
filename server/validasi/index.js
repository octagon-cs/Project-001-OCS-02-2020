var fn = {};
var db = require("../db");


fn.validate = async (data) => {
    try {
        var param = await db.JenisPermohonan.getById(data.idjenispermohonan)
        if (param.jenis) {
            switch (param.jenis) {
                case "Pengantar KTP":
                    return pengantarKTP(data);

                case "Pengantar KK":
                    return IdPenduduk(data);

                case "Tidak Mampu":
                    return tidakMampu(data);

                case "Keterangan Domisili":
                    return IdPenduduk(data);

                case "Keterangan SKCK":
                    return IdPenduduk(data);

                case "Keterangan Usaha":
                    return IdPenduduk(data);

                case "Penguasaan Tanah":
                    return IdPenduduk(data);

                case "Keterangan Desa":
                    return IdPenduduk(data);

                case "Keterangan Cerai":
                    return await cerai(data);

                case "Keterangan eKTP":
                    return IdPenduduk(data);

                case "Keterangan Nikah":
                    return IdPenduduk(data);

                case "Kelahiran":
                    return await kelahiran(data);

                case "Sudah Menikah":
                    return IdPenduduk(data);

                case "Belum Menikah":
                    return IdPenduduk(data);

                case "Kematian":
                    return IdPenduduk(data);

                case "Keterangan Lainnya":
                    return IdPenduduk(data);

                case "Pindah":
                    return IdPenduduk(data);

                default:
                    return IdPenduduk(data);
            }
        } {
            return validate(false, "Jenis data Required");
        }
    } catch (error) {
        return validate(false, err.message);
    }

}

cerai = async (data) => {
    try {
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
    } catch (error) {
        return validate(true, error.message);
    }
}


tidakMampu = async (data) => {
    try {
        if (!data.idpenduduk)
            return validate(false, "Data Penduduk Tidak Boleh Kosong");

        return validate(true, null)
    } catch (error) {
        return validate(true, error.message);
    }
}

kelahiran = async (item) => {
    try {
        if (!item.idpenduduk)
            return validate(false, "Data Pemohon Tidak Boleh Kosong");
        if (!item.data.tanggallahir)
            return validate(false, "Tanggal Lahir Tidak Boleh Kosong");
        if (!item.data.tempatlahir)
            return validate(false, "Tempat Lahir Tidak Boleh Kosong");
        if (!item.data.namaanak)
            return validate(false, "Nama Anak Tidak Boleh Kosong");
        if (!item.data.jeniskelamin)
            return validate(false, "Jenis Kelamin Tidak Boleh Kosong");
        if (!item.data.idayah)
            return validate(false, "Ayah Tidak Boleh Kosong");
        if (!item.data.idibu)
            return validate(false, "Ayah Tidak Boleh Kosong");
        return validate(true, null)
    } catch (error) {
        return validate(true, error.message);
    }
}


pengantarKTP = async (item) => {
    try {
        return validate(true, null)
    } catch (error) {
        return validate(true, error.message);
    }
}



IdPenduduk = async (item) => {
    try {
        if (!item.idpenduduk)
            return validate(false, "Data Pemohon Tidak Boleh Kosong");
        return validate(true, null)
    } catch (error) {
        return validate(true, error.message);
    }
}

function validate(valid, message) {
    return {
        valid: valid,
        message: message
    };
}



module.exports = fn;