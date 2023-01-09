const handleError = ( status = 200, message) => {
    throw { status, message }
}

module.exports = handleError;