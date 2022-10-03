import './hint.css';

import type { FC } from 'react';

import type { Highlight, HighlightMatchingTextOutput } from '../../types';

interface HintProps {
  content: HighlightMatchingTextOutput;
  onClick: () => void;
  onMouseDown: () => void;
}

const HighlightedText = ({ highlights }: { highlights: Highlight[] }) => {
  return (
    <>
      {' '}
      {highlights.map(({ isHighlighted, text }, idx) =>
        isHighlighted ? (
          <span key={idx}>
            <b>{text}</b>
          </span>
        ) : (
          <span key={idx}>{text}</span>
        )
      )}
    </>
  );
};

export const Hint: FC<HintProps> = ({ content, onMouseDown, onClick }) => {
  const { highlights } = content;
  return (
    <div className={'hint'} onClick={onClick} onMouseDown={onMouseDown}>
      <HighlightedText highlights={highlights} />
    </div>
  );
};
