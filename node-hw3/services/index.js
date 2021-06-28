const {
    findAll, insertUser, getUserByID, removeUserByID, updateUserInfo
} = require('./user.service');

module.exports = {
    findAll,
    insertUser,
    getUserByID,
    removeUserByID,
    updateUserInfo
};
