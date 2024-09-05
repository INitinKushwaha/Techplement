import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(author);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Search by author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border p-2 rounded w-full focus:border-blue-500 transition-all"
            />
            <button type="submit" className="search">Search</button>
        </form>
    );
}

export default SearchBar;
