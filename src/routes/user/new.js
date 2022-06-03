const UserSchema = require('../../utils/mongooseSchemas/UserSchema');
const crypt = require("bcrypt")
const config = require("../../config.json")
const jsonwebtoken = require('jsonwebtoken');
const { v4 } = require('uuid');

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
            return res.status(400).send(`Missing ${!username ? 'Username' : !email ? 'Email' : 'Password'}`);
        }

        if (await UserSchema.findOne({ username })) {
            return res.status(400).send('Username already exists');
        }

        if (await UserSchema.findOne({ email })) {
            return res.status(400).send('Email already exists');
        }

        const salt = await crypt.genSalt(10);

        const hashedPassword = await crypt.hash(password, salt);
        const hashedEmail = await crypt.hash(email, salt);
        const hashedIp = await crypt.hash(req.realip, salt);


        const user = new UserSchema({
            userId: v4(),
            username,
            email: hashedEmail,
            password: hashedPassword,
            ip: hashedIp,
            role: ['user'],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            lastLogin: Date.now(),
            ips: [hashedIp]
        });

        await user.save();

        const token = jsonwebtoken.sign({
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
        }, config.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 86400000,
        });

        res.status(200).send({
            message: 'User created',
            user: token,
        });

    },
};