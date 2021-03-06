import MessageEvents from '../constants/MessageEvents';
import { MessageService } from '../service/MessageService';
import { AuthorizationService } from "../service/AuthorizationService";
import { ConnectionService } from "../service/ConnectionService";

class MessageEventHandler {
    constructor(socket) {
        this.socket = socket;
    }

    registerEvents() {
        this.registerOnNewMessage();
        this.registerOnGetAllMessagesForRoom();
    }

    registerOnNewMessage() {
        this.socket.on(MessageEvents.NEW_MESSAGE, data => {
            AuthorizationService.checkAuthentication(data).then((user) => {
                data.user_id = user.id;
                MessageService.create(data);
                ConnectionService.broadcast(MessageEvents.UPDATE_MESSAGES_FOR_ROOM, data.room_id);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    registerOnGetAllMessagesForRoom() {
        this.socket.on(MessageEvents.GET_ALL_MESSAGES_FOR_ROOM_REQUEST, data => {
            AuthorizationService.checkAuthentication(data).then(() => {
                MessageService.findByRoom(data.room_id).then(messages => {
                    const messagesToSend = [];
                    for (const message of messages) {
                        const messageToSend = {};
                        messageToSend.name = message.user.name;
                        messageToSend.data = message.data;
                        messageToSend.createdAt = message.createdAt;
                        messagesToSend.push(messageToSend);
                    }
                    this.socket.emit(MessageEvents.GET_ALL_MESSAGES_FOR_ROOM_RESPONSE, messagesToSend);
                });
            }).catch((err) => {
                console.log(err);
            })
        });
    }
}

export default MessageEventHandler;

