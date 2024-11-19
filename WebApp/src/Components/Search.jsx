import React, { useState } from "react";
import PropTypes from 'prop-types';

const Search = ({items}) => {
  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Recherche</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher..."
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
Search.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Search;
