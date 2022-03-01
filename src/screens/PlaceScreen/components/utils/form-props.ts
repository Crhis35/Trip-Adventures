import * as Yup from 'yup';
import { PlaceInput } from '../../../../generated/graphql';

export const initialValues: PlaceInput = {
  name: '',
  locations: [],
  description: '',
  photos: [],
  category: '',
  networks: [],
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  locations: Yup.array(
    Yup.object().shape({
      longitude: Yup.number().required('Longitude is required'),
      latitude: Yup.number().required('Latitude is required'),
    })
  ).required('Locations is required'),
  description: Yup.string().required('Description is required'),
  photos: Yup.array(),
  category: Yup.string().required('Category is required'),
  networks: Yup.array(),
});
