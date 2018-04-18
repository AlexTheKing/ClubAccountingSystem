import { MessageService } from '../service/MessageService'
import { UserService } from "../service/UserService";

export function generate(room_id)
{
    return UserService.findAll().then(async users => {
        let counter = 0;
        for (const user of users) {
            await MessageService.create({
                user_id: user.id,
                room_id: room_id,
                data: ("Message " + counter)
            });
            counter++;
        }
        console.log('Messages were created');
    });
}