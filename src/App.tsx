import React from 'react';

import { AutocompleteDropdown } from './autocomplete-dropdown';

const peopleFetcher = (searchValue: string) =>
  fetch(`https://swapi.dev/api/people/?search=${searchValue || ''}`);

function App() {
  return (
    <div>
      <AutocompleteDropdown fetcher={peopleFetcher} />
    </div>
  );
}

export default App;
