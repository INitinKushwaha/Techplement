const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const quoteRoutes = require('./routes/quoteRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://techplement-2mx3.vercel.app'
}));

app.use('/api/quotes', quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
