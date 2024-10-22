const express = require('express');
const app = express();
const port = 3000;

const urlDatabase = {};

app.use(express.static('public'));
app.use(express.json());

app.post('/shorten', (req, res) => {
    const longUrl = req.body.url;
    const shortId = Math.random().toString(36).substring(2, 8);
    urlDatabase[shortId] = longUrl;
    res.json({ shortUrl: `http://localhost:${port}/${shortId}` });
});

app.get('/:shortId', (req, res) => {
    const shortId = req.params.shortId;
    const longUrl = urlDatabase[shortId];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});