var fn = {};
var db = require("../db");

fn.cerai = async () => {
    var suami = await db.Penduduk.getByNIK(permohonan.nik);
    if (!suami)
        return validate(false, "Data Suami Tidak Ditemukan");

    var istri = db.Penduduk.getByNIK(permohonan)
    if (!istri)
        return validate(false, "Data Istri Tidak Ditemukan");
}



function validate(valid, message) {
    return {
        valid: valid,
        message: message
    };
}



module.exports = fn;