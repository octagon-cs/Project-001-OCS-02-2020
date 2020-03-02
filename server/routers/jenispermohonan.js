const express = require('express');
const router = express.Router();
const contextDb = require('../db');
const authJwt = require('../auth/verifyToken');
const permit = require('../auth/permission');

router.get('/', async (req, res) => {
    try {
        contextDb.JenisPermohonan.get().then(data => {
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
        contextDb.JenisPermohonan.getById(id).then(data => {
            res.status(200).json(data);
        });;

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        contextDb.JenisPermohonan.post(user).then(
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

router.put('/', async (req, res) => {
    try {
        const user = req.body;
        contextDb.JenisPermohonan.put(user).then(
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
        contextDb.JenisPermohonan.delete(id).then(
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