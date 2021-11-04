const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')
const io = new Server(server)
const { createClient } = require('redis')
const { v4 } = require('uuid')
const moment = require('moment')
const { json } = require('body-parser')

const { blueBright, greenBright, redBright } = require('chalk')

const client = createClient()
app.use(json())
app.use(cors())

client.on('error', console.error)
client
  .connect()
  .then(() => console.log(blueBright.bold('Connected to redis locally!')))
  .catch(() => {
    console.error(redBright.bold('Error connecting to redis'))
  })

app.get('/', (req, res) => {
  res.send({ msg: 'hi' })
})

app.post('/create-room-with-user', async (req, res) => {
  const { username } = req.body
  const roomId = v4()

  await client
    .hSet(`${roomId}:info`, {
      created: moment(),
      updated: moment(),
    })
    .catch((err) => {
      console.error(1, err)
    })

  // await client.lSet(`${roomId}:users`, [])

  res.status(201).send({ roomId })
})

server.listen(3001, () => {
  console.log(greenBright.bold('listening on *:3001'))
})