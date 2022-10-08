const express = require('express');
const router = express.Router()
const { createOrUpdateUser } = require('../controllers/auth')

// middleware
const { authCheck } = require('../middlewares/auth')

router.post('/create-or-update-user', authCheck, createOrUpdateUser)

module.exports = router
