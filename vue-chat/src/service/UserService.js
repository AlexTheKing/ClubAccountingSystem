import { io } from '../service/ConnectionService';
import UserEvents from '../constants/UserEvents';

class AuthorizationError extends Error {
  constructor (message) {
    super();
    this.message = message;
  }
}

class UserServiceImpl {
  constructor () {
    this.setupConstants();
    this.user = null;
    io.on(UserEvents.AUTHORIZE_USER_SUCCESS_RESPONSE, (user) => {
      this.user = user;
      this.saveIntoStorage();
    });
    io.on(UserEvents.AUTHORIZE_USER_FAIL_RESPONSE, () => {
      console.log('Authorization failed');
    });
  }

  setupConstants () {
    this.TIMEOUT = 500;
    this.INTERVAL = 50;
    this.CHAT_USER_KEY = 'CHATUSER';
  }

  saveIntoStorage () {
    window.localStorage.setItem(this.CHAT_USER_KEY, JSON.stringify(this.user));
  }

  loadFromStorage () {
    this.user = JSON.parse(window.localStorage.getItem(this.CHAT_USER_KEY));
    return this.user;
  }

  removeFromStorage () {
    window.localStorage.removeItem(this.CHAT_USER_KEY);
  }

  async authorize (username, password) {
    if (!this.isAuthorized()) {
      io.emit(UserEvents.AUTHORIZE_USER_REQUEST, {
        username: username,
        password: password
      });
      return new Promise((resolve, reject) => {
        let counter = 0;
        let intervalObj = setInterval(() => {
          if (counter > this.TIMEOUT) {
            clearInterval(intervalObj);
            reject(new Error('Cannot authorize'));
          }
          if (this.user !== null) {
            clearInterval(intervalObj);
            resolve();
          } else {
            counter += this.INTERVAL;
          }
        }, this.INTERVAL);
      });
    } else {
      return new Promise(resolve => {
        resolve();
      });
    }
  }

  authenticateRequest (data) {
    if (!this.isAuthorized()) {
      throw new AuthorizationError('Cannot authenticate request. Not authorized');
    }
    data.session = this.user.session;
    return data;
  }

  logout () {
    this.removeFromStorage();
    this.user = null;
  }

  isAuthorized () {
    return this.user !== null || this.loadFromStorage() !== null;
  }
}

export const UserService = new UserServiceImpl();
