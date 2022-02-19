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
import { initialValues, validationSchema } from './form-props';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import AuthScreen from '../../../screens/Auth/Auth';
import { useTranslation } from 'react-i18next';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Loading from '../../../shared/Loading';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/reducers/user';
import {
  useLoginMutation,
  UsersPermissionsLoginInput,
} from '../../../generated/graphql';
import { BaseUrl } from '../../../shared/constants';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const SignIn: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { mutate, isLoading } = useLoginMutation(
    {
      endpoint: BaseUrl,
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    },
    {
      onSuccess: ({ login }) => {
        if (login) {
          const data = {
            jwt: login.jwt,
            user: {
              id: login.user.id,
              username: login.user.username,
              email: login.user.email,
              blocked: login.user.blocked,
              confirmed: login.user.confirmed,
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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const { t } = useTranslation('common');
  const onSubmit = async (input: UsersPermissionsLoginInput) => {
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
            <FormControl
              isRequired
              isInvalid={Boolean(errors.identifier)}
              w="xs"
            >
              <Stack mx="4">
                <FormControl.Label>
                  {t('auth_page.signIn.email')}
                </FormControl.Label>
                <Controller
                  control={control}
                  name="identifier"
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder={t('auth_page.signIn.email')}
                      onChangeText={field.onChange}
                      autoCapitalize="none"
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="identifier"
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
                  {t('auth_page.signIn.password')}
                </FormControl.Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder={t('auth_page.signIn.password')}
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
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  {t('auth_page.signIn.forgot_password')}
                </Link>
                <Button
                  isDisabled={!isValid}
                  isLoading={isLoading}
                  mt="2"
                  onPress={() => handleSubmit(onSubmit)()}
                >
                  {t('auth_page.signIn.submit')}
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {t('auth_page.signIn.sign_up.title')}
                  </Text>
                  <Link
                    _text={{
                      color: 'indigo.500',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    {t('auth_page.signIn.sign_up.link')}
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

export default SignIn;
