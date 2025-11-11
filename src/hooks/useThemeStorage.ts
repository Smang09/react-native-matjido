import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {storageKeys} from '@/constants/keys';
import useThemeStore, {Theme} from '@/store/theme';
import {asyncStorage} from '@/utils/storage/asyncStorage';

const useThemeStorage = () => {
  const systemTheme = useColorScheme() ?? 'light';
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();

  const setMode = async (mode: Theme) => {
    await asyncStorage.set(storageKeys.THEME_MODE, mode);
    setTheme(mode);
  };

  const setSystem = async (flag: boolean) => {
    await asyncStorage.set(storageKeys.THEME_SYSTEM, flag);
    setSystemTheme(flag);
  };

  useEffect(() => {
    (async () => {
      const mode =
        (await asyncStorage.get<Theme>(storageKeys.THEME_MODE)) ?? 'light';
      const systemMode =
        (await asyncStorage.get<boolean>(storageKeys.THEME_SYSTEM)) ?? false;

      const newMode = systemMode ? systemTheme : mode;

      setTheme(newMode);
      setSystemTheme(systemMode);
    })();
  }, [setSystemTheme, setTheme, systemTheme]);

  return {theme, isSystem, setMode, setSystem};
};

export default useThemeStorage;
