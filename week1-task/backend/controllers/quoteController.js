const axios = require('axios');
const Quote = require('../models/quote');

const getRandomQuote = async (req, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=happiness', {
            headers: { 'X-Api-Key': process.env.API_KEY }
        });
        const quote = response.data[0];
        res.json(quote);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quote' });
    }
};

const searchQuoteByAuthor = async (req, res) => {
    try {
        const quotes = await Quote.find({ author: new RegExp(req.params.author, 'i') });
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search quotes' });
    }
};

module.exports = { getRandomQuote, searchQuoteByAuthor };
