import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    room_id: { type: String, required: true },
    data: { type: String, required: true },
    createdAt: { type: Date }
});

export const Message = mongoose.model('Message', MessageSchema);