import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
    password: { type: String, required: true, minlength: 8, maxlength: 16 },
    queue: [{ type: Schema.Types.ObjectId, ref: 'videos' }],
}, { versionKey: false });

userSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})

export default model('users', userSchema);