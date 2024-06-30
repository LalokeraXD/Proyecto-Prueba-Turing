// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT y autorizar usuarios
const authenticateAndAuthorize = (roles) => (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user; // Guardar la información del usuario en la solicitud

        // Verificar si el rol del usuario está autorizado
        if (roles.includes(req.user.type)) {
            if (req.user.type === 'user' && req.params.username && req.params.username !== req.user.username) {
                return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
            }
            next();
        } else {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
        }
    });
};

module.exports = authenticateAndAuthorize;
