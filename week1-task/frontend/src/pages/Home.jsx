import React, { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import '../index.css';  // Link the CSS for animations and background

const Home = () => {
  const [quote, setQuote] = useState(null);
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/quotes/random');
      setQuote(response.data);
      setAuthorQuotes([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching quote');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuotesByAuthor = async (author) => {
    if (!author.trim()) {
      setError('Please enter an author name.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/quotes/author/${author}`);
      setAuthorQuotes(response.data);
      setQuote(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching quotes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="page-title">Quote of the Day</h1>
        <SearchBar onSearch={fetchQuotesByAuthor} />
        <button onClick={fetchRandomQuote} className="fetch-quote-button">
          Get Random Quote
        </button>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {quote && <QuoteCard quote={quote} />}
        {authorQuotes.length > 0 && (
          <div className="author-quotes">
            <h2>Quotes by {authorQuotes[0].author}</h2>
            {authorQuotes.map((q) => (
              <QuoteCard key={q._id} quote={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
