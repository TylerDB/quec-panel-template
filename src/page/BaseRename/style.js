import { StyleSheet } from 'react-native';
import { textColor, whiteColor } from '../../style/colors';
import { normalTextFontSize } from '../../style/dimens';

export const baseRenameStyle = StyleSheet.create({

    /**
     * 条目整体样式
     */
    itemContainerStyle: {
        backgroundColor: whiteColor,
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 17,
        paddingTop: 17,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    /**
     * 条目标题的样式
     */
    itemTitleStyle: {
        color: textColor,
        fontSize: normalTextFontSize,
    },
    /**
     * 输入框的样式
     */
    inputTextStyle: {
        padding: 0,
        flex: 1,
        marginStart: 20,
        color: textColor,
        fontSize: normalTextFontSize,
    },
    /**
     * 按钮整体样式
     */
    buttonContainerStyle: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
