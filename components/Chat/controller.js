const store = require('./store');

const setChat = chat => {
    return new Promise((resolve, reject) => {
        if (!chat.users) reject('Invalid information');
        else if (!chat.users[0]) reject('Missing first user');
        else if (!chat.users[1]) reject('Missing second user');
        else if (chat.users[0] === chat.users[1]) reject('Do not accept same user!')
        else {
            store.setChatDB(chat)
                .then(() => resolve(chat))
                .catch(err => reject(err));
        }

    })
}

const getChats = () => {
    return new Promise((resolve, reject) => {
        store.getChatsDB()
            .then( res => resolve(res))
            .catch( err => reject(err));
    });
};

const findChats = userId => {
    return new Promise((resolve, reject) => {
        store.findChats(userId)
            .then( res => resolve(res))
            .catch( err => reject(err));
    })
}

module.exports = { setChat, getChats, findChats }