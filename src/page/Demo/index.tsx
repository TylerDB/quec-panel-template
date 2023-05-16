import React from 'react';
import BaseDeviceDetail from '../BaseDeviceDetail';
import { BaseProps, BaseStates} from '../BaseDeviceDetail';
import { Text, View } from 'react-native';

const iconSetting = require('../../image/icon_setting.png');

interface DemoProps extends BaseProps {
  // 在这里添加 Demo 特有的 Props
}

interface DemoStates extends BaseStates {
  // 在这里添加 Demo 特有的 Props
}

class Demo extends BaseDeviceDetail<DemoProps, DemoStates> {
  // 在这里编写 Demo 组件的具体实现
  componentDidMount(): void {
    super.componentDidMount()
    super.renderTitleView('Home', iconSetting, ()=>{
      this.props.navigation.push('BaseMore')
    })
  }

  componentWillUnmount(): void {
    super.componentWillUnmount()
  }

  render(): React.ReactNode {
    return <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24, fontWeight: '700', color: '#000', textAlign: 'center'}}>{'Demo'}</Text>
    </View>
  }
}

export default Demo;