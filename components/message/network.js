// Este va a ser el archivo de red del componente 'message', este va a gestionar todo lo que tiene que ver cuando se hace una peticion con la ruta '/message'

const express = require('express');
const config = require('../../config');
const multer = require('multer');
const router = express.Router();
const response = require('../../network/response')
const { addMessage, getMessages, updateMessage, findMessage, deleteMessage } = require('./controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public${config.imagesPath}`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    }
})

const upload = multer({
    storage: storage
})

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
        .catch( ops => response.error(req, res, `Unexpected ${ops.valueType}. Expected ${ops.kind}`, 400))
    }

})

router.post('/',upload.single('file'), (req, res) => {

    addMessage(req.body.user, req.body.message, req.body.chat, req.file)
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