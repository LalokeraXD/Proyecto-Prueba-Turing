const Article = require("../models/article");

// Articles array
let articles = [
    new Article(1, 'https://mexico.unir.net/wp-content/uploads/sites/6/2021/10/medicina_ia_shutterstock_618326639.jpg', '2024-06-25', 'El impacto de la IA en la medicina moderna', 'Descubre cómo la inteligencia artificial está revolucionando la medicina moderna a través de diagnósticos más precisos y tratamientos personalizados.'),
    new Article(2, 'https://www.geotab.com/CMS-Media-production/ES-LATAM/Blog/2021/December/AIChile/Chile-AI-Hero-@2%20(1).jpg', '2024-06-20', 'IA en el transporte: Un futuro autónomo', 'Explora las innovaciones en el transporte impulsadas por la IA, desde vehículos autónomos hasta la optimización del tráfico.'),
    new Article(3, 'https://aulasimple.ai/blog/wp-content/uploads/2024/01/beneficios-de-la-inteligencia-artificial-en-la-educacion.jpg', '2024-06-15', 'El rol de la IA en la educación', 'Aprende cómo la IA está transformando la educación, ofreciendo experiencias de aprendizaje personalizadas y mejorando los resultados educativos.'),
    new Article(4, 'https://www.gaceta.unam.mx/wp-content/uploads/2024/04/240401-aca8-des-f1-La-IA-podria-reducir-costos.jpg', '2024-06-10', 'La IA en el sector financiero', 'Analiza cómo la inteligencia artificial está cambiando la forma en que los bancos y las instituciones financieras operan, mejorando la seguridad y la eficiencia.'),
    new Article(5, 'https://cdn-images-cr.sindyk.com/9by0Ii43dWcsy9Lprn6pUA9AEzqhZatisoQW7GgxCME/rs:fit/w:420/h:0/aHR0cHM6Ly9oYXpy/ZXZpc3RhLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/Mi9pYS1tZWRpby1h/bWJpZW50ZS5qcGc.webp?v=1', '2024-06-05', 'IA y la sostenibilidad ambiental', 'Descubre cómo la IA está siendo utilizada para abordar problemas ambientales críticos y promover la sostenibilidad global.'),
    new Article(6, 'https://iccsi.com.ar/wp-content/uploads/como-ayuda-la-ia-en-la-industria-del-juego.webp', '2024-06-01', 'El futuro de la IA en el entretenimiento', 'Explora cómo la inteligencia artificial está revolucionando la industria del entretenimiento, desde la creación de contenido hasta la personalización de experiencias.')
];

// Obtener todos los artículos
exports.getAllArticles = (req, res) => {
    res.json(articles.map(article => article.toJSON()));
};

// Publicar un nuevo artículo
exports.createArticle = (req, res) => {
    const { img, date, title, description } = req.body;
    const id = articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;
    const newArticle = new Article(id, img, date, title, description);
    articles.push(newArticle);
    res.status(201).json({ message: 'Artículo creado exitosamente', article: newArticle.toJSON() });
};

// Actualizar un artículo por ID
exports.updateArticleById = (req, res) => {
    const { id } = req.params;
    const { img, date, title, description } = req.body;
    const article = articles.find(article => article.id === parseInt(id));

    if (!article) {
        return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    article.img = img || article.img;
    article.date = date || article.date;
    article.title = title || article.title;
    article.description = description || article.description;

    res.json({ message: 'Artículo actualizado correctamente', article: article.toJSON() });
};

// Eliminar un artículo por ID
exports.deleteArticleById = (req, res) => {
    const { id } = req.params;
    const articleIndex = articles.findIndex(article => article.id === parseInt(id));

    if (articleIndex === -1) {
        return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    articles.splice(articleIndex, 1);

    res.json({ message: 'Artículo eliminado correctamente' });
};



