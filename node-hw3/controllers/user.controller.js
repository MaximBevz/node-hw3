const {
    findAll, insertUser, getUserByID, removeUserByID, updateUserInfo
} = require('../services');

module.exports = {
    getAllUser: async (req, res) => {
        const allUsers = await findAll();
        res.json(allUsers);
    },

    createUser: (req, res) => {
        insertUser(req.body);

        res.json('success');
    },

    getUserById: (req, res) => {
        const { id } = req.params;
        res.json(getUserByID(id));
    },

    deleteUserById: (req, res) => {
        const { id } = req.params;
        res.json(removeUserByID(id));
    },

    updateUserById: (req, res) => {
        const { id } = req.params;
        res.json(updateUserInfo(id, req.body));
    }
};
