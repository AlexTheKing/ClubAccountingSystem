import { UserService } from "../service/UserService";

export function generate(room_id) {
    return UserService.create({
        name: 'Alexander',
        room_ids: [room_id, '2'],
        password: 'alex'
    }).then(() => {
        return UserService.create({
            name: 'Enver',
            room_ids: [room_id],
            password: 'enver'
        });
    }).then(() => {
        return UserService.create({
            name: 'Nastya',
            room_ids: [room_id, '3'],
            password: 'nastya'
        });
    }).then(() => {
        console.log('Users were created');
    });
}