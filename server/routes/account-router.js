const express = require('express')

const AccountCtrl = require('../controllers/account-ctrl')

const router = express.Router()

router.post('/', AccountCtrl.createAccount)
router.post('/login', AccountCtrl.logIn)
router.put('/account/:id', AccountCtrl.updateAccount)
router.delete('/account/:id', AccountCtrl.deleteAccount)
router.get('/account/:id', AccountCtrl.getAccountById)
router.get('/people', AccountCtrl.getAccounts)
router.get('/')

module.exports = router