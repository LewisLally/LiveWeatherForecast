import React, { useState, useEffect } from 'react';

function SearchBar({ searchLocation, setSearchLocation }) {
  const [value, setValue] = useState(searchLocation);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    fetchSuggestions();
  }, [value]);

  const handleSelectSuggestion = (suggestion) => {
    setValue(suggestion.display_name);
    setSearchLocation(suggestion.display_name);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search Location..."
        style={{ width: '100%', padding: '8px' }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            maxHeight: '150px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          {suggestions.map((sug) => (
            <li
              key={sug.place_id}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
              onClick={() => handleSelectSuggestion(sug)}
            >
              {sug.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;