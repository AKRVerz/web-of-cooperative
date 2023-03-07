import _ from 'lodash';
import React, { useState } from 'react';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Input, Text } from '@chakra-ui/react';
import styles from './AutoComplete.module.css';
import { RootState } from 'src/store';
import { ReactSetter, ResourceRecord } from 'src/types/resources';
import { RESOURCE_NAME } from 'src/utils/constant';
import { createUserInput } from 'src/utils/styles';
import { getResource } from 'src/store/selectors/resources';
import { getAllUser as _getAlluser } from 'src/store/actions/resources/users';

const renderSuggestion = ({
  username,
}: Koperasi.Resource.ResourceStructure['users']) => (
  <Flex
    px="1rem"
    py="0.7rem"
    alignItems="center"
    gap={3}
    borderBottom="1px solid black"
  >
    <Text fontWeight="semibold" fontSize="sm">
      {username}
    </Text>
  </Flex>
);

const AutoComplete: React.FC<Props> = ({
  keyword,
  setKeyword,
  users,
  placeholder,
  isRequired,
  setUserId,
  onBlur,
  onFocus,
  setIsError,
  setIsTouched,
}) => {
  const [suggestions, setSuggestions] = useState<
    Koperasi.Resource.ResourceStructure['users'][]
  >([]);

  const getSuggestions = (data: ResourceRecord<'users'>, value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : _.values(data.rows).filter(({ username }) =>
          username.toLowerCase().includes(inputValue)
        );
  };

  /** Function to handle clicking on the option */
  const getSuggestionValue = (
    user: Koperasi.Resource.ResourceStructure['users']
  ) => {
    setUserId(user.id);
    setIsError('');
    setIsTouched(true);

    return user.username;
  };

  /** Function to handle changing input value */
  const onChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: ChangeEvent
  ) => {
    setKeyword(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(users, value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'user',
    value: keyword,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={(props: any) => (
        <Input
          type="text"
          placeholder={placeholder ?? 'Nama Anggota'}
          isRequired={isRequired}
          letterSpacing="wider"
          {...createUserInput}
          onBlur={() => {
            props?.onBlur?.();
            onBlur?.();
          }}
          onFocus={() => {
            props?.onFocus?.();
            onFocus?.();
          }}
          {..._.omit(props, ['onBlur', 'onFocus'])}
        />
      )}
      theme={{
        ...defaultTheme,
        input: styles.input,
        inputFocused: styles.inputFocused,
        suggestionsContainer: styles.suggestionsContainer,
        suggestionsContainerOpen: styles.suggestionsContainerOpen,
        suggestionsList: styles.suggestionsList,
        suggestion: styles.suggestion,
        suggestionHighlighted: styles.suggestionHighlighted,
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  users: getResource(RESOURCE_NAME.USERS)(state),
});

const connector = connect(mapStateToProps, {
  getAllUser: _getAlluser,
});
type Props = ConnectedProps<typeof connector> & {
  keyword: string;
  setKeyword: ReactSetter<string>;
  isRequired?: boolean;
  placeholder?: string;
  setUserId: ReactSetter<number | undefined>;
  onFocus?: () => void;
  onBlur?: () => void;
  setIsError: ReactSetter<string>;
  setIsTouched: ReactSetter<boolean>;
};

export default connector(AutoComplete);
