import { Router } from 'express'
import sessions from '../models/sessions.js'

const router = Router()

router.post('/sessions', async (req, res, next) => {
    try {
      const user = req.body.user;
      const session = await sessions.createSession(user);
      res.send(session);
    } catch (error) {
      console.error(error);
      res.send(500, { message: 'Internal Server Error' });
    }
  });

  export default router;