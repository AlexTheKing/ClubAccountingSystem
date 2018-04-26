import { UserService } from "./UserService";
import crypto from 'crypto';

class AuthorizationError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class AuthorizationServiceImpl {
    authorize(username, password) {
        return new Promise((resolve, reject) => {
            UserService.findByNameAndPassword(username, password).then(users => {
                if (users.length !== 0) {
                    const user = users[0];
                    user.session = this.generateSHA256();
                    user.save();
                    resolve(user);
                } else {
                    reject(new AuthorizationError('Wrong name or password'));
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
                   reject(new AuthorizationError('Not authorized'));
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

export const AuthorizationService = new AuthorizationServiceImpl();