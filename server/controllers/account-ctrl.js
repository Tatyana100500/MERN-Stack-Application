const fs = require('fs');
const Account = require('../models/account-model')
const jwt = require('jsonwebtoken')
const accessTokenSecret = 'youraccesstokensecret';

createAccount = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a account',
    })
  }
  const tmp_path = req.file.path;
  const target_path = 'upload/' + req.file.originalname;
  const src = fs.createReadStream(tmp_path);
  const dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  const account = new Account({...body, 'photo': req.file.originalname})
  if (!account) {
    return res.status(400).json({ success: false, error: err })
  }
  account
    .save()
    .then(() => {
	  const accessToken = jwt.sign({ name: account.name,  password: account.password}, accessTokenSecret);
      return res.status(201).json({
        success: true,
        id: account._id,
        message: 'Account created!',
		token: accessToken,
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Account not created!',
      })
    })
}
getCurrentAccount = async (req, res) => {
  const { name, password } = req.body;
  await Account.findOne({ name, password }, (err, account) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!accounts.length) {
      return res.status(404).json({ success: false, error: `Account not found` })
    }
	if (account.name === name && account.password === password) {
      return res.status(200).json({ success: true, data: account })
	}
  }).catch(err => console.log(err))
}

logIn = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a account',
    })
  }
  const { name, password } = req.body;
  Account.findOne({ name, password }, (err, account) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!account) {
      return res.status(404).json({ success: false, error: `Account not found` })
    }
	if (account.name === name && account.password === password) {
	  const accessToken = jwt.sign({ name: account.name,  password: account.password}, accessTokenSecret);
	  return res.status(200).json({ success: true, data: account, token: accessToken })
	} else {
	  return res.status(401).json({ success: false, error: 'Username or password incorrect' })
	}
  }).catch(err => console.log(err))
}

updateAccount = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({ success: false, error: 'You must provide a body to update' })
  }
  Account.findOne({ _id: req.params.id }, (err, account) => {
    if (err) {
      return res.status(404).json({ err, message: 'Account not found!' })
    }
    const tmp_path = req.file.path;
	const target_path = 'upload/' + req.file.originalname;
	const src = fs.createReadStream(tmp_path);
    const dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    account.name = body.name
    account.password = body.password
    account.photo = req.file.originalname
    account
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: account._id,
          message: 'Account updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Account not updated!',
        })
      })
    })
}

getAccountById = async (req, res) => {
  await Account.findOne({ _id: req.params.id }, (err, account) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!account) {
      return res
        .status(404)
        .json({ success: false, error: `Account not found` })
    }
     return res.status(200).json({ success: true, data: account })
  }).catch(err => console.log(err))
}

getAccounts = async (req, res) => {
  await Account.find({}, (err, accounts) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!accounts.length) {
      return res
        .status(404)
        .json({ success: false, error: `Account not found` })
    }
    return res.status(200).json({ success: true, data: accounts })
    }).catch(err => console.log(err))
}

module.exports = {
    createAccount,
	logIn,
    updateAccount,
    getAccountById,
    getAccounts,
	getCurrentAccount,
}