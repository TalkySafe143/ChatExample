const store = require('./store');

const addUser = name => {
    if (!name) return Promise.reject('Invalid name');

    const user = {
        name
    }

    return store.addUserDB(user); // Con este return ya no es necesario hacer toda la promesa, porque estamos devolviendo ed por sí una promesa
    
}

const listUsers = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const results = await store.listUsersDB();
            results[0] ? resolve(results) : reject('No hay usuarios disponibles!');
        } catch(err) {
            reject(err);
        }
    })
}

module.exports = { addUser, listUsers }