import React from 'react';

function QuoteCard({ quote }) {
    return (
        <div className="quote-card">
            <p>{quote.quote}</p>
            <p className="author">- {quote.author}</p>
        </div>
    );
}

export default QuoteCard;
