
const jwt = require('jsonwebtoken')


interface userInterface {
    id: string,
    name: string,
    email: string,
    password: string | undefined
}

const generateAccessToken = (user: userInterface): string => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d"
        }
    )
}

export default generateAccessToken