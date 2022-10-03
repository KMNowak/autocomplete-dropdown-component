import { highlightMatchingText } from './utils';

export const useFetchSuggestions = (inputValue: string) => {
  const suggestions = ['abcd', 'cdef'];

  return suggestions.map((suggestion) =>
    highlightMatchingText(inputValue, suggestion)
  );
};
