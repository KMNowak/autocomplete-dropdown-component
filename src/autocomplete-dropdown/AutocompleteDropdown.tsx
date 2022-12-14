import './autocomplete-dropdown.css';

import type { CSSProperties, ReactElement } from 'react';

import { RequestState } from '../types';
import { Hint } from './components/Hint';
import { useFetchSuggestions } from './hooks/useFetchSuggestions';
import { useManageAutocomplete } from './hooks/useManageAutocomplete';

interface AutocompleteDropdownProps<T extends Record<string, any>> {
  inputValue: string;
  onChange: (newValue: string) => void;
  fetchProps: {
    fetcher: (value: string) => Promise<Response>;
    searchProperty: keyof T;
  };
  placeholder?: string;
  inputStyle?: CSSProperties;
  LoaderComponent?: () => ReactElement;
  ErrorComponent?: () => ReactElement;
  hintProps?: {
    highlightStyle?: CSSProperties;
    textStyle?: CSSProperties;
  };
}

export const AutocompleteDropdown = <T extends Record<string, any>>({
  inputValue,
  onChange,
  placeholder,
  fetchProps: { fetcher, searchProperty },
  inputStyle,
  LoaderComponent,
  ErrorComponent,
  hintProps,
}: AutocompleteDropdownProps<T>) => {
  const {
    handleOnInputChange,
    handleOnInputFocus,
    handleOnInputBlur,
    handleOnHintMouseDown,
    handleOnHintClick,
    showDropdown,
  } = useManageAutocomplete(onChange);
  const { suggestions, fetchStatus } = useFetchSuggestions<T>({
    inputValue,
    fetcher,
    searchProperty,
  });

  const renderContent = () => {
    if (fetchStatus === RequestState.LOADING && showDropdown) {
      return LoaderComponent ? (
        <LoaderComponent />
      ) : (
        <div className={'loader'}>Loading...</div>
      );
    }

    if (fetchStatus === RequestState.ERROR && showDropdown) {
      return ErrorComponent ? (
        <ErrorComponent />
      ) : (
        <div className={'error'}>An error occurred. Please try again.</div>
      );
    }

    if (!showDropdown || !suggestions.length || !inputValue.length) {
      return null;
    }

    return suggestions.map((hint, idx) => (
      <Hint
        key={`${hint.rawText}-${idx}`}
        content={hint}
        onItemClick={handleOnHintClick}
        onMouseDown={handleOnHintMouseDown}
        highlightStyle={hintProps?.highlightStyle}
        textStyle={hintProps?.textStyle}
      />
    ));
  };

  return (
    <div className={'autocomplete'}>
      <input
        className={'input'}
        type={'text'}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleOnInputChange}
        onBlur={handleOnInputBlur}
        onFocus={handleOnInputFocus}
        style={inputStyle}
      />
      <div className={'dropdown'}>{renderContent()}</div>
    </div>
  );
};
