
class ConnectionServiceImpl {
    constructor() {
        this.sockets = []
    }

    add(socket) {
        socket.on('disconnect', () => {
            console.log('User disconnected');
            const index = this.sockets.indexOf(socket);
            if (index > -1) {
                this.sockets.splice(index, 1);
            }
        });
        this.sockets.push(socket);
    }

    broadcast(event, data) {
        for (const socket of this.sockets) {
            socket.emit(event, data);
        }
    }
}

export const ConnectionService = new ConnectionServiceImpl();