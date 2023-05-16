import React, {Component} from 'react';
import {Image, ImageStyle, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import i18n from '../../i18n/i18n';
import {emptyViewStyle} from './style';

interface EmptyViewProps {
    /**
     * 空页面图标
     */
    emptyIcon?: number,
    /**
     * 空页面提示文字
     */
    emptyText?: string,
    /**
     * 页面样式
     */
    style?: StyleProp<ViewStyle>,
    /**
     * 空页面图标样式
     */
    emptyIconStyle?: StyleProp<ImageStyle>,
    /**
     * 空页面提示文字样式
     */
    emptyTextStyle?: StyleProp<TextStyle>,
    /**
     * 显示按钮
     */
    showButton?: boolean
    /**
     * 按钮文本
     */
    buttonText?: string
    /**
     * 按钮整体样式
     */
    buttonContainerStyle?: StyleProp<ViewStyle>
    /**
     * 按钮文本样式
     */
    buttonTextStyle?: StyleProp<TextStyle>
    /**
     * 按钮点击方法
     */
    onClick?: Function
}

/**
 * 空页面组件
 */
export default class EmptyView extends Component<EmptyViewProps, any> {
    constructor(props: EmptyViewProps) {
        super(props);
    }

    render() {
        const {
            emptyIcon,
            emptyText,
            style,
            emptyIconStyle,
            emptyTextStyle,
            showButton,
            buttonText,
            buttonContainerStyle,
            buttonTextStyle,
            onClick,
        } = this.props;
        return (
            <View style={style ?? emptyViewStyle.containerStyle}>
                <Image source={emptyIcon ?? require('../../image/icon_no_device.png')}
                    style={emptyIconStyle ?? emptyViewStyle.emptyIconStyle}/>
                <Text style={emptyTextStyle ?? emptyViewStyle.emptyTextStyle}>{emptyText ?? i18n('nothing')}</Text>
                {showButton &&
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={buttonContainerStyle ?? emptyViewStyle.buttonContainerStyle}
                    onPress={() => {
                        onClick && typeof onClick === 'function' && onClick();
                    }}>
                    <Text style={buttonTextStyle ?? emptyViewStyle.buttonTextStyle}>{buttonText ?? ''}</Text>
                </TouchableOpacity>}
            </View>
        );
    }
}
