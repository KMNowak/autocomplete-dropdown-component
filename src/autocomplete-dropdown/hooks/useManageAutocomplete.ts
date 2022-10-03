import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

export const useManageAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [blurEnabled, setBlurEnabled] = useState(true);

  const handleOnInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleOnInputFocus = useCallback(() => {
    setBlurEnabled(true);
    setShowDropdown(true);
  }, []);

  const handleOnInputBlur = () => {
    if (blurEnabled) {
      setShowDropdown(false);
    }
  };

  const handleOnHintClick = useCallback((value: string) => {
    setInputValue(value);
    setShowDropdown(false);
  }, []);

  const handleOnHintMouseDown = useCallback(() => {
    setBlurEnabled(false);
  }, []);

  return {
    inputValue,
    showDropdown,

    handleOnInputChange,
    handleOnInputFocus,
    handleOnInputBlur,
    handleOnHintClick,
    handleOnHintMouseDown,
  };
};
