import {StyleSheet} from 'react-native';
import {bgColor, hintTextColor, primaryColor, whiteColor} from '../../style/colors';
import {buttonHeight, normalTextFontSize, thirdTitleFontSize} from '../../style/dimens';

/**
 * 空页面样式
 */
export const emptyViewStyle = StyleSheet.create({
    /**
     * 整体样式
     */
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: bgColor,
    },
    /**
     * 空页面图标样式
     */
    emptyIconStyle: {
        marginTop: 120,
        width: 240,
        height: 140,
    },
    /**
     * 空页面文字样式
     */
    emptyTextStyle: {
        marginTop: 20,
        fontSize: normalTextFontSize,
        color: hintTextColor,
    },
    /**
     * 按钮整体样式
     */
    buttonContainerStyle: {
        height: buttonHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor,
        paddingStart: 39,
        paddingEnd: 39,
        marginTop: 54,
        borderRadius: 8,
    },
    /**
     * 按钮文本样式
     */
    buttonTextStyle: {
        fontSize: thirdTitleFontSize,
        color: whiteColor,
    },
});
