
class Quote {
    constructor(id, img, date, author, text) {
        this.id = id;
        this.img = img;
        this.date = date;
        this.author = author;
        this.text = text;
    }

    // Método para obtener los datos de la cita
    toJSON() {
        return {
            id: this.id,
            img: this.img,
            date: this.date,
            author: this.author,
            text: this.text
        };
    }
}

// Exportar el modelo de cita
module.exports = Quote;
