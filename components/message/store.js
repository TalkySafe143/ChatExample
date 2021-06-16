const Model = require('./model')

const addMessageDB = msg => {
    const myMessage = new Model(msg);
    myMessage.save();
}

const getMessagesDB = () => {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('user')
            .exec((error, data) => {
                error ? reject(error) : resolve(data);
            });
    })
}

const updateMessageDB = async (id, message) => {
    const response = await Model.findByIdAndUpdate(id, { "message": message }, { new: true })
    return response;
}

const findMessageDB = queries => {
    return new Promise((resolve, reject) => {
        Model.find(queries)
        .populate('user')
        .exec((err, data) => {
            err ? reject(err) : resolve(data);
        });
    })
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