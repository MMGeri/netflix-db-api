import { model, Schema } from 'mongoose';

export default model('sessions', new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'users'},
}));