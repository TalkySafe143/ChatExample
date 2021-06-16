const Model = require('./model');

const getChatsDB = () => {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('users')
            .exec((err, data) => {
                err ? reject(err) : resolve(data);
            })
    })
}

const setChatDB = async chat => {
    const validation = await Model.exists(chat);
    if (validation) {
        throw 'Chat already exists';
    } else {
        const newChat = new Model(chat);
        newChat.save(); 
    }
}

const findChats = async userId => {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('users')
            .exec((err, allChats) => {
                if (err) reject(err);
                let validChats = [];
                allChats.forEach(chat => {
                    chat.users.forEach(user => {
                        if (user._id == userId) validChats.push(chat); // No se ingresa el '===' porque ObjectId y String no son lo mismo tipo, pero si el mismo contenido
                    })
                });
                resolve(validChats);
            })
    })
}

module.exports = { getChatsDB, setChatDB, findChats };