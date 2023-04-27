import { Router } from 'express'
import users from '../models/users.js'
import mongoose from 'mongoose';

const router = Router()

router.get('/users/:id/queue', async (req, res) => {
    try {
        const userId = req.params.id;
        const sortBy = req.query.sort || 'title';

        const user = await users.findById(userId).populate({
          path: 'queue',
          options: { sort: { [sortBy]: 1 } }
        });
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        res.json(user.queue);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
});

//FIXME: DeprecationWarning: express-restify-mongoose: in a future major version, the PUT method will replace rather than update a resource. Use PATCH instead.
router.put('/users/:id/queue/:videoId', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.videoId)) {
      return res.status(400).send('Invalid videoId');
    }
  
    try {
      const user = await users.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { queue: req.params.videoId } },
        { new: true }
      ).populate('queue');
  
      res.send(user.queue);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

router.delete('/users/:id/queue/:videoId', async (req, res) => {
    try {
        const user = await users.findByIdAndUpdate(
          req.params.id,
          { $pull: { queue: req.params.videoId } },
          { new: true }
        ).populate('queue');
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        res.json(user.queue);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
});

export default router;