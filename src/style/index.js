import React, { Platform, StyleSheet } from 'react-native';
import { bgColor, disableTextColor, dividerColor, hintTextColor, primaryColor, textColor, whiteColor } from './colors';
import { buttonHeight, secondTitleFontSize, thirdTitleFontSize } from './dimens';

/**
 * 定义公共样式类
 */
export const styles = StyleSheet.create({
    /**
     * 页面整体样式
     */
    containerStyle: {
        backgroundColor: bgColor,
        flex: 1,
    },

    /**
     * 分割线样式
     */
    itemSeparatorStyle: {
        flex: 1,
        height: 0.5,
        backgroundColor: dividerColor,
        marginStart: 20,
    },
    /**
     * 按钮样式
     */
    buttonStyle: {
        backgroundColor: primaryColor,
        marginStart: 20,
        marginEnd: 20,
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 8,
        height: buttonHeight,
    },
    /**
     * 按钮不可用的样式
     */
    buttonDisableStyle: {
        marginTop: 40,
        marginStart: 20,
        marginEnd: 20,
        backgroundColor: dividerColor,
        borderRadius: 8,
        height: buttonHeight,
    },
    /**
     * 按钮禁用时文字样式
     */
    buttonDisableTitleStyle: {
        fontSize: thirdTitleFontSize,
        color: disableTextColor,
    },
    /**
     * 按钮文字样式
     */
    buttonTitleStyle: {
        color: whiteColor,
        fontSize: thirdTitleFontSize,
    },
    /**
     * 返回按钮的样式
     */
    backIconStyle: {
        width: 28,
        height: 28,
        ...Platform.select({
            ios: {
                marginStart: 15,
            },
        }),
    },
    /**
     * 导航栏标题样式
     */
    headTitleStyle: {
        fontSize: secondTitleFontSize,
        color: textColor,
        fontWeight: 'bold',
    },
    /**
     * 导航栏右按钮的样式
     */
    rightIconStyle: {
        marginEnd: 15,
        width: 28,
        height: 28,
    },
    /**
     * 参数整体样式
     */
    paramsContainerStyle: {
        backgroundColor: whiteColor,
        marginStart: 15,
        marginEnd: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderRadius: 12,
    },
    /**
     * 参数名称样式
     */
    paramsNameStyle: {
        fontSize: thirdTitleFontSize,
        color: textColor,
    },
    /**
     * 参数值样式
     */
    paramsValueStyle: {
        fontSize: thirdTitleFontSize,
        color: hintTextColor,
    },
    /**
     * 参数箭头样式
     */
    paramsArrowIconStyle: {
        width: 22,
        height: 22,
    },

});
