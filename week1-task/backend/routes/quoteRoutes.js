const express = require('express');
const router = express.Router();
const axios = require('axios');
const Quote = require('../models/Quote');

// Get a random quote and store it
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=happiness', {
      headers: { 'X-Api-Key': process.env.API_KEY }
    });
    const randomQuote = response.data[0];

    // Store the quote in MongoDB
    const quote = new Quote({
      quote: randomQuote.quote,
      author: randomQuote.author
    });
    await quote.save();

    res.json(randomQuote);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching or storing quote' });
  }
});

// Get quotes by author
router.get('/author/:author', async (req, res) => {
  try {
    const quotes = await Quote.find({ author: req.params.author });
    if (quotes.length === 0) {
      return res.status(404).json({ message: 'No quotes found for this author' });
    }
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quotes' });
  }
});

module.exports = router;
