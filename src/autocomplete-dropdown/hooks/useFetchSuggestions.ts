import { useEffect, useState } from 'react';

import type { Person } from '../../models/person.interface';
import { RequestState } from '../../types';
import { useDebounce } from '../../useDebounce';
import { getHighlightText } from '../utils';

interface UseFetchSuggestionsProps {
  inputValue: string;
  fetcher: <T extends any>(value: string) => Promise<Response>;
}

export const useFetchSuggestions = ({
  inputValue,
  fetcher,
}: UseFetchSuggestionsProps) => {
  const [fetchStatus, setFetchStatus] = useState(RequestState.INIT);
  const [suggestions, setSuggestions] = useState([]);
  const searchValue = useDebounce(inputValue);

  useEffect(() => {
    (async () => {
      if (searchValue.length) {
        setFetchStatus(RequestState.LOADING);
        const res = await fetcher(searchValue);

        if (!res.ok) {
          setFetchStatus(RequestState.ERROR);

          return;
        }
        const data = await res.json();
        const names = data.results.map(({ name }: Person) => name);

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
