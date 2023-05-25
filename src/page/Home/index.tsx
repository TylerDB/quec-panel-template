import React from 'react';
import BaseDeviceDetail from '../BaseDeviceDetail';
import { BaseProps, BaseStates} from '../BaseDeviceDetail';
import { Text, View } from 'react-native';
import i18n from '../../i18n/i18n';

const iconSetting = require('../../image/icon_setting.png');
const iconRecoder = require('../../image/icon_recoder.png');

interface HomeProps extends BaseProps {
  // 在这里添加 Home 特有的 Props
}

interface HomeStates extends BaseStates {
  // 在这里添加 Home 特有的 Props
}

class Home extends BaseDeviceDetail<HomeProps, HomeStates> {
    // 在这里编写 Home 组件的具体实现
    componentDidMount(): void {
        super.componentDidMount();
        super.renderTitleView(i18n('home'), [iconRecoder, iconSetting], [
            ()=>{
                this.props.navigation.push('BaseRecord');
            },
            ()=>{
                this.props.navigation.push('BaseMore');
            }]);
        // 获取物模型数据
        super.getModalAttr();
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
    }

    render(): React.ReactNode {
        return <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}} />;
    }

    handlerTSLData(data: any): void {
    // 处理物模型数据

    }
}

export default Home;
