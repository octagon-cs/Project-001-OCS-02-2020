const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', [authJwt.verifyToken], async (req, res) => {

    try {
        contextDb.Inbox.get(req.User.userid).then(data => {
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
        contextDb.Inbox.getById(id).then(data => {
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
        const data = req.body;
        contextDb.Inbox.post(req.User.userid, data).then(
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

router.put('/', [authJwt.verifyToken], async (req, res) => {
    try {
        const data = req.body;
        contextDb.Inbox.read(data).then(
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
        contextDb.Inbox.delete(id).then(
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


router.delete('/', [authJwt.verifyToken], async (req, res) => {
    try {
        const data = req.body;
        contextDb.Inbox.deleteMany(data).then(
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




module.exports = router;