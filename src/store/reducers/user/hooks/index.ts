import { useAppSelector, useAppDispatch } from '../../../hooks';
import { removeUser } from '..';
import { useQueryClient } from 'react-query';
import {
  UsersPermissionsLoginPayload,
  UsersPermissionsMe,
  UsersPermissionsUser,
} from '../../../../generated/graphql';

export function useUser(): {
  user:
    | UsersPermissionsUser
    | UsersPermissionsMe
    | UsersPermissionsLoginPayload
    | null
    | undefined;
  removeCurrentUser: () => void;
} {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const removeCurrentUser = () => {
    dispatch(removeUser());
    queryClient.setQueryData('me', null);
  };

  return {
    user: currentUser?.user,
    removeCurrentUser: removeCurrentUser,
  };
}
