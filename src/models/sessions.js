import { model, Schema } from 'mongoose';

const sessionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
}, { versionKey: false })

sessionSchema.statics.createSession = async function(user) {
    const filter = { user: user._id };
    const update = { user: user._id };
    const options = { upsert: true, new: true };
  
    const session = await this.findOneAndUpdate(filter, update, options).populate('user');
    return session;
  }

sessionSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})

export default model('sessions', sessionSchema);

