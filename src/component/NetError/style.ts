import { StyleSheet } from 'react-native';
import { hintTextColor, textColor, whiteColor } from '../../style/colors';
import { thirdTitleFontSize, tipTextFontSize } from '../../style/dimens';

/**
 * 网络错误页面样式
 * @type {{}}
 */
export const netErrorStyle = StyleSheet.create({
    /**
     * 正式页面
     */
    containerStyle: {
        flex: 1,
        backgroundColor: whiteColor,
        alignItems: 'center',
    },
    /**
     * 图标样式
     */
    iconStyle: {
        marginTop: '15%',
        width: 240,
        height: 140,
    },
    /**
     * 主提示语的样式
     */
    mainTipStyle: {
        color: textColor,
        fontSize: thirdTitleFontSize,
        lineHeight: 22,
        marginTop: 20,
        fontWeight: 'bold',
    },
    /**
     * 次级提示语的样式
     */
    subTipStyle: {
        color: hintTextColor,
        marginTop: 5,
        fontSize: tipTextFontSize,
    },
});
