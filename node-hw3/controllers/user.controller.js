const {
    findAll, insertUser, removeUserByID, updateUserInfo
} = require('../services');

module.exports = {
    getAllUser: async (req, res) => {
        const allUsers = await findAll();

        res.json(allUsers);
    },

    createUser: async (req, res) => {
        await insertUser(req.body);
        res.json('success');
    },

    getUserById: async (req, res) => {
         await res.json(req.user);
    },

    deleteUserById: async (req, res) => {
        const { id } = req.params;
        await removeUserByID(id);

        res.json(`user id: ${id} deleted`);
    },

    updateUserById: async (req, res) => {
        const { id } = req.params;
        await updateUserInfo(id, req.body);

        res.json('User updated!');
    }
};
