const jwt = require('jsonwebtoken');

class AuthorizationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'AuthorizationError';
    }
}

class Authenticated {
    constructor(user, message) {
        this.user = user;
        this.message = message;
        this.isAuth = (this.user) ? true : false;
        this.code = (this.isAuth) ? 200 : 404;
    }
}

module.exports = ({ req, res }) => {
    const authHeader = req.get('Authorization') //|| process.env.DEV_TOKEN;
    try {
        if (!authHeader) {
            throw new AuthorizationError('Authorization header not privided');
        }
        
        const token = authHeader.split(' ')[1];
        if (!token || token === '') {
            throw new AuthorizationError('Authorization token not privided');
        }
        let decodedToken;
        decodedToken = jwt.verify(token, 'somesupersecretkey');
        
        if (!decodedToken) {
            throw new AuthorizationError('Authorization token verification failed')
        }
        
        return new Authenticated(decodedToken, 'Authorization success')
        
    } catch (error) {
        return new Authenticated(null, error.message);
    }

}