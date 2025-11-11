import Ionicons from '@react-native-vector-icons/ionicons';
import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface ActionSheetContextValue {
  onPressOutSide?: (event: GestureResponderEvent) => void;
}

const ActionSheetContext = createContext<ActionSheetContextValue | undefined>(
  undefined,
);

interface ActionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideAction: () => void;
  animationType?: ModalProps['animationType'];
}

const ActionMain = ({
  children,
  isVisible,
  animationType = 'slide',
  hideAction,
  ...props
}: ActionMainProps) => {
  const onPressOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideAction();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={hideAction}
      {...props}>
      <ActionSheetContext value={{onPressOutSide}}>
        {children}
      </ActionSheetContext>
    </Modal>
  );
};

const Background = ({children}: PropsWithChildren) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const actionSheetContext = useContext(ActionSheetContext);

  return (
    <SafeAreaView
      style={styles.actionBackground}
      onTouchEnd={actionSheetContext?.onPressOutSide}>
      {children}
    </SafeAreaView>
  );
};

const Container = ({children}: PropsWithChildren) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.actionContainer}>{children}</View>;
};

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

const Button = ({
  children,
  isDanger = false,
  isChecked = false,
  ...props
}: ButtonProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.actionButtonPressed,
        styles.actionButton,
      ]}
      {...props}>
      <Text style={[styles.actionText, isDanger && styles.dangerText]}>
        {children}
      </Text>

      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors[theme].BLUE} />
      )}
    </Pressable>
  );
};

const Title = ({children}: PropsWithChildren) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

const Divider = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.border} />;
};

interface FilterProps extends PressableProps {
  children: ReactNode;
  isSelected?: boolean;
}

const Filter = ({children, isSelected, ...props}: FilterProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.filterContainer} {...props}>
      <Text style={isSelected ? styles.filterSelectedText : styles.filterText}>
        {children}
      </Text>
      <Ionicons
        name="chevron-down"
        size={22}
        color={isSelected ? colors[theme].BLUE : colors[theme].GRAY_300}
      />
    </Pressable>
  );
};

interface CheckBoxProps extends PressableProps {
  children?: ReactNode;
  icon?: ReactNode;
  isChecked?: boolean;
}

const CheckBox = ({
  children,
  icon = null,
  isChecked = false,
  ...props
}: CheckBoxProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.actionButtonPressed,
        styles.checkBoxContainer,
      ]}
      {...props}>
      <Ionicons
        name={isChecked ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={22}
        color={colors[theme].BLUE}
      />
      {icon}
      <Text style={styles.checkBoxText}>{children}</Text>
    </Pressable>
  );
};

export const ActionSheet = Object.assign(ActionMain, {
  Container,
  Button,
  Title,
  Divider,
  Background,
  Filter,
  CheckBox,
});

const styling = (theme: Theme) =>
  StyleSheet.create({
    actionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    actionContainer: {
      backgroundColor: colors[theme].GRAY_100,
      overflow: 'hidden',
      borderRadius: 15,
      marginHorizontal: 10,
      marginBottom: 10,
    },
    actionButtonPressed: {
      backgroundColor: colors[theme].GRAY_200,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      gap: 5,
    },
    actionText: {
      fontSize: 17,
      fontWeight: '500',
      color: colors[theme].BLUE,
    },
    dangerText: {
      color: colors[theme].RED,
    },
    titleContainer: {
      padding: 15,
      alignItems: 'center',
    },
    titleText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
    border: {
      borderBottomColor: colors[theme].GRAY_200,
      borderBottomWidth: 1,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      gap: 5,
    },
    filterText: {
      color: colors[theme].GRAY_300,
      fontSize: 15,
      fontWeight: '500',
    },
    filterSelectedText: {
      color: colors[theme].BLUE,
      fontSize: 15,
      fontWeight: '500',
    },
    checkBoxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      gap: 10,
    },
    checkBoxText: {
      color: colors[theme].BLACK,
      fontSize: 15,
    },
  });
