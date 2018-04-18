import { Message } from '../model/Message';

class MessageServiceImpl {
    create(data) {
        const message = new Message({
            user: data.user_id,
            room_id: data.room_id,
            data: data.data,
            createdAt: new Date()
        });
        return message.save();
    }

    findByRoom(id) {
        return Message.find({ room_id: id }).populate('user').exec();
    }
}

export const MessageService = new MessageServiceImpl();