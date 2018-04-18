import { User } from '../model/User';

class UserServiceImpl {
    create(data) {
        const user = new User({
            name: data.name,
            room_ids: data.room_ids,
            createdAt: new Date(),
            password: data.password
        });
        return user.save();
    }

    findAll() {
        return User.find().exec();
    }

    findById(id) {
        return User.findById(id).exec();
    }

    findByRoom(id) {
        return User.find({ room_ids: id }).exec();
    }

    findBySession(session) {
        return User.find({ session: session }).exec();
    }

    findByNameAndPassword(name, password) {
        return User.find({
            name: name,
            password: password
        }).exec();
    }
}

export const UserService = new UserServiceImpl();