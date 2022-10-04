import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

export const useManageAutocomplete = (onChange: (value: string) => void) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [blurEnabled, setBlurEnabled] = useState(true);

  const handleOnInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
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
    onChange(value);
    setShowDropdown(false);
  }, []);

  const handleOnHintMouseDown = useCallback(() => {
    setBlurEnabled(false);
  }, []);

  return {
    showDropdown,

    handleOnInputChange,
    handleOnInputFocus,
    handleOnInputBlur,
    handleOnHintClick,
    handleOnHintMouseDown,
  };
};
