import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('No content here');
});

module.exports = router;
