const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');
const config = require('../auth/config');
const fcm = require('../notification');
const validasi = require('../validasi');

router.get('/', [authJwt.verifyToken], async (req, res) => {
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
router.post('/', [authJwt.verifyToken], async (req, res) => {
    try {
        const params = req.body;
        var resultValidate = await (await validasi.validate(params));
        if (resultValidate.valid)
            contextDb.Permohonan.post(params).then(async (data) => {
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
                    var device = contextDb.Users.getUserByEmail(req.User.email);
                    if (device && device.devicetoken) {
                        fcm.sendToDevice(device.devicetoken, data1);
                    }
                    var activeUsers = await contextDb.Users.getUserPejabatAktif();
                    activeUsers.forEach(async (element) => {
                        if (element.role == "admin") {
                            message.idusers = element.idusers;
                            message.message = "Permohonan Baru Dibuat"
                            let item = await contextDb.Inbox.post(message);
                            device = contextDb.Users.getUserByEmail(req.User.email);
                            if (device && device.devicetoken) {
                                fcm.sendToDevice(device.devicetoken, item);
                            }
                        }
                    });

                    res.status(200).json(data);
                },
                (err) => {
                    res.status(400).json({
                        message: err.message
                    });
                });
        else {
            res.status(400).json({
                message: resultValidate.message
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.put('/', [authJwt.verifyToken], async (req, res) => {
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

router.delete('/:id', [authJwt.verifyToken], async (req, res) => {
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

router.get('/:id', [authJwt.verifyToken], async (req, res) => {
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

router.get('/byjenis/:id', [authJwt.verifyToken], async (req, res) => {
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


                    var device = await contextDb.Users.getUserUserId(req.User.userid);
                    if (device && device.devicetoken) {
                        fcm.sendToDevice(device.devicetoken, item);
                    }
                    var resultData = await contextDb.Permohonan.put(permohonan);
                    res.status(200).json(true);
                }
            } else {
                var activeUsers = await contextDb.Users.getUserPejabatAktif();
                var nexRole = config.Roles[indexOfRole + 1];
                activeUsers.forEach(async (element) => {
                    if (element.role == nexRole) {
                        var message = {
                            idusers: element.idusers,
                            data: {
                                from: req.User.username,
                                iddata: permohonan.idpermohonan,
                                to: nexRole
                            },
                            message: "Permohonan Baru Saja Disetujui, Mohon untuk diproses !",
                            read: false,
                            created: new Date()
                        }
                        permohonan.status = "disetujui";
                        let item = await contextDb.Inbox.post(message);
                        var device = await contextDb.Users.getUserUserId(element.idusers);
                        if (device && device.devicetoken) {
                            fcm.sendToDevice(device.devicetoken, item);
                        }

                        var resultData = await contextDb.Permohonan.put(permohonan);
                        res.status(200).json(true);
                    }
                });
            }

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

                    var device = contextDb.Users.getUserUserId(element.idusers);
                    if (device && device.devicetoken) {
                        fcm.sendToDevice(device.devicetoken, item);
                    }
                    item.message = "Permohonan Anda Di kembalikan ke " + frxRole;
                    if (permohonan.idusers) {
                        device = contextDb.Users.getUserUserId(permohonan.idusers);
                        fcm.sendToDevice(device.devicetoken, item);
                    }
                    var resultData = await contextDb.Permohonan.put(permohonan);
                    res.status(200).json(true);
                }
            });

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
            res.status(200).json(true);

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

                if (permohonan.idusers) {
                    device = contextDb.Users.getUserUserId(permohonan.idusers);
                    fcm.sendToDevice(device.devicetoken, item);
                }
            }
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

module.exports = router;