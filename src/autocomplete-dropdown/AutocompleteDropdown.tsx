import type { ChangeEvent, FunctionComponent } from 'react';
import { useCallback, useState } from 'react';

import { Hint } from './components/Hint';
import { useFetchSuggestions } from './useFetchSuggestions';

export const AutocompleteDropdown: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [blurEnabled, setBlurEnabled] = useState(true);
  const suggestions = useFetchSuggestions(inputValue);

  const handleOnInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleOnInputFocus = () => {
    setBlurEnabled(true);
    if (suggestions.length > 0) {
      setShowDropdown(true);
    }
    // TODO: refetch on focus
  };

  const handleHintClick = (value: string) => {
    setInputValue(value);
    setShowDropdown(false);
  };

  const handleOnInputBlur = () => {
    if (blurEnabled) {
      setShowDropdown(false);
    }
  };

  const handleOnHintMouseDown = () => {
    setBlurEnabled(false);
  };

  const renderDropdown = () => {
    if (!showDropdown || !suggestions.length) {
      return null;
    }

    return suggestions.map((hint) => (
      <Hint
        key={hint}
        content={hint}
        onClick={() => handleHintClick(hint)}
        onMouseDown={handleOnHintMouseDown}
      />
    ));
  };

  return (
    <div>
      <input
        type={'text'}
        value={inputValue}
        onChange={handleOnInputChange}
        onBlur={handleOnInputBlur}
        onFocus={handleOnInputFocus}
      />
      {renderDropdown()}
    </div>
  );
};
