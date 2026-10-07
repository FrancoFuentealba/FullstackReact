import React from 'react';
import Input from '../atoms/Input';
import Boton from '../atoms/Boton';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  return (
    <div className="search-bar">
      <Input type="text" placeholder="Buscar..." value={searchTerm} onChange={onSearchChange} />
      <Boton texto="Buscar" onClick={onSearchSubmit} />
    </div>
  );
};

export default SearchBar;
