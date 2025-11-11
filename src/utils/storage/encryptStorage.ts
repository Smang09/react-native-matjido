import EncryptedStorage from 'react-native-encrypted-storage';

import createStorage from './createStorage';

export const encryptedStorage = createStorage(EncryptedStorage);
