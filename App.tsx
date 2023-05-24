import React from 'react';
import {View, Text} from 'react-native';
import AppContainer from './src/router';
import Toast from 'react-native-easy-toast';
import {EasyLoading, Loading} from './src/component/EasyLoading/easyLoading';
import GlobalManager from './src/manager/GlobalManager';
// @ts-ignore
import {setupI18nConfig} from './src/plugin/language/i18n';
import i18n from './src/i18n/i18n';
import QLog from './src/util/QLog';

//将App组件中的this赋给全局的self
let self: any;

interface Props {
    device: any;
}

class App extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        //设置语言
        setupI18nConfig();
        //设置设备性
        this._setDeviceInfo();
        //封装全局方法
        this._initGlobalMethods();
        //线上环境禁用日志打印
        QLog.autoDisableLog();
    }

    /**
     * 从原生传递的数据
     *
     *  private String device;//DeviceModel jsonStr
     *  private String token;
     *  //面板自定义扩展字段，一般在面板插件注入
     *  //由面板传入，跳转另外一个面板时携带的参数，native层不做任务解析处理
     *  //本地不要用这个，需要新增字段可直接扩展
     *  private Map<String,Object> extraProps;
     */
    _setDeviceInfo() {
        const {device} = this.props;
        //接受原生传递的设备属性
        let deviceBean = this.props.device;
        console.log('init device: ', JSON.stringify(deviceBean));
        if (typeof deviceBean === 'string') {
            deviceBean = JSON.parse(device);
        }
        //将设备属性存储与全局中
        global.device = deviceBean;
        GlobalManager.getInstance().setProps(this.props);
    }

    /**
     * 初始化全局方法
     * @private
     */
    _initGlobalMethods() {
        self = this;
        global.toast = function (message) {
            if (message && message.length > 0) {
                self.refs.toast.show(message);
            } else {
                self.refs.toast.show('network error');
            }
        };
        // 10s后，loading自动消除， 一直存在的loading timeout设置为-1
        global.loading = function (timeoutCallback = () => {
        }) {
            // 只能有一个model处于最上层，所以要先隐藏当前的loading，防止loading重复出现
            if (EasyLoading.isShow()) {
                EasyLoading.dismiss();
            }
            EasyLoading.showEx(i18n('loading'), 10000, timeoutCallback);
        };
        global.loadingTime = function (message, time, timeoutCallback = () => {
        }) {
            // 只能有一个model处于最上层，所以要先隐藏当前的loading，防止loading重复出现
            if (EasyLoading.isShow()) {
                EasyLoading.dismiss();
            }
            EasyLoading.showEx(message || i18n('loading'), time, timeoutCallback);
        };
        global.loadingDismiss = function () {
            const time = setTimeout(() => {
                EasyLoading.dismiss();
                clearTimeout(time);
            }, 200);
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AppContainer/>
                <Toast
                    ref="toast"
                    opacity={0.7}
                    position={'center'}
                    textStyle={{
                        color: 'white',
                        fontSize: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingStart: 20,
                        paddingEnd: 20,
                    }}
                />
                <Loading
                    ref="loading"
                    color="#c4c4c4"
                    loadingStyle={{backgroundColor: 'rgba(0,0,0,.7)'}}
                    textStyle={{color: 'white', fontSize: 14}}
                />
            </View>
        );
    }
}

export default App;
