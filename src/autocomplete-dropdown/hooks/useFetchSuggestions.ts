import { useEffect, useState } from 'react';

import { RequestState } from '../../types';
import { useDebounce } from '../../useDebounce';
import { getHighlightText } from '../utils';

interface UseFetchSuggestionsProps<T extends Record<string, any>> {
  inputValue: string;
  fetcher: (value: string) => Promise<Response>;
  searchProperty: keyof T;
}

export const useFetchSuggestions = <T extends Record<string, any>>({
  inputValue,
  fetcher,
  searchProperty,
}: UseFetchSuggestionsProps<T>) => {
  const [fetchStatus, setFetchStatus] = useState(RequestState.INIT);
  const [suggestions, setSuggestions] = useState([]);
  const searchValue = useDebounce(inputValue);

  useEffect(() => {
    (async () => {
      if (!searchValue.length) {
        setSuggestions([]);
      } else {
        setFetchStatus(RequestState.LOADING);
        const res = await fetcher(searchValue);

        if (!res.ok) {
          setFetchStatus(RequestState.ERROR);

          return;
        }
        const data = await res.json();
        const names = data.results.map((result: T) => result[searchProperty]);

        setFetchStatus(RequestState.SUCCESS);
        setSuggestions(names);
      }
    })();
  }, [searchValue]);

  return {
    suggestions: suggestions.map((suggestion) =>
      getHighlightText(searchValue, suggestion)
    ),
    fetchStatus,
  };
};
