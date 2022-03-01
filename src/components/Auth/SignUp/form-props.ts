import * as Yup from 'yup';
import { UsersPermissionsRegisterInput } from '../../../generated/graphql';

export interface FormProps extends UsersPermissionsRegisterInput {
  confirmedPassword: string;
}

export const initialValues: FormProps = {
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
};

export const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be 6 characters or more'),
  confirmedPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});
