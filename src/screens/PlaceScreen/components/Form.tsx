import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Icon,
  useColorMode,
  VStack,
  WarningOutlineIcon,
  TextArea,
} from 'native-base';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PlaceInput } from '../../../generated/graphql';
import { mapDarkStyle, mapStandardStyle } from '../../../shared/helpers/map';
import { useAppSelector } from '../../../store/hooks';
import { initialValues, validationSchema } from './utils/form-props';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PlaceForm = () => {
  const { colorMode } = useColorMode();
  const { location } = useAppSelector((state) => state.location);
  const { t } = useTranslation('common');

  const {
    control,
    formState: { errors },
  } = useForm<PlaceInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const locationsFields = useFieldArray({
    control,
    name: 'locations',
  });
  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" w="80%" py="8">
        <KeyboardAwareScrollView
          contentContainerStyle={{
            width: '100%',
            height: '100%',
          }}
        >
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold"
          >
            {t('site_page.form.title')}
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>{t('site_page.form.name')}</FormControl.Label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    type="name"
                    placeholder={t('site_page.form.name')}
                    onChangeText={field.onChange}
                    {...field}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                    color="red.500"
                  >
                    {message}
                  </FormControl.ErrorMessage>
                )}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                {t('site_page.form.description')}
              </FormControl.Label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextArea
                    placeholder={t('site_page.form.description')}
                    onChangeText={field.onChange}
                    {...field}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                    color="red.500"
                  >
                    {message}
                  </FormControl.ErrorMessage>
                )}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <MapView
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.04864195044303443,
                  longitudeDelta: 0.040142817690068,
                }}
                customMapStyle={
                  colorMode === 'dark' ? mapDarkStyle : mapStandardStyle
                }
                style={{
                  height: '70%',
                  width: '100%',
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  locationsFields.append(e.nativeEvent.coordinate);
                }}
              >
                {locationsFields.fields?.map((location, index) => (
                  <Marker
                    key={`location--marker-${index}`}
                    coordinate={{
                      latitude: Number(location?.latitude),
                      longitude: Number(location?.longitude),
                    }}
                    onPress={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      locationsFields.remove(index);
                      console.log(locationsFields);
                    }}
                  >
                    <Icon
                      as={MaterialCommunityIcons}
                      name="map-marker"
                      size={35}
                      _light={{ color: 'primary.800' }}
                      _dark={{ color: 'primary.300' }}
                    />
                  </Marker>
                ))}
              </MapView>
            </FormControl>
          </VStack>
        </KeyboardAwareScrollView>
        <Button colorScheme="indigo">Sign up</Button>
      </Box>
    </Center>
  );
};

export default PlaceForm;
