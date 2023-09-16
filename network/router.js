// Este va a ser el archivo encargado de hacer todas las rutas y gestionarla con los componentes

const message = require('../components/message/network'); // Como vemos, estamos importando el router que hicimos en el archivo de red del componente de los mensajes (Es decir, la funcionalidad de mensajes)
const user = require('../components/User/network');
const chat = require('../components/Chat/network');

exports.routes = server => { // Vamos a exportar la siguiente funcion, la cual toma como parametro el servidor de Express (Con TypeScript quizá podemos tiparlo mejor para que se entienda mas)
    server.use('/message', message); // Esto es equivalente a decir: app.use('/message', express.Router())
    // Esto es equivalente a el comentario porque le estamos pasando como segundo parametro a .use() el router importado del componente 'message', este contiene toda la especificacion de que se hace en caso de que sea GET o que sea POST la peticion que se esta recibiendo.
    server.use('/user', user);
    server.use('/chat', chat);
}
// En este espacio vamos a importar todos los router de los componentes y establecer las rutas a las cuales deben escuchar.
// Este archivo va a modular todo el trabajo de las rutas de 'server.js'