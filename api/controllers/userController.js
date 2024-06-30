
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Users array
let users = [
    new User('admin', 'admin@email.com', 'password123', 'admin'), // Ejemplo de usuario ADMIN creado con el modelo User
    new User('user', 'user@email.com', 'password123', 'user') // Ejemplo de usuario USER creado con el modelo User
];

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    // Devolver todos los usuarios
    res.json(users.map(user => user.toJSON()));
};

// Registrar un nuevo usuario
exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    // Crear un nuevo usuario usando el modelo User
    const newUser = new User(username, email, password, 'user');

    // Agregar el nuevo usuario a la "base de datos" simulada
    users.push(newUser);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

// Iniciar sesión
exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario por nombre de usuario
    const user = users.find(user => user.username === username);

    // Verificar si el usuario existe
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña usando bcrypt
    if (!user.verifyPassword(password)) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token JWT con el tipo de usuario
    const token = jwt.sign({ username: user.username, email: user.email, type: user.type }, 'secretkey', { expiresIn: '1h' });

    // Devolver el token como respuesta
    res.json({ token });
};


// Actualizar contraseña de un usuario
exports.updatePassword = (req, res) => {
    const { username, newPassword } = req.body;

    // Buscar al usuario por nombre de usuario
    const user = users.find(user => user.username === username);

    // Verificar si el usuario existe
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario tiene permiso para actualizar
    if (req.user.type !== 'admin' && req.user.username !== username) {
        return res.status(403).json({ message: 'No tienes permiso para actualizar este usuario' });
    }

    // Actualizar la contraseña utilizando el método del modelo User
    user.updatePassword(newPassword);

    res.json({ message: 'Contraseña actualizada correctamente' });
};

// Eliminar un usuario por nombre de usuario
exports.deleteUser = (req, res) => {
    const username = req.params.username;

    // Buscar al usuario por nombre de usuario
    const userIndex = users.findIndex(user => user.username === username);

    // Verificar si el usuario existe
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario tiene permiso para eliminar
    if (req.user.type !== 'admin' && req.user.username !== username) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este usuario' });
    }

    users.splice(userIndex, 1);

    res.json({ message: 'Usuario eliminado correctamente' });
};



