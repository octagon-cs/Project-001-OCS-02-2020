module.exports = function (socket) {
    const express = require('express');
    const router = express.Router();
    const contextDb = require('../db');
    const authJwt = require('../auth/verifyToken');
    const permit = require('../auth/permission');
    const config = require('../auth/config');
    const fcm = require('../notification/fcm')

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

    router.get('/mine', [authJwt.verifyToken], async (req, res) => {

        try {
            contextDb.Permohonan.getMyPermohonan(req.User.userid).then(data => {
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

    router.get('/byjenis/:id', async (req, res) => {
        var id = req.params.id;
        try {
            contextDb.Permohonan.getByJenis(id).then(data => {
                res.status(200).json(data);
            });;

        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });

    router.get('/approve/:id', [authJwt.verifyToken], async (req, res) => {
        var id = req.params.id;
        try {
            var role = req.User.roles[0];
            var indexOfRole = config.Roles.indexOf(role);
            var permohonan = await contextDb.Permohonan.getById(id);

            if (permohonan) {
                var persetujuan = {
                    created: new Date(),
                    status: "disetujui",
                    message: "",
                    idusers: req.User.idusers,
                    read: false,
                    data: {
                        from: req.User.email,
                        iddata: permohonan.idpermohonan,
                        to: role
                    }
                }

                if (indexOfRole === config.Roles.length - 1) {
                    persetujuan.status = "selesai";
                    permohonan.status = "selesai";
                }

                if (permohonan.persetujuan) {
                    permohonan.persetujuan.push(persetujuan);
                } else {
                    permohonan.persetujuan = [persetujuan];
                }

                var penduduk = await contextDb.Penduduk.getById(permohonan.idpenduduk);

                var activeUsers = await contextDb.Users.getUserPejabatAktif();

                if (resultData && persetujuan.status == "selesai") {
                    if (permohonan.idusers) {
                        persetujuan.message = "Permohonan Anda Telah Disetujui Oleh Lurah, Silahkan Anda Mengambilnya di Kantor Lurah Waena"
                        var message = {
                            idusers: req.idusers,
                            data: {
                                from: req.User.email,
                                iddata: permohonan.idpermohonan,
                                to: "pemohon"
                            },
                            message: "Permohonan Baru Saja Disetujui, Mohon untuk diproses !",
                            read: false,
                            created: new Date()
                        }

                        let item = await contextDb.Inbox.post(message);
                        fcm.sendToDevice(penduduk.device, item);
                        socket.CreatePermohonan(element.username, item);
                    }
                } else {
                    var nexRole = config.Roles[indexOfRole + 1];
                    activeUsers.forEach(async (element) => {
                        if (element.role == nexRole) {
                            var message = {
                                idusers: element.idusers,
                                data: {
                                    from: req.User.email,
                                    iddata: permohonan.idpermohonan,
                                    to: nexRole
                                },
                                message: "Permohonan Baru Saja Disetujui, Mohon untuk diproses !",
                                read: false,
                                created: new Date()
                            }
                            permohonan.status = "disetujui";
                            let item = await contextDb.Inbox.post(message);
                            fcm.sendToDevice(penduduk.device, item);
                            socket.CreatePermohonan(element.username, item);
                        }
                    });
                }
                var resultData = await contextDb.Permohonan.put(permohonan);
                res.status(200).json(true);
            } else {
                res.status(400).json({
                    message: "data permohonan tidak ditemukan"
                });
            }
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });

    router.post('/back', [authJwt.verifyToken], async (req, res) => {
        var id = req.params.id;
        var data = req.body;
        try {
            var role = req.User.roles[0];
            var indexOfRole = config.Roles.indexOf(role);
            var permohonan = await contextDb.Permohonan.getById(data.id);
            if (permohonan) {
                var persetujuan = {
                    created: new Date(),
                    status: "dikembalikan",
                    message: data.message,
                    idusers: req.User.idusers,
                    read: false,
                    data: {
                        from: req.User.email,
                        iddata: permohonan.idpermohonan,
                        to: role
                    }
                }
                if (data.message) {
                    permohonan.message = data.message;
                }

                if (permohonan.persetujuan) {
                    permohonan.persetujuan.push(persetujuan);
                } else {
                    permohonan.persetujuan = [persetujuan];
                }

                var activeUsers = await contextDb.Users.getUserPejabatAktif();
                var frxRole = config.Roles[indexOfRole - 1];
                activeUsers.forEach(async (element) => {
                    if (element.role == frxRole) {
                        var message = {
                            idusers: element.idusers,
                            data: {
                                from: req.User.email,
                                iddata: data.id,
                                to: frxRole
                            },
                            message: "Permohonan Dikembalikan, Mohon untuk diperksa kembali !",
                            read: false,
                            created: new Date()
                        }

                        let item = await contextDb.Inbox.post(message);

                        socket.CreatePermohonan(element.username, item);
                        item.message = "Permohonan Anda Di kembalikan ke " + frxRole;
                        fcm.sendToDevice(penduduk.device, item);
                    }
                });
                var resultData = await contextDb.Permohonan.put(permohonan);
                res.status(200).json(true);
            } else {
                res.status(400).json({
                    message: "data permohonan tidak ditemukan"
                });
            }
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });


    router.post('/reject/:id', [authJwt.verifyToken], async (req, res) => {
        var id = req.params.id;
        var rejectData = req.body;
        try {
            var role = req.User.roles[0];
            var indexOfRole = config.Roles.indexOf(role);
            var permohonan = await contextDb.Permohonan.getById(id);
            if (permohonan) {
                var persetujuan = {
                    created: new Date(),
                    status: "ditolak",
                    message: rejectData.message,
                    idusers: req.User.idusers,
                    read: false,
                    data: {
                        from: req.User.email,
                        iddata: permohonan.idpermohonan,
                        to: "pemohon"
                    }
                }

                if (permohonan.persetujuan) {
                    permohonan.persetujuan.push(persetujuan);
                } else {
                    permohonan.persetujuan = [persetujuan];
                }

                var resultData = await contextDb.Permohonan.put(permohonan);
                if (resultData && persetujuan.status == "ditolak") {
                    var message = {
                        idusers: element.idusers,
                        data: {
                            from: req.User.email,
                            iddata: data.id,
                            to: "pemohon"
                        },
                        message: rejectData.message,
                        read: false,
                        created: new Date()
                    }
                    let item = await contextDb.Inbox.post(message);

                    socket.CreatePermohonan(element.username, item);
                    item.message = rejectData.message
                    fcm.sendToDevice(penduduk.device, item);
                }
                res.status(200).json(true);
            } else {
                res.status(400).json({
                    message: "data permohonan tidak ditemukan"
                });
            }
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    });

    router.post('/', [authJwt.verifyToken], async (req, res) => {
        try {
            const params = req.body;
            contextDb.Permohonan.post(params).then(async (data) => {
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
                            socket.CreatePermohonan(element.username, item);
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