export interface GetHighlightTextOutput {
  rawText: string;
  highlights: Highlight[];
}

export interface Highlight {
  text: string;
  isHighlighted: boolean;
}
