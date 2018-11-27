let bcrypt = require('bcryptjs'),
    salt = bcrypt.genSaltSync(10),
    hash;

const HashPassword = (password) => {
    hash = bcrypt.hashSync(password, salt)
    return hash
}


const ComparePassword = (plain, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plain, hash, (err, samePassword) => {
            if (
                !err &&
                samePassword // ? returns true if the hashed password equals the provided password
            ) {
                resolve()
            } else {
                reject({err, samePassword})
            }
        })
    })
}

module.exports = {
    HashPassword,
    ComparePassword
}