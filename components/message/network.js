// Este va a ser el archivo de red del componente 'message', este va a gestionar todo lo que tiene que ver cuando se hace una peticion con la ruta '/message'

const express = require('express');
const router = express.Router();
const response = require('../../network/response')
const { addMessage, getMessages, updateMessage, findMessage, deleteMessage } = require('./controller')

router.get('/', (req, res) => { // Aqui no le estamos indicando una ruta en especifica ya que el archivo de 'router.js' en la capa de red del servidor, ya esta especificando que la ruta es: '/message' si se llegara a colocar de nuevo 'message' en este primer parametro la ruta quedaría asi: '/message/message'
    if (Object.keys(req.query).length === 0) {
        getMessages()
        .then( ok => response.success(req, res, ok, 200))
        .catch( ops => {
            response.error(req, res, 'Unexpected error', 500)
            console.log(ops);
        });
    } else {
        findMessage(req.query)
        .then( ok => response.success(req, res, ok, 200))
        .catch( ops => response.error(req, res, ops, 400))
    }

})

router.post('/', (req, res) => {

    addMessage(req.body.user, req.body.message)
        .then( ok => response.success(req, res, ok, 201))
        .catch( ops => response.error(req, res, ops, 400));
    
})

router.patch('/:id', (req, res) => { // Cuando le estamos ingresando al Path ':id' estamos generando una nueva variable para poder identificar el mensaje, a esto se le llaman parametros.
    // console.log(req.params.id); // Aqui vamos a poder ver el parametro que le estamos pidiendo
    updateMessage(req.params.id, req.body.message)
        .then( ok => response.success(req, res, ok, 200))
        .catch( ops => {
            response.error(req, res, 'Error interno!', 500);
            console.log(ops);
        })
})

router.delete('/:id', (req, res) => {
    deleteMessage(req.params.id)
        .then(() => response.success(req, res, `Mensaje ${req.params.id} eliminado!`, 200))
        .catch(ops => {
            response.error(req, res, 'Error interno', 500);
            console.log(ops)
        });
})

module.exports = router; // Exportando el router lo que estamos haciendo es coger las rutas que establecimos en los metodos y exportarlas