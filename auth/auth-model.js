const db = require("../data/dbConnection")

module.exports = {
	registerUser,
	getUserByUsername,
	find,
	findById,
}

function find() {
	return db("users").select("id", "username")
}

async function registerUser(user) {
	const [id] = await db("users").insert(user, "id")
	return findById(id)
}

function findById(id) {
	return db("users")
		.where({
			id,
		})
		.first()
}

function getUserByUsername(filter) {
	return db("users").where(filter).first()
}