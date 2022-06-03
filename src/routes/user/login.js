const bcrypt = require("bcrypt");
const UserSchema = require('../../utils/mongooseSchemas/UserSchema');

const jsonwebtoken = require('jsonwebtoken');
const config = require("../../config.json");

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

        const hashedEmail = await bcrypt.hash(email, await bcrypt.genSalt(10));

        const user = await UserSchema.findOne({ hashedEmail });

        if (!user) {
            return res.status(400).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }

        const ipvaild = await bcrypt.compare(req.realip, user.ip);

        if (!ipvaild) {
            const ipsValid = user.ips.find(ip => bcrypt.compare(req.realip, ip));

            if (!ipsValid) {
                return res.status(400).send('Would send a notification to the user');
            }
        }

        const token = jsonwebtoken.sign({
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
        }, config.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.send({
            token,
        });
    }
}