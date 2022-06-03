const UserSchema = require('../../utils/mongooseSchemas/UserSchema');

module.exports = {
    path: '/new',
    method: 'post',
    middleWares: [],
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    run: async (req, res, next) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send(`Missing ${!username ? 'username' : !email ? 'email' : 'password'}`);
        }
    },
};