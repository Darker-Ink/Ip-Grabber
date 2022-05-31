const config = require('../../config.json');

const adminCheck = (req, res, next) => {
    if(config.admin.ipWhitelist && !config.admin.ipWhitelist.includes(req.realip)) {
        res.status(403).send('403 Forbidden');
        return;
    }
}

module.exports = adminCheck;