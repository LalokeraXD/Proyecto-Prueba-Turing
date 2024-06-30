// userModel.js

const bcrypt = require('bcryptjs');

class User {
    constructor(username, email, password, type) {
        this.username = username;
        this.email = email;
        this.passwordHash = bcrypt.hashSync(password, 10); // Hash de la contraseña usando bcrypt
        this.type = type;
    }

    // Método para verificar la contraseña
    verifyPassword(password) {
        return bcrypt.compareSync(password, this.passwordHash);
    }

     // Método para actualizar la contraseña
     updatePassword(newPassword) {
        this.passwordHash = bcrypt.hashSync(newPassword, 10); // Actualizar el hash de la contraseña
    }

    // Método para obtener los datos del usuario (sin la contraseña)
    toJSON() {
        return {
            username: this.username,
            email: this.email,
            password: this.passwordHash,
            type: this.type
        };
    }
}

// Exportar el modelo de usuario
module.exports = User;
