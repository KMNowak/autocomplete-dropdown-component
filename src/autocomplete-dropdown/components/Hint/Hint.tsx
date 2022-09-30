import './hint.css';

import type { FC } from 'react';

interface HintProps {
  content: string;
  onClick: () => void;
  onMouseDown: () => void;
  // TODO: add matching text
}

export const Hint: FC<HintProps> = ({ content, onMouseDown, onClick }) => {
  return (
    <div className={'hint'} onClick={onClick} onMouseDown={onMouseDown}>
      {content}
    </div>
  );
};
