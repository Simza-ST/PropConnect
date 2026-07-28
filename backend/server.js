const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from PropConnect backend!' });
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
