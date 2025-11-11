const common = {
  PRIMARY: '#2CC8A7',
  PINK: '#FF8082',
  PINK_LIGHT: '#FFB3AB',
  BLUE: '#1C85E8',
  BLUE_LIGHT: '#A7C6FF',
  GREEN_LIGHT: '#A5EACF',
  YELLOW: '#FFC259',
  YELLOW_LIGHT: '#FFE594',
  PURPLE_LIGHT: '#D3C3FF',
  RED: '#FF5F5F',
  UNCHANGE_WHITE: '#FFF',
  UNCHANGE_BLACK: '#000',
};

const colors = {
  light: {
    ...common,
    WHITE: '#FFF',
    GRAY_100: '#F8F8F8',
    GRAY_200: '#E7E7E7',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#000',
  },
  dark: {
    ...common,
    WHITE: '#161616',
    GRAY_100: '#202124',
    GRAY_200: '#3C4043',
    GRAY_300: '#5e5e5e',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#F8F8F8',
    BLACK: '#FFF',
  },
};

export {colors};
