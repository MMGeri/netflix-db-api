import { model, Schema } from 'mongoose';

export default model('users', new Schema({
    email: {type: String, required: true, match: /\S+@\S+\.\S+/},
    password: {type: String, required: true, minlength: 8, maxlength: 16},
    queue: [{type: Schema.Types.ObjectId, ref: 'videos'}],
}));