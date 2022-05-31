const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, // The user that owns the URL

    domain: {
        type: String,
        required: true,
    }, // The domain of the URL

    path: {
        type: String,
        required: true,
    }, // The path of the URL (/images/image.png)

    method: {
        type: Array,
        required: true,
        default: ['GET'],
    }, // The method of the URL (GET, POST, PUT, DELETE)

    imageBuffer: {
        type: Buffer,
        required: false,
    }, // The image buffer of the URL (if it's an image)

    redirectTo: {
        type: String,
        required: false,
    } // The redirect URL of the URL (if it's a redirect)
})

module.exports = mongoose.model('Url', URLSchema);