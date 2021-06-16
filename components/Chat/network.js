const express = require('express');
const router = express.Router();
const response = require('../../network/response')
const { setChat, getChats, findChats } = require('./controller')

router.get('/', (req, res) => {
        getChats()
        .then( ok => response.success(req, res, ok, 200))
        .catch( ops => {
            response.error(req, res, 'Unexpected Error!', 500);
            console.log(ops);
        })
})

router.get('/:_id', (req, res) => {
    debugger;
    findChats(req.params._id)
            .then( ok => response.success(req, res, ok, 200))
            .catch( ops => {
                response.error(req, res, 'Unexpected Error', 500);
                console.log(ops);
            })
})

router.post('/', (req, res) => {
    setChat(req.body)
        .then( ok => response.success(req, res, ok, 201))
        .catch( ops => {
            response.error(req, res, 'Unexpected error', 500);
            console.log(ops);
        })
})

module.exports = router;