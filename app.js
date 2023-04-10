import express, { Router } from 'express'
import methodOverride from 'method-override'
import mongoose, { connect } from 'mongoose'
import restify from 'express-restify-mongoose';
const { serve } = restify;

import videos from './src/models/videos.js'
import users from './src/models/users.js'
import sessions from './src/models/sessions.js'

const port = 10021;


const app = express()
const router = Router()

app.use(express.json())
app.use(methodOverride())

connect('mongodb://netflix-db:27017/netflix')

const serveOptions = {
  prefix: '',
  version: '',
}

serve(router, videos, serveOptions)
serve(router, users, serveOptions)
serve(router, sessions, serveOptions)

app.use(router)

app.listen(port, () => {
  console.log(`Express server listening on port http://localhost:${port}`)
})

export default app;


