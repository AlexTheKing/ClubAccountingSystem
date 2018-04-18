import mongoose from "mongoose";
import * as UserFactory from './UserFactory';
import * as MessageFactory from './MessageFactory';

mongoose.connect(`mongodb://localhost/chat-app`).then(() => {
    console.log("Connected to the database");
    const room_id = '1';
    UserFactory.generate(room_id).then(() => {
       return MessageFactory.generate(room_id);
    }).then(() => {
        console.log('Generated data');
        process.exit();
    });
});

