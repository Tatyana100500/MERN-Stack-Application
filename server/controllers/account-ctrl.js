const Account = require('../models/account-model')
const jwt = require('jsonwebtoken')
const accessTokenSecret = 'youraccesstokensecret';
createAccount = (req, res) => {
    const body = req.body
	console.log(body, '$$$$$$$$$$')
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a account',
        })
    }

    const account = new Account(body)
	console.log(account, '$$$$$$$$$$')

    if (!account) {
        return res.status(400).json({ success: false, error: err })
    }

    account
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: account._id,
                message: 'Account created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Account not created!',
            })
        })
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
	console.log(req.params.id, '$$$$$$$$$$!!!!!!!!!!!')
	Account.findOne({ name, password }, (err, account) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!account) {
            return res
                .status(404)
                .json({ success: false, error: `Account not found` })
        }
		if (account.name === name && account.password === password) {
			const accessToken = jwt.sign({ name: account.name,  password: account.password}, accessTokenSecret);
			return res.status(200).json({ success: true, data: account, token: accessToken })
		} else {
			return res
			.status(401)
			.json({ success: false, error: 'Username or password incorrect' })
		}
    }).catch(err => console.log(err))
}

updateAccount = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Account.findOne({ _id: req.params.id }, (err, account) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Account not found!',
            })
        }
        account.name = body.name
        account.password = body.password
        account.photo = body.photo
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

deleteAccount = async (req, res) => {
    await Account.findOneAndDelete({ _id: req.params.id }, (err, account) => {
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
	console.log(res)
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
    deleteAccount,
    getAccountById,
    getAccounts,
}