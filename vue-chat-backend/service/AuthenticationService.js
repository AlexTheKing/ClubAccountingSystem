import { UserService } from "./UserService";
import crypto from 'crypto';

class AuthenticationError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class AuthenticationServiceImpl {
    authenticate(username, password) {
        return new Promise((resolve, reject) => {
            UserService.findByNameAndPassword(username, password).then(users => {
                if (users.length !== 0) {
                    const user = users[0];
                    user.session = this.generateSHA256();
                    user.save();
                    resolve(user);
                } else {
                    reject(new AuthenticationError('Wrong name or password'));
                }
            });
        });
    }

    checkAuthentication (data) {
        return new Promise((resolve, reject) => {
           UserService.findBySession(data.session).then(users => {
               if (users.length === 1) {
                   resolve(users[0]);
               } else {
                   reject(new AuthenticationError('Not authenticated'));
               }
           })
        });
    }

    generateSHA256() {
        const sha = crypto.createHash('sha256');
        sha.update(Math.random().toString());
        return sha.digest('hex');
    }
}

export const AuthenticationService = new AuthenticationServiceImpl();