const express = require('express');
const router = express.Router();
const response = require('../../network/response')
const { addUser, listUsers } = require('./controller');

router.get('/', (req, res) => {
    listUsers()
        .then( ok => response.success(req, res, ok, 200))
        .catch( ops => {
            ops == 'No hay usuarios disponibles!' ?
            response.error(req, res, ops, 400) : (
                response.error(req, res, 'Unexpected Error!', 500),
                console.log(ops)
            );
        })
})

router.post('/', (req, res) => {
    addUser(req.body.name)
        .then( ok => response.success(req, res, ok, 201))
        .catch( ops => {
            response.error(req, res, 'Unexpected error', 500);
            console.log(ops);
        });
})

module.exports = router;