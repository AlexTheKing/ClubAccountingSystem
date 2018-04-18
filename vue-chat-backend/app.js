import mongoose from "mongoose";
import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http'
import socket_io from 'socket.io'

import indexRouter from './routes/index';

import MessageEventHandler from './event/MessageEventHandler';
import UserEventHandler from './event/UserEventHandler';

const app = express();
const server = http.createServer(app);
const io = socket_io(server);

//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

//app.use('/', indexRouter);

mongoose.connect(`mongodb://localhost/chat-app`).then(() => {
    console.log("Connected to the database");
});

io.on('connection', function (socket) {
    console.log('New user connected');
    const messageEventHandler = new MessageEventHandler(socket);
    const userEventHandler = new UserEventHandler(socket);
    messageEventHandler.registerEvents();
    userEventHandler.registerEvents();
});

server.listen(3000, () => {
   console.log("Server is started");
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     res.status(err.status || 500);
// });

module.exports = app;
