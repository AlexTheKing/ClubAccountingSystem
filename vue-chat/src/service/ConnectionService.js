import socketIo from 'socket.io-client';

export const io = socketIo('http://localhost:3000');
