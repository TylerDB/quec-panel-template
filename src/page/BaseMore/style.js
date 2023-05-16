import { Platform, StyleSheet } from 'react-native';
import { bgColor, primaryColor, secondTextColor, textColor, whiteColor } from '../../style/colors';
import { normalTextFontSize, thirdTitleFontSize } from '../../style/dimens';
import { SCREEN_WIDTH } from '../../style/constant';
import { isIphoneX } from '../../util/ratio';

export const baseMoreStyle = StyleSheet.create({
    /**
     * 整体样式
     */
    containerStyle: {
        backgroundColor: bgColor,
        paddingTop: 10,
    },
    /**
     *条目整体样式
     */
    itemContainerStyle: {
        backgroundColor: '#FFFFFF',
        height: 54,
        paddingStart: 20,
        paddingEnd: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    /**
     * 条目名称样式
     */
    itemNameStyle: {
        fontSize: 15,
        color: textColor,
    },
    /**
     * 条目值的样式
     */
    itemValueStyle: {
        flex: 1,
        fontSize: normalTextFontSize,
        color: secondTextColor,
        textAlign: 'right',
    },
    /**
     * 条目图标样式
     */
    itemIconStyle: {
        width: 22,
        height: 22,
    },
    /**
     * 按钮整体样式
     */
    buttonContainerStyle: {
        height: 44,
        marginRight: 20,
        marginLeft: 20,
        width: SCREEN_WIDTH - 40,
        borderRadius: 10,
        backgroundColor: primaryColor,
        marginTop: 44,
        ...Platform.select({
            android: {
                marginBottom: 20,
            },
            ios: {
                marginBottom: isIphoneX ? 40 : 20,
            },
        }),
    },
    /**
     * 按钮标题颜色
     */
    buttonTitleStyle: {
        color: whiteColor,
        fontSize: thirdTitleFontSize,
        marginTop: 4,
    },
});
