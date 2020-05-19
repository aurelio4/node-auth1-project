const express = require("express")
const session = require("express-session")
const cors = require("cors")
const errorHandler = require('./errors/errorHandler')

const authRouter = require("./auth/auth-router")
const server = express()
const PORT = process.env.PORT || 4000

const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    secure: process.env.SECURE_COOKIE || false, // true in production, sends the cookie only over https
    httpOnly: true, // true means client JS cannot access the cookie
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOW_COOKIES || true, // be careful of this in a real production app
  name: "test cookie",
  secret: process.env.COOKIE_SECRET || "secret cookie stuff",
}

server.use(session(sessionConfig))
server.use(express.json())
server.use(cors())

server.use("/auth", authRouter)

server.get("/", (req, res) => {
  res.json({
    api: "works",
  })
})

server.use(errorHandler)

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})