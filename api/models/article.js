
class Article {
    constructor(id, img, date, title, description) {
        this.id = id,
        this.img = img;
        this.date = date;
        this.title = title;
        this.description = description;
    }

    // Método para obtener los datos del artículo
    toJSON() {
        return {
            id: this.id,
            img: this.img,
            date: this.date,
            title: this.title,
            description: this.description
        };
    }
}

// Exportar el modelo de articulo
module.exports = Article;
