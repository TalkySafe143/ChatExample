const Model = require('./model')

const addMessageDB = msg => {
    const myMessage = new Model(msg);
    myMessage.save();
}

const getMessagesDB = async () => {
    const messages = await Model.find();
    return messages;
}

const updateMessageDB = async (id, message) => {
    const response = await Model.findByIdAndUpdate(id, { "message": message }, { new: true })
    return response;
}

const findMessageDB = async queries => {
    try {
        const results = await Model.find(queries);
        return results;
    } catch(err) {
        console.log(err);
        return 'Unexpected Error'
    }
}

const deleteMessageDB = async id => {
    const exists = await Model.exists({
        _id: id
    })

    if (exists) {
        return Model.deleteOne({ _id: id })
    } else {
        throw new Error('No existe ese mensaje');
    }; 
}

module.exports = { addMessageDB, getMessagesDB, updateMessageDB, findMessageDB, deleteMessageDB };