import UserEvents from '../constants/UserEvents';
import { UserService } from '../service/UserService';
import { AuthenticationService } from "../service/AuthenticationService";

class UserEventHandler {
    constructor(socket) {
        this.socket = socket;
    }

    registerEvents() {
        this.registerOnGetAllUsersForRoom();
        this.registerAuthentication();
    }

    registerOnGetAllUsersForRoom() {
        this.socket.on(UserEvents.GET_ALL_USERS_FOR_ROOM_REQUEST, data => {
            AuthenticationService.checkAuthentication(data).then(() => {
                UserService.findByRoom(data.room_id).then(users => {
                    this.socket.emit(UserEvents.GET_ALL_USERS_FOR_ROOM_RESPONSE, users);
                });
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    registerAuthentication() {
        this.socket.on(UserEvents.AUTHENTICATE_USER_REQUEST, data => {
            AuthenticationService.authenticate(data.username, data.password).then(user => {
                this.socket.emit(UserEvents.AUTHENTICATE_USER_SUCCESS_RESPONSE, user);
            }).catch(() => {
                this.socket.emit(UserEvents.AUTHENTICATE_USER_FAIL_RESPONSE);
            });
        });
    }
}

export default UserEventHandler;

