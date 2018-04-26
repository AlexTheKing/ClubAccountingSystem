import UserEvents from '../constants/UserEvents';
import { UserService } from '../service/UserService';
import { AuthorizationService } from "../service/AuthorizationService";

class UserEventHandler {
    constructor(socket) {
        this.socket = socket;
    }

    registerEvents() {
        this.registerOnGetAllUsersForRoom();
        this.registerAuthorization();
    }

    registerOnGetAllUsersForRoom() {
        this.socket.on(UserEvents.GET_ALL_USERS_FOR_ROOM_REQUEST, data => {
            AuthorizationService.checkAuthentication(data).then(() => {
                UserService.findByRoom(data.room_id).then(users => {
                    this.socket.emit(UserEvents.GET_ALL_USERS_FOR_ROOM_RESPONSE, users);
                });
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    registerAuthorization() {
        this.socket.on(UserEvents.AUTHORIZE_USER_REQUEST, data => {
            AuthorizationService.authorize(data.username, data.password).then(user => {
                this.socket.emit(UserEvents.AUTHORIZE_USER_SUCCESS_RESPONSE, user);
            }).catch(() => {
                this.socket.emit(UserEvents.AUTHORIZE_USER_FAIL_RESPONSE);
            });
        });
    }
}

export default UserEventHandler;

