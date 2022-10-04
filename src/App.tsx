import './styles.css';

import React, { useState } from 'react';

import { AutocompleteDropdown } from './autocomplete-dropdown';
import type { Person } from './models/person.interface';

const peopleFetcher = (searchValue: string) =>
  fetch(`https://swapi.dev/api/people/?search=${searchValue || ''}`);

function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <AutocompleteDropdown<Person>
        inputValue={inputValue}
        onChange={(newValue) => setInputValue(newValue)}
        fetchProps={{ fetcher: peopleFetcher, searchProperty: 'name' }}
      />
    </div>
  );
}

export default App;
