const fs = require('fs');
const utils = require('util');
const { usersConst: { USERS_DB_PATH } } = require('../constants');

const readFile = utils.promisify(fs.readFile);
const writeFile = utils.promisify(fs.writeFile);

const getAllUsers = async () => {
    const allUsers = await readFile(USERS_DB_PATH);
    return JSON.parse(String(allUsers));
};

module.exports = {
    findAll: () => getAllUsers(),

    insertUser: async (user) => {
        const db = await getAllUsers();

        db.push({ id: db.length, ...user });

        await writeFile(USERS_DB_PATH, JSON.stringify(db));
    },

    getUserByID: async (id) => {
        const allUsers = await getAllUsers();
        return allUsers.find((user) => String(user.id) === id);
    },

    removeUserByID: async (id) => {
        const allUsers = await getAllUsers();
        const filterUser = allUsers.filter((user) => String(user.id) !== id);

        await writeFile(USERS_DB_PATH, JSON.stringify(filterUser));
        return filterUser;
    },

    updateUserInfo: async (id, info) => {
        const allUsers = await getAllUsers();
        const userInfo = allUsers.find((user) => String(user.id) === id);
        allUsers[id] = { ...userInfo, ...info };
        await writeFile(USERS_DB_PATH, JSON.stringify(allUsers));
    }
};
