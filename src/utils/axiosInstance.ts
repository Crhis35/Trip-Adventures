import { BaseUrl } from '../shared/constants';

import { useCallback } from 'react';
import { GraphQLClient, request } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useAppSelector } from '../store/hooks';

export function useGraphqlRequest() {
  const { currentUser } = useAppSelector((state) => state.user);
  const jwt = currentUser?.jwt;

  const client = new GraphQLClient(BaseUrl, {
    mode: 'cors',
    ...(jwt && {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  });

  return useCallback(
    <TDocument = any, TVariables = Record<string, any>>(
      document: RequestDocument | TypedDocumentNode<TDocument, TVariables>,
      variables?: TVariables
    ) => client.request<TDocument, TVariables>(document, variables),
    [jwt]
  );
}
