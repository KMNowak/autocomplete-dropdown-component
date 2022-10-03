import './hint.css';

import type { CSSProperties, FC } from 'react';
import { useCallback } from 'react';

import type { GetHighlightTextOutput } from '../../types';

// TODO: pass variables colors
interface HintProps {
  content: GetHighlightTextOutput;
  onItemClick: (value: string) => void;
  onMouseDown: () => void;
  highlightStyle?: CSSProperties;
  textStyle?: CSSProperties;
}

export const Hint: FC<HintProps> = ({
  content,
  onMouseDown,
  onItemClick,
  textStyle = {},
  highlightStyle = {},
}) => {
  const { highlights, rawText } = content;

  const handleClick = useCallback(() => {
    onItemClick(rawText);
  }, [rawText, onItemClick]);

  return (
    <div className={'hint'} onClick={handleClick} onMouseDown={onMouseDown}>
      {highlights.map(({ isHighlighted, text }, idx) => (
        <span
          key={`${text}-${idx}`}
          className={isHighlighted ? 'highlighted' : undefined}
          style={{ ...textStyle, ...highlightStyle }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};
