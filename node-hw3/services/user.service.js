const fs = require('fs');
const { usersConst: { USERS_DB_PATH } } = require('../constants');

module.exports = {
    findAll: () => JSON.parse(String(fs.readFileSync(USERS_DB_PATH))),

    insertUser: (user) => {
        const db = JSON.parse(String(fs.readFileSync(USERS_DB_PATH)));

        db.push({ id: db.length, ...user });

        fs.writeFile(USERS_DB_PATH, JSON.stringify(db), (err) => console.log(err));
    },

    getUserByID: (id) => {
        const db = JSON.parse(String(fs.readFileSync(USERS_DB_PATH)));
        const singleUser = db.find((user) => String(user.id) === id);
        return singleUser;
    },

    removeUserByID: (id) => {
        const db = JSON.parse(String(fs.readFileSync(USERS_DB_PATH)));
        const filterUser = db.filter((user) => String(user.id) !== id);

        fs.writeFile(USERS_DB_PATH, JSON.stringify(filterUser), (err) => console.log(err));
        return filterUser;
    },

    updateUserInfo: (id, info) => {
        const db = JSON.parse(String(fs.readFileSync(USERS_DB_PATH)));
        const userInfo = db.find((user) => String(user.id) === id);
        db[id] = { ...userInfo, ...info };
        fs.writeFile(USERS_DB_PATH, JSON.stringify(db), (err) => console.log(err));
    }
};
