const Model = require('./model');

const addUserDB = user => {
    const myUser = new Model(user);
    return myUser.save();
}

const listUsersDB = () => Model.find();

module.exports = { addUserDB, listUsersDB }