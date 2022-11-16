// TODO imports!!

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // Authorization: 'Bearer TOKEN'
    if(!token) { res.status(200).json({ success: false, message: "Error! Token was not provided." }) }
    // Decoding the token
    const decodedToken = jwt.verify(token, "secretkeyappearshere")
    req.decoded = decodedToken
    /* next() with no arguments says "just kidding, I don't actual want to handle this". It goes back in
    and tries to find the next route that would match. In other words, if a route is found, it is rendered.
    If one isn't found, this route handler is ignored and the program moves on to other ones. */
    next()
}

module.exports = verifyToken;