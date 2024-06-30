const Quote = require("../models/quote");

// Quotes array
let quotes = [
    new Quote(1, 'https://cdn.urbantecno.com/urbantecno/s/2023-01-05-11-27-elon-musk.png', '2017', 'Elon Musk', 'La inteligencia artificial es probablemente la mayor amenaza a la que enfrenta nuestra civilización. Creo que las posibilidades de que estemos viviendo en una simulación computacional son una en mil millones.'),
    new Quote(2, 'https://s.rfi.fr/media/display/69e8bcce-1701-11ea-90d6-005056bf7c53/w:1280/p:1x1/stephen_hawking_0.jpg', '2014', 'Stephen Hawking', 'El desarrollo pleno de la inteligencia artificial podría significar el fin de la raza humana.'),
    new Quote(3, 'https://www.elcorreo.com/xlsemanal/wp-content/uploads/sites/5/2023/04/alan-turing-inventor-informatica-espia-codigo-enigma-segunda-guerra-mundial.jpg', '1950', 'Alan Turing', 'A menos que nuestra máquina de pensar sea programable, no tiene sentido esperar que llegue a ser más inteligente que nosotros.'),
    new Quote(4, 'https://imgmedia.libero.pe/652x365/libero/original/2024/06/22/667715d4123eed5bab5a99be.webp', '2015', 'Bill Gates', 'La inteligencia artificial es una herramienta increíblemente poderosa, pero debemos ser cautelosos sobre cómo la aplicamos.')
];

// Obtener todas las citas
exports.getAllQuotes = (req, res) => {
    res.json(quotes.map(quote => quote.toJSON()));
};

// Crear una nueva cita
exports.createQuote = (req, res) => {
    const { img, author, text, date } = req.body;
    const newQuote = new Quote(quotes.length + 1, img, date, author, text);
    quotes.push(newQuote);
    res.status(201).json(newQuote.toJSON());
};

// Actualizar una cita por id
exports.updateQuoteById = (req, res) => {
    const { id } = req.params;
    const { img, author, text, date } = req.body;

    const quote = quotes.find(q => q.id == id);
    if (!quote) {
        return res.status(404).json({ message: 'Cita no encontrada' });
    }

    quote.img = img || quote.img;
    quote.author = author || quote.author;
    quote.text = text || quote.text;
    quote.date = date || quote.date;

    res.json({ message: 'Cita actualizada correctamente', quote: quote.toJSON() });
};

// Eliminar una cita por id
exports.deleteQuoteById = (req, res) => {
    const { id } = req.params;
    const quoteIndex = quotes.findIndex(q => q.id == id);

    if (quoteIndex === -1) {
        return res.status(404).json({ message: 'Cita no encontrada' });
    }

    quotes.splice(quoteIndex, 1);

    res.json({ message: 'Cita eliminada correctamente' });
};
