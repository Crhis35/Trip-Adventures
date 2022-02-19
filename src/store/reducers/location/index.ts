import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Coordinates } from '../../../utils/types/locations';

interface LocationState {
  location: Coordinates;
  active: boolean;
}

export const initialState: LocationState = {
  active: false,
  location: {
    latitude: 0,
    longitude: 0,
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<Coordinates>) {
      state.active = true;
      state.location = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
const locationReducer = locationSlice.reducer;
export default locationReducer;
