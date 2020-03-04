const pool = require('./dbconnection');
const inbox = {};

inbox.get = async (userid) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			inbox where idusers=? `,
            [userid],
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    result.forEach(element => {
                        element.data = JSON.parse(element.data)
                    });
                    resolve(result);
                }
            }
        );
    });
};

inbox.getById = async (Id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT *
		  FROM
			inbox where idinbox=? `,
            [Id],
            (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    result.forEach(element => {
                        element.data = JSON.parse(element.data)
                    });
                    resolve(result[0]);
                }
            }
        );
    });
};


inbox.post = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                `insert into inbox(idusers, message, data, readed, created) values(?,?,?,?,?);`,
                [data.idusers, data.message, JSON.stringify(data.data), data.read, data.created],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        data.idinbox = result.insertId;
                        resolve(data);
                    }
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};

inbox.read = async (message) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(
                'update inbox set read=? where idinbox=? ',
                [message.idinbox],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(true);
                    }
                }
            );
        } catch (err) {
            return reject(err);
        }
    });
};

inbox.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query('delete from inbox where idinbox=? ', [id], (err, result) => {
                if (err) {
                    return reject(err);
                } else
                    resolve(true);
            });
        } catch (err) {
            return reject(err);
        }
    });
};

module.exports = inbox;