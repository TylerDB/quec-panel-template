import { Dimensions, Platform } from 'react-native';

/**
 * 判断系统是否是IOS
 * @type {boolean}
 */
export const isIOS = Platform.OS === 'ios';
/**
 * 获取屏幕宽度、高度
 */
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('window');
