import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { RepoItem } from './RepoItem';
import { TextButton } from './components/TextButton';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { useGetGithubRepoByUsernameQuery } from 'app/services/api/GithubRepoApi';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';

export function GithubRepoForm() {
  const [username, setUsername] = useState<string>('react-boilerplate');
  const {
    data: repos = [],
    isLoading,
    error,
  } = useGetGithubRepoByUsernameQuery(username);

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.currentTarget.value);
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <FormLabel>Github Username</FormLabel>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Type any Github username"
            value={username}
            onChange={onChangeUsername}
          />
          {isLoading && <LoadingIndicator small />}
        </InputWrapper>
      </FormGroup>
      {repos!.length > 0 ? (
        <List>
          {repos!.map(repo => (
            <RepoItem
              key={repo.id}
              name={repo.name}
              starCount={repo.stargazers_count}
              url={repo.html_url}
            />
          ))}
        </List>
      ) : error ? (
        <ErrorText>{'data' in error && getErrorText(error.data)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

function getErrorText(error: any) {
  if (error.message) {
    return error.message;
  }
  if (error.data) {
    return JSON.stringify(error.data);
  }
  return 'Unknown error';
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const List = styled.div``;
