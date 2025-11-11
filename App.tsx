import {QueryClientProvider} from '@tanstack/react-query';
import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import queryClient from '@/api/queryClient';
import AppToast from '@/components/common/AppToast';
import {numbers} from '@/constants/numbers';
import useThemeStorage from '@/hooks/useThemeStorage';
import RootNavigation from '@/navigations/RootNavigation';

const App = () => {
  const {theme} = useThemeStorage();

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve =>
        setTimeout(resolve, numbers.BOOTSPLASH_DELAY),
      );
    };

    prepare().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaProvider>
        <RootNavigation />
        <AppToast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
