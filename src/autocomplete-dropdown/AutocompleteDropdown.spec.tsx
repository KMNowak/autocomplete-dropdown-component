import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RequestState } from '../types';
import { AutocompleteDropdown } from './AutocompleteDropdown';
import * as useFetchSuggestionsHook from './hooks/useFetchSuggestions';

const getFetcherStub = () => (_value: string) => {
  return Promise.resolve({
    ok: true,
    json(): Promise<unknown> {
      return Promise.resolve();
    },
  } as Response);
};

describe('AutocompleteDropdown', () => {
  test('should show loader when fetching hints', () => {
    jest
      .spyOn(useFetchSuggestionsHook, 'useFetchSuggestions')
      .mockImplementation(() => ({
        suggestions: [],
        fetchStatus: RequestState.LOADING,
      }));

    const { getByText, getByRole } = render(
      <AutocompleteDropdown
        inputValue={'asd'}
        onChange={() => null}
        fetchProps={{ fetcher: getFetcherStub(), searchProperty: '' }}
      />
    );

    userEvent.click(getByRole('textbox'));

    expect(getByText(/Loading/)).toBeInTheDocument();
  });

  test('should show error message when fetching failed', () => {
    jest
      .spyOn(useFetchSuggestionsHook, 'useFetchSuggestions')
      .mockImplementation(() => ({
        suggestions: [],
        fetchStatus: RequestState.ERROR,
      }));

    const { getByText, getByRole } = render(
      <AutocompleteDropdown
        inputValue={'asd'}
        onChange={() => null}
        fetchProps={{ fetcher: getFetcherStub(), searchProperty: '' }}
      />
    );

    userEvent.click(getByRole('textbox'));

    expect(getByText(/error/)).toBeInTheDocument();
  });

  test('should show hints when fetching succeeds', () => {
    const selectedRawText = 'baasd';
    jest
      .spyOn(useFetchSuggestionsHook, 'useFetchSuggestions')
      .mockImplementation(() => ({
        suggestions: [
          {
            highlights: [
              { isHighlighted: false, text: 'ba' },
              { isHighlighted: true, text: 'asd' },
            ],
            rawText: selectedRawText,
          },
          {
            highlights: [{ isHighlighted: false, text: 'efg' }],
            rawText: 'efg',
          },
        ],
        fetchStatus: RequestState.SUCCESS,
      }));

    const { getByText, getByRole } = render(
      <AutocompleteDropdown
        inputValue={'asd'}
        onChange={() => null}
        fetchProps={{ fetcher: getFetcherStub(), searchProperty: '' }}
      />
    );

    userEvent.click(getByRole('textbox'));

    expect(getByText(/ba/)).toBeInTheDocument();
    expect(getByText(/efg/)).toBeInTheDocument();
  });

  test('should pass clicked hint to the onChange event', () => {
    const selectedRawText = 'basd';
    jest
      .spyOn(useFetchSuggestionsHook, 'useFetchSuggestions')
      .mockImplementation(() => ({
        suggestions: [
          {
            highlights: [
              { isHighlighted: false, text: 'b' },
              { isHighlighted: true, text: 'asd' },
            ],
            rawText: selectedRawText,
          },
          {
            highlights: [{ isHighlighted: false, text: 'efg' }],
            rawText: 'efg',
          },
        ],
        fetchStatus: RequestState.SUCCESS,
      }));

    const onChange = jest.fn(() => null);

    const { getByRole, getAllByRole } = render(
      <AutocompleteDropdown
        inputValue={'asd'}
        onChange={onChange}
        fetchProps={{ fetcher: getFetcherStub(), searchProperty: '' }}
      />
    );

    userEvent.click(getByRole('textbox'));
    userEvent.click(getAllByRole('option')[0]);

    expect(onChange).toHaveBeenCalledWith(selectedRawText);
  });
});
