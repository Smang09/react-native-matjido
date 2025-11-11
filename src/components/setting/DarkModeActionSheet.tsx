import React from 'react';
import {useColorScheme} from 'react-native';

import useThemeStorage from '@/hooks/useThemeStorage';

import {ActionSheet} from '../common/ActionSheet';

interface DarkModeActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
}

const DarkModeActionSheet = ({
  isVisible,
  hideAction,
}: DarkModeActionSheetProps) => {
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();
  const systemDefault = useColorScheme();

  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideAction();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideAction();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideAction();
  };

  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button
            isChecked={isSystem === false && theme === 'light'}
            onPress={handlePressLight}>
            라이트 모드
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button
            isChecked={isSystem === false && theme === 'dark'}
            onPress={handlePressDark}>
            다크 모드
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button
            isChecked={isSystem === true}
            onPress={handlePressSystem}>
            시스템 기본값
          </ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
};

export default DarkModeActionSheet;
