import './autocomplete-dropdown.css';

import type { CSSProperties, ReactElement } from 'react';

import { RequestState } from '../types';
import { Hint } from './components/Hint';
import { useFetchSuggestions } from './hooks/useFetchSuggestions';
import { useManageAutocomplete } from './hooks/useManageAutocomplete';

interface AutocompleteDropdownProps {
  fetcher: (value: string) => Promise<Response>;
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
  placeholder,
  fetcher,
  inputStyle,
  LoaderComponent,
  ErrorComponent,
  hintProps,
}: AutocompleteDropdownProps) => {
  const {
    handleOnInputChange,
    handleOnInputFocus,
    handleOnInputBlur,
    inputValue,
    handleOnHintMouseDown,
    handleOnHintClick,
    showDropdown,
  } = useManageAutocomplete();
  const { suggestions, fetchStatus } = useFetchSuggestions<T>({
    inputValue,
    fetcher,
    searchProperty: 'name',
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

  // TODO: A11y

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
