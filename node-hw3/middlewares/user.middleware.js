const { getUserByID } = require('../services');
const { usersConst: { ERROR_PHRASES } } = require('../constants');

module.exports = {
    checkIsUserPresent: (req, res, next) => {
        const { id } = req.params;
        const singleUser = getUserByID(id);
        if (!singleUser) {
            throw new Error(ERROR_PHRASES.undefinedUser);
        }
        req.user = singleUser;
        next();
    },

    changeUserValidator: (req, res, next) => {
        const {
            id, name, password, login
        } = req.body;

        if (id) {
            console.log(ERROR_PHRASES.changeId);
            throw new Error(ERROR_PHRASES.changeId);
        }

        if (name === '' || password === '' || login === '') {
            throw new Error(ERROR_PHRASES.emptyValue);
        }

        if (name && name.search(/\d/) !== -1) {
            throw new Error(ERROR_PHRASES.numberInName);
        }

        next();
    },

    checkNewUser: (req, res, next) => {
        const {
            name, password, login
        } = req.body;
        if (!name) {
            throw new Error(ERROR_PHRASES.enterName);
        }

        if (!password) {
            throw new Error(ERROR_PHRASES.enterPassword);
        }

        if (!login) {
            throw new Error(ERROR_PHRASES.enterLogin);
        }

        next();
    }
};
