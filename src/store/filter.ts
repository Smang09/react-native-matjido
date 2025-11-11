import {create} from 'zustand';

import {colors} from '@/constants/colors';

interface FilterState {
  filters: Record<string, boolean>;
  setFilters: (filters: Record<string, boolean>) => void;
}

const useFilterStore = create<FilterState>(set => ({
  filters: {
    [colors.light.PINK_LIGHT]: true,
    [colors.light.YELLOW_LIGHT]: true,
    [colors.light.GREEN_LIGHT]: true,
    [colors.light.BLUE_LIGHT]: true,
    [colors.light.PURPLE_LIGHT]: true,
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
  },
  setFilters: filters => {
    set({filters});
  },
}));

export default useFilterStore;
