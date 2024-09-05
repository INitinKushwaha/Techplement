const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  quote: { type: String, required: true }, // Ensure lowercase 'quote'
  author: { type: String, required: true },
  tags: { type: [String], default: [] },
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;
