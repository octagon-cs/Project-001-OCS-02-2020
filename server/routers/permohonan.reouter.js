module.exports = function (socket) {
    const express = require('express');
    const router = express.Router();
    const contextDb = require('../db');
    const authJwt = require('../auth/verifyToken');
    const permit = require('../auth/permission');

    router.get('/', async (req, res) => {
        try {
            contextDb.Permohonan.get().then(data => {
                res.status(200).json(data);
            });;

        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });

    router.get('/:id', async (req, res) => {
        var id = req.params.id;
        try {
            contextDb.Permohonan.getById(id).then(data => {
                res.status(200).json(data);
            });;

        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });

    router.post('/', [authJwt.verifyToken], async (req, res) => {
        try {
            const user = req.body;
            contextDb.Permohonan.post(user).then(async (data) => {
                    //send notification to penduduk



                    var message = {
                        idusers: req.User.userid,
                        data: {
                            from: req.User.email,
                            iddata: data.idpermohonan
                        },
                        message: "Permohonan Anda Telah Dibuat !",
                        read: false,
                        created: new Date()
                    }
                    let data1 = await contextDb.Inbox.post(message);

                    socket.CreatePermohonan(req.User.username, data1);

                    var activeUsers = await contextDb.Users.getUserPejabatAktif();
                    activeUsers.forEach(async (element) => {
                        if (element.role == "admin") {
                            message.idusers = element.idusers;
                            message.message = "Permohonan Baru Dibuat"
                            let item = await contextDb.Inbox.post(message);
                            socket.CreatePermohonan(element.username, data);
                        }
                    });

                    res.status(200).json(data);
                },
                (err) => {
                    res.status(400).json({
                        message: err.message
                    });
                });
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });

    router.put('/', async (req, res) => {
        try {
            const user = req.body;
            contextDb.Permohonan.put(user).then(
                (data) => {
                    res.status(200).json(data);
                },
                (err) => {
                    res.status(400).json({
                        message: err.message
                    });
                }
            );
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });



    router.delete('/:id', async (req, res) => {
        var id = req.params.id;
        try {
            const user = req.body;
            contextDb.Permohonan.delete(id).then(
                (data) => {
                    res.status(200).json(data);
                },
                (err) => {
                    res.status(400).json({
                        message: err.message
                    });
                }
            );
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });

    return router;
}