import React, {Component} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import i18n from '../../i18n/i18n';
import {netErrorStyle} from './style';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

/**
 * 定义属性
 */
interface NetErrorProps {
    /**
     * 网络错误图标
     */
    icon?: ImageSourcePropType,
    /**
     * 主提示语
     */
    mainTip?: string,
    /**
     * 次要提示语
     */
    subTip?: string,
    /**
     * 点击方法
     */
    onClick: Function,
}

/***
 * 网络错误页面
 */
export default class NetError extends Component<NetErrorProps, any> {
    constructor(props: NetErrorProps) {
        super(props);
    }

    render() {
        const {icon, mainTip, subTip, onClick} = this.props;
        return (
            <TouchableOpacity
                style={netErrorStyle.containerStyle}
                onPress={() => {
                    onClick && typeof onClick === 'function' && onClick();
                }}>
                <Image source={icon ?? require('../../image/icon_net_error.png')} style={netErrorStyle.iconStyle}/>
                <Text style={netErrorStyle.mainTipStyle}>{mainTip ?? i18n('net_error_page_main_tip')}</Text>
                <Text style={netErrorStyle.subTipStyle}>{subTip ?? i18n('net_error_page_sub_tip')}</Text>
            </TouchableOpacity>
        );
    }
}
