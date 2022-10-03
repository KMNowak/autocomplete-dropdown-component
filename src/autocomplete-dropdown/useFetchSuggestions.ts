import { useEffect, useState } from 'react';

import { useDebounce } from '../useDebounce';
import { highlightMatchingText } from './utils';

enum RequestStates {
  INIT = 'init',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface UseFetchSuggestionsProps {
  inputValue: string;
  onError?: () => void;
}

export const useFetchSuggestions = ({
  inputValue,
  onError,
}: UseFetchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState([]);
  const searchValue = useDebounce(inputValue);

  useEffect(() => {
    (async () => {
      try {
        if (searchValue.length) {
          const res = await fetch(
            `https://swapi.dev/api/people/?search=${searchValue || ''}`
          );

          if (!res.ok) {
            throw new Error(await res.text());
          }
          const data = await res.json();

          // TODO: add model
          const names = data.results.map(({ name }: { name: string }) => name);

          setSuggestions(names);
        }
      } catch (e) {
        // TODO: handle error
      }
    })();
  }, [searchValue]);

  return suggestions.map((suggestion) =>
    highlightMatchingText(searchValue, suggestion)
  );
};
