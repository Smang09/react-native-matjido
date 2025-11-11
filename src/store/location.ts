import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng | null) => void;
  setSelectLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (location: LatLng | null) => {
    set(state => ({...state, moveLocation: location}));
  },
  setSelectLocation: (location: LatLng | null) => {
    set(state => ({...state, selectLocation: location}));
  },
}));

export default useLocationStore;
