// En este archivo va a ser donde vamos a recibir todas las peticiones!

const express = require('express');
const app = express();
const server = require('http').Server(app)

const config = require('./config');

const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('./socket')
const db = require('./db')
const router = require('./network/router'); // Como vemos estamos importando el router que hicimos en la capa de red. (Esta es una funcion)

socket.connect(server);

socket.socket.io.on('connection', (skt) => {
    console.log("user connected")
})

db(config.dbURL)

app.use(cors());
app.use(bodyParser.json());
app.use(config.publicRoute, express.static('public'))

router.routes(app); // Como parametro a la funcion añadimos el servidor de express()

server.listen(config.port, () => {
    console.log(`La app esta escuchando en: ${config.host}:${config.port}`);
});
