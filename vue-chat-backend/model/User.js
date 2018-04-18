import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    room_ids: [String],
    session: {
        type: String,
        index: {
            unique: true,
            partialFilterExpression: { session: { $type: 'string' } }
        }
    },
    createdAt: { type: Date },
    password: { type: String, required: true }
});

export const User = mongoose.model('User', UserSchema);