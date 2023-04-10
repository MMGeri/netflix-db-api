import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    email: {type: String, required: true, match: /\S+@\S+\.\S+/},
    password: {type: String, required: true, minlength: 8, maxlength: 16},
    queue: [{type: Schema.Types.ObjectId, ref: 'videos'}],
});

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export default model('users', userSchema);