const adminCheck = require('../../utils/middleWare/adminCheck');

module.exports = {
    path: '/',
    method: 'get',
    middleWares: [adminCheck],
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    run: async (req, res, next) => {

        res.send('Hello!');

    }
}