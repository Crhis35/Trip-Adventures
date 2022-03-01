import { useAppSelector, useAppDispatch } from '../../../hooks';
import { removeUser } from '..';
import { useQueryClient } from 'react-query';
import { User } from '../../../../utils/types/user';

export function useUser(): {
  user: User | null | undefined;
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
