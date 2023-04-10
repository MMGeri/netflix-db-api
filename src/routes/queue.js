import { Router } from 'express'
import users from './src/models/users.js'

const router = Router()

router.get('/users/:id/queue', async (req, res) => {
    users
        .findById(req.params.id)
        .populate('queue')
        .exec((err, user) => {
            if (err) res.status(500).send(err.message)
            res.send(user.queue)
        });
});

router.put('/users/:id/queue/:videoId', async (req, res) => {
    users
        .findByIdAndUpdate(req.params.id, { $addToSet: { queue: req.params.videoId } }, { new: true })
        .populate('queue')
        .exec((err, user) => {
            if (err) res.status(500).send(err.message)
            res.send(user.queue)
        });
});

router.delete('/users/:id/queue/:videoId', async (req, res) => {
    users
        .findByIdAndUpdate(req.params.id, { $pull: { queue: req.params.videoId } }, { new: true })
        .populate('queue')
        .exec((err, user) => {
            if (err) res.status(500).send(err.message)
            res.send(user.queue)
        });
});

export { router };