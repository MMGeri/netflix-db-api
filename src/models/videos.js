import { model, Schema } from 'mongoose';

export default model('videos', new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    type: {type: String, enum: ['TV Show', 'Movie'],required:true},
}));