import './styles.css';

import React from 'react';

import { AutocompleteDropdown } from './autocomplete-dropdown';
import type { Person } from './models/person.interface';

const peopleFetcher = (searchValue: string) =>
  fetch(`https://swapi.dev/api/people/?search=${searchValue || ''}`);

function App() {
  return (
    <div>
      <AutocompleteDropdown<Person> fetcher={peopleFetcher} />
    </div>
  );
}

export default App;
