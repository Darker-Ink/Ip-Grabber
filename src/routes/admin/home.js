const config = require("../../config.json");
module.exports = {
    path: "/",
    method: "get",
    middleWares: [],
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    run: async (req, res, next) => {
        if(config.admin.ipWhitelist && !config.admin.ipWhitelist.includes(req.realip)) {
            res.status(403).send("403 Forbidden");
            return;
        }

        res.send("Hello!");

    }
}