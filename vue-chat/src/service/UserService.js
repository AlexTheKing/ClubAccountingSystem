import { io } from '../service/ConnectionService';
import UserEvents from '../constants/UserEvents';

class UserServiceImpl {
  constructor () {
    this.TIMEOUT = 1000;
    this.INTERVAL = 50;
    this.user = null;
    io.on(UserEvents.AUTHENTICATE_USER_SUCCESS_RESPONSE, (user) => {
      this.user = user;
    });
    io.on(UserEvents.AUTHENTICATE_USER_FAIL_RESPONSE, () => {
      console.log('Authentication failed');
    });
  }

  async authenticate (username, password) {
    io.emit(UserEvents.AUTHENTICATE_USER_REQUEST, {
      username: username,
      password: password
    });
    return new Promise((resolve, reject) => {
      let counter = 0;
      let intervalObj = setInterval(() => {
        if (counter > this.TIMEOUT) {
          clearInterval(intervalObj);
          reject(new Error('Cannot authenticate'));
        }
        if (this.user !== null) {
          clearInterval(intervalObj);
          resolve();
        } else {
          counter += this.INTERVAL;
        }
      }, this.INTERVAL);
    });
  }

  authenticateRequest (data) {
    data.session = this.user.session;
    return data;
  }
}

export const UserService = new UserServiceImpl();
