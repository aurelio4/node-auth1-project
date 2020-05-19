const bcrypt = require("bcryptjs")
const router = require("express").Router()
const Auth = require("./auth-model")
const ServerException = require('../errors/ServerException')
const InvalidCredentialsException = require('../errors/InvalidCredentialsException')

const restricted = require('./auth-middleware')

router.get("/", (req, res, next) => {
	res.json({
		auth: "working!",
	})
})

router.get("/users", restricted, async (req, res, next) => {
	try {
		const users = await Auth.find()
		res.status(200).json(users)
	} catch (err) {
		console.error(err)
		next(new ServerException())
	}
})

router.post("/register", async (req, res, next) => {
	try {
		const credentials = req.body
		const rounds = process.env.BCRYPT_ROUNDS || 8

		const hash = bcrypt.hashSync(credentials.password, rounds)
		credentials.password = hash

		const addUser = await Auth.registerUser(credentials)
		req.session.loggedIn = true
		req.session.user = addUser
		res.status(201).json({
			data: addUser
		})
	} catch (err) {
		console.error(err)
		next(new ServerException())
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const {
			username,
			password
		} = req.body
		const loginUser = await Auth.getUserByUsername({
			username
		})
		if (loginUser && bcrypt.compareSync(password, loginUser.password)) {
			// user successfully logged in & we saved info about the client
			req.session.loggedIn = true
			req.session.user = loginUser
			res.status(200).json({
				success: "logged in"
			})
		} else {
			// user didn't have correct username or password
			next(new InvalidCredentialsException())
		}
	} catch (err) {
		console.error(err)
		next(new ServerException())
	}
})

router.post('/logout', async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(new ServerException('who knows'))
			} else {
				res.status(200).json({
					success: "logged out"
				})
			}
		})
	} catch (err) {
		console.error(err)
		next(new ServerException())
	}
})

module.exports = router