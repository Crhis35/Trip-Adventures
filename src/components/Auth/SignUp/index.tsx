import React from 'react';

import {
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Link,
  Stack,
  VStack,
  WarningOutlineIcon,
  Text,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { FormProps, initialValues, validationSchema } from './form-props';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import AuthScreen from '../../../screens/Auth/Auth';
import { useTranslation } from 'react-i18next';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRegisterMutation } from '../../../generated/graphql';
import { BaseUrl } from '../../../shared/constants';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/reducers/user';
import Loading from '../../../shared/components/Loading';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const SignUp: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { mutate, isLoading } = useRegisterMutation(
    {
      endpoint: BaseUrl,
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    },
    {
      onSuccess: ({ register }) => {
        if (register) {
          const data = {
            jwt: register.jwt,
            user: {
              id: register.user.id,
              username: register.user.username,
              email: register.user.email,
              blocked: register.user.blocked,
              confirmed: register.user.confirmed,
            },
          };
          dispatch(setUser(data));
        }
      },
      onError: (error) => {
        toast.closeAll();
        const description =
          error instanceof Error
            ? error.toString().replace(/^Error:\s*/, '')
            : 'error connecting to server';

        toast.show({
          title: 'Something went wrong',
          status: 'error',
          description,
        });
      },
    }
  );

  const onSubmit = async (data: FormProps) => {
    const input = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    await mutate({ input });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthScreen title={t('auth_page.title')}>
      <VStack space={4} alignItems="center">
        <Center
          w="100%"
          rounded={'md'}
          h={'sm'}
          _web={{
            height: '100vh',
          }}
        >
          <VStack space={4} alignItems="center">
            <FormControl isRequired isInvalid={Boolean(errors.username)} w="xs">
              <Stack mx="4">
                <FormControl.Label>
                  {t('auth_page.signUp.username')}
                </FormControl.Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={t('auth_page.signUp.username')}
                      onChangeText={field.onChange}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                      color="red.500"
                    >
                      {message}
                    </FormControl.ErrorMessage>
                  )}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(errors.email)} w="xs">
              <Stack mx="4">
                <FormControl.Label>
                  {t('auth_page.signUp.email')}
                </FormControl.Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={t('auth_page.signUp.email')}
                      onChangeText={field.onChange}
                      autoCapitalize="none"
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                      color="red.500"
                    >
                      {message}
                    </FormControl.ErrorMessage>
                  )}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(errors.password)} w="xs">
              <Stack mx="4">
                <FormControl.Label>
                  {t('auth_page.signUp.password')}
                </FormControl.Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder={t('auth_page.signUp.password')}
                      onChangeText={field.onChange}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                      color="red.500"
                    >
                      {message}
                    </FormControl.ErrorMessage>
                  )}
                />
              </Stack>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={Boolean(errors.confirmedPassword)}
              w="xs"
            >
              <Stack mx="4">
                <FormControl.Label>
                  {t('auth_page.signUp.confirmedPassword')}
                </FormControl.Label>
                <Controller
                  control={control}
                  name="confirmedPassword"
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder={t('auth_page.signUp.confirmedPassword')}
                      onChangeText={field.onChange}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirmedPassword"
                  render={({ message }) => (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                      color="red.500"
                    >
                      {message}
                    </FormControl.ErrorMessage>
                  )}
                />
                <Button
                  isDisabled={!isValid}
                  mt="2"
                  onPress={() => handleSubmit(onSubmit)()}
                >
                  {t('auth_page.signUp.submit')}
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {t('auth_page.signUp.sign_in.title')}{' '}
                  </Text>
                  <Link
                    _text={{
                      color: 'indigo.500',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={() => navigation.navigate('SignIn')}
                  >
                    {t('auth_page.signUp.sign_in.link')}
                  </Link>
                </HStack>
              </Stack>
            </FormControl>
          </VStack>
        </Center>
      </VStack>
    </AuthScreen>
  );
};

export default SignUp;
