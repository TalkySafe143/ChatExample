const db = require('mongoose');

db.Promise = global.Promise;

const connect = async uri => {
    try {
        await db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('[DataBase] La base de datos fue conectada con exito')
    } catch(err) {
        console.error('[DataBase] La base de datos no se logró conectar')
    }
}

module.exports = connect;
