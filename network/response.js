
exports.success = function (req, res, message, statusCode=200) {
    res.status(statusCode).send({
        error: '',
        body: message
    })
}

exports.error = function (req, res, message, statusCode=500) {
    res.status(statusCode).send({
        error: message,
        body: ''
    })
}