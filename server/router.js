const express = require('express')
const app = express()
const router = express.Router()

const UserView = require('./views/users');
const RoomsView = require('./views/rooms');
const Auth = require('./auth/AuthController');
const MessagesView = require('./views/messages');

router.use('/users', UserView);
router.use('/auth', Auth);
router.use('/rooms', RoomsView);
router.use('/messages', MessagesView);

module.exports = router;