import express, { Router } from 'express';
import methodOverride from 'method-override';
import mongoose, { connect } from 'mongoose';
import restify from 'express-restify-mongoose';

import queueRouter from './src/routes/queue.js';
import sessionRouter from './src/routes/sessions.js';
const { serve } = restify;

import videos from './src/models/videos.js'
import users from './src/models/users.js'
import sessions from './src/models/sessions.js'

const port = process.env.PORT || 10021;


const app = express()
const router = Router()

app.use(express.json())
app.use(methodOverride())

connect(`mongodb://${process.env.NETFLIX_DB}:27017/netflix`).catch((err) => {
  console.error(err);
  process.exit(1);
});

const serveOptions = {
  prefix: '',
  version: '',
  lean:false
}

serve(router, videos, serveOptions)
serve(router, users, serveOptions)
serve(router, sessions, serveOptions)

router.get('/health', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


app.use(queueRouter)
app.use(sessionRouter)
app.use(router)


app.listen(port, () => {
  console.log(`Express server listening on port http://localhost:${port}`)
})

export default app;


