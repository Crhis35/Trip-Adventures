import * as Yup from 'yup';
import { UsersPermissionsLoginInput } from '../../../generated/graphql';

export const initialValues: UsersPermissionsLoginInput = {
  identifier: 'test2@test.com',
  password: '12345678',
  provider: 'local',
};

export const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be 6 characters or more'),
});
