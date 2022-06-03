const bcrypt = require("bcrypt");
const UserSchema = require('../../utils/mongooseSchemas/UserSchema');

module.exports = {
    path: '/login',
    method: 'post',
    middleWares: [],
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    run: async (req, res, next) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send(`Missing ${!email ? 'email' : 'password'}`);
        }

        const user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }
    }
}