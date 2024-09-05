const axios = require('axios');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Quote = require('../models/Quote');

dotenv.config();

const seedQuotes = async () => {
    await connectDB();

    try {
        // Fetch quotes from external API
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=happiness', {
            headers: { 'X-Api-Key': process.env.API_KEY }
        }, {
            params: { limit: 100 }, // Adjust the limit as needed
        });

        const fetchedQuotes = response.data; // API response structure is a direct array

        // Prepare quotes for insertion
        const quotesToInsert = fetchedQuotes.map((q) => ({
            quote: q.quote, // Correct field
            author: q.author,
            tags: q.tags || [],
        }));

        // Insert quotes into MongoDB
        await Quote.insertMany(quotesToInsert);
        console.log('Quotes seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding quotes:', error.message);
        process.exit(1);
    }
};

seedQuotes();
