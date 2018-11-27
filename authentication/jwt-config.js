const JWT = {
    SECRET: process.env.JWT_SECRET || 'qweqweqweqweqw',
    SALT: process.env.JWT_SALT || 'wqeqweqwqeeweqw',
}

const cookieExtractor = (req) => req.cookies['jWtToken']

const JWT_OPTIONS = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT.SALT
}

module.exports = {
    JWT,
    JWT_OPTIONS
}