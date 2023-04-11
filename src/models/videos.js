import { model, Schema } from 'mongoose';

const videoSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['TV Show', 'Movie'], required: true },
}, { versionKey: false })


videoSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})

export default model('videos', videoSchema);