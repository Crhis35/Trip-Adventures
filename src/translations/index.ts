import { CustomTypeOptions } from 'react-i18next';
import resources from './resources';

export const config: CustomTypeOptions = {
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'es',
  resources,
  compatibilityJSON: 'v3',
};

export { resources };
