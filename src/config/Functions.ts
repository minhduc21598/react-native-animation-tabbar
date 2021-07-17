import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const WIDTH = w => width * (w / 360);
export const HEIGHT = h => height * (h / 640);

export const getHeight = () => height;
export const getWidth = () => width;

export const getFont = f => f - 2;

export const getLineHeight = f => f;
