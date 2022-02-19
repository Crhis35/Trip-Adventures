import { UsersPermissionsUser } from '../../generated/graphql';

export interface User extends UsersPermissionsUser {
  id: string | number;
}
