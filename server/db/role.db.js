const pool = require("./dbconnection");

const model = {};

model.get = () => {
    return new Promise((resolve, reject) => {
        return resolve(["administrator", "admin"]);
    });
};


module.exports = model;