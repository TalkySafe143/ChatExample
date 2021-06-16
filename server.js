// En este archivo va a ser donde vamos a recibir todas las peticiones!

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')
const router = require('./network/router'); // Como vemos estamos importando el router que hicimos en la capa de red. (Esta es una funcion)
const uri = "mongodb://db_user_test:052005Galindo@clustertest-shard-00-00.igcws.mongodb.net:27017,clustertest-shard-00-01.igcws.mongodb.net:27017,clustertest-shard-00-02.igcws.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-eksb8j-shard-0&authSource=admin&retryWrites=true&w=majority";

db(uri)

var app = express();
app.use(bodyParser.json());
app.use('/app', express.static('public'))

router.routes(app); // Como parametro a la funcion añadimos el servidor de express()

app.listen(3001);
console.log('La app esta escuchando en: http://localhost:3001');