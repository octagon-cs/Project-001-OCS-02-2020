const express = require('express');
const router = express.Router();
const contextDb = require('../db');

router.get('/dashboard', async (req, res) => {
	try {
		var data = await contextDb.Dashboard.getDasboard();
		res.status(200).json(data);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

module.exports = router;
