module.exports = {
    path: '/',
    method: 'get',
    middleWares: [],
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    run: async (req, res, next) => {
        res.send('Hello World!');
    }
}