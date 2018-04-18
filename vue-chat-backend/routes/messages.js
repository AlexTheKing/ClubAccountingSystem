import express from 'express';
import { MessageService } from '../service/MessageService'

const router = express.Router();

router.get('/', function (req, res, next) {
    console.log("GET messages");
    MessageService.findAll().then(data => res.send(data));
});

router.post('/', function (req, res, next) {
    console.log("POST messages");
    MessageService.create(req.body).then(data => res.send(data));
});

module.exports = router;
