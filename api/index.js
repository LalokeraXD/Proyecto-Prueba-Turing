const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouters = require('./routers/routers');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.use('/', apiRouters);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
