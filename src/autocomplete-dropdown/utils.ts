import type { GetHighlightTextOutput } from './types';

export const getHighlightText = (
  searchValue: string,
  rawText: string
): GetHighlightTextOutput => {
  if (!searchValue.length) {
    return {
      rawText,
      highlights: [],
    };
  }
  // TODO: optionally handle spaces in highlighting
  const regex = new RegExp(`(${searchValue.trim()})`, 'gi');
  const splitText = rawText.split(regex);

  return {
    rawText,
    highlights: splitText.map((text) => ({
      text,
      isHighlighted: regex.test(text),
    })),
  };
};
