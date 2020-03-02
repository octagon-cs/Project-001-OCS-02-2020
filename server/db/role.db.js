const pool = require("./dbconnection");

const model = {};

model.get = () => {
    return new Promise((resolve, reject) => {
        return resolve(["pemohon", "admin", "kasi", "seklur", "lurah"]);
    });
};


module.exports = model;