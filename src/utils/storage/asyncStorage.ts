import AsyncStorage from '@react-native-async-storage/async-storage';

import createStorage from './createStorage';

export const asyncStorage = createStorage(AsyncStorage);
