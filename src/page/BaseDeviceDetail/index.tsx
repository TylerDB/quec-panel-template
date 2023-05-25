import React from 'react';
import {DEVICE_ACCESS_TYPE_GATEWAY_CHILD, DEVICE_OFFLINE} from '../../config/DeviceConfig';
import {EVENT_TYPE_DEVICE_DPS_UPDATE, EVENT_TYPE_DEVICE_ONLINE, EVENT_TYPE_GO_BACK_HOME} from '../../config/EventType';

import {
    BackHandler,
    DeviceEventEmitter,
    EmitterSubscription,
    NativeEventEmitter,
    NativeModules,
    Platform,
    View,
} from 'react-native';
import QuecRNDeviceModule from '../../plugin';
import NetError from '../../component/NetError';
import i18n from '../../i18n/i18n';
import QuecRNRouterModule from '../../plugin';
import {DataUtils} from '../../util/DataUtils';
import StringUtils from '../../util/StringUtils';
import QImage from '../../component/QImage';
import {styles} from '../../style';
import {isIos} from '../../util/ratio';

const TSL_ERROR_CODE = '5193';

export interface BaseProps {
    navigation: any
    route: any
}

export interface BaseStates {
    device: any // 设备信息
    reqTSLFailure: boolean, //请求物模型是否失败
    isSucceedSubscribe: boolean, //是否成功订阅
    tslEmpty: boolean //物模型是否为空
}

const eventEmitter = new NativeEventEmitter(NativeModules.QuecRNDeviceModule);

export default class BaseDeviceDetail<P extends BaseProps = BaseProps, S extends BaseStates = BaseStates>
    extends React.Component<P, S> {
    /**
     * 设备是否在线
     */
    online: boolean = false
    /**
     * 监听返回首页事件，用于重命名、删除设备后返回首页
     */
    goBackHomeListener?: EmitterSubscription
    /**
     * 设备在线监听事件
     */
    onDeviceOnlineStateListener?: EmitterSubscription
    /**
     * 数据更新事件
     */
    onDeviceDpsUpdateListener?: EmitterSubscription
    /**
     * 定义state
     */
    state: S = {
        device: global.device,
        reqTSLFailure: false,
        isSucceedSubscribe: false,
        tslEmpty: false,
    } as S

    protected constructor(props: Readonly<P>) {
        super(props);
    }

    componentDidMount() {
        // 获取设备在线状态
        QuecRNDeviceModule.getOnlineState().then((res: { onlineState: number }) => {
            this.online = this._formatFiledOnlineState(res?.onlineState) !== DEVICE_OFFLINE;  //设备是否在线
        });
        this.initEvents();
    }

    componentWillUnmount() {
        this.removeEvents();
    }

    /**
     * 格式化上报或查询到在线字段，
     * 格式化原因：Android 在线字段为string iOS 为number
     * @param onlineState
     * @private
     */
    private _formatFiledOnlineState(onlineState: string | number | undefined): number {
        //todo  在移联万物2.5.10后会统一，后面删除这个方法
        if (onlineState === undefined || onlineState === null) {
            return DEVICE_OFFLINE;
        }
        if (typeof onlineState === 'string') {
            return parseInt(onlineState, 10);
        }
        return onlineState;
    }

    /**
     * 初始化事件
     */
    initEvents() {
        // 监听 android 物理返回事件
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackHandler.bind(this));
        }

        //监听返回首页事件，用于重命名、删除设备后返回首页
        this.goBackHomeListener = DeviceEventEmitter.addListener(EVENT_TYPE_GO_BACK_HOME, () => {
            this.goBackHome();
        });
        //在线状态监听
        this.onDeviceOnlineStateListener = eventEmitter.addListener(EVENT_TYPE_DEVICE_ONLINE, (event) => {
            console.log('---onDeviceOnlineState---' + JSON.stringify(event));
            if (DataUtils.isNull(event)) {
                return;
            }
            this.online = this._formatFiledOnlineState(event.onlineState) !== DEVICE_OFFLINE;
            if (!this.online) {
                this.handlerOffline();
            }
        });
        // 物模型上报监听
        this.onDeviceDpsUpdateListener = eventEmitter.addListener(EVENT_TYPE_DEVICE_DPS_UPDATE, (event) => {
            console.log('---onDeviceDpsUpdate---' + JSON.stringify(event));
            this.handlerReportData(event);
        });
    }

    /**
     * 移除事件
     */
    removeEvents() {
        DataUtils.removeListener(this.goBackHomeListener);
        DataUtils.removeListener(this.onDeviceOnlineStateListener);
        DataUtils.removeListener(this.onDeviceDpsUpdateListener);
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
        }
    }

    /**
     * 渲染标题视图
     * @param title 标题文本
     * @param rightIcon  右边按钮图标
     * @param onRightClick 右图标点击事件
     */
    renderTitleView(title?: string, rightIcons?: Array<NodeRequire>, onRightClicks?: Array<any>) {
        const {device} = this.state;
        this.props?.navigation.setOptions({
            title: StringUtils.isEmpty(title) ? device?.deviceName : title,
            headerTitleStyle: styles.headTitleStyle,
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (
                    <QImage
                        source={require('../../image/icon_navigator_back.png')
                        }
                        style={[styles.backIconStyle, {marginStart: this.getTitleLeftMargin()}]}
                        onPress={() => {
                            this.goBack();
                        }}
                    />
                );
            },
            headerRight: () => {
                if (DataUtils.isArrayNull(rightIcons)) {
                    return null;
                }
                return (<View style={{flexDirection: 'row'}}>
                    {rightIcons?.map((element, index) => {
                        return <QImage
                            source={element}
                            style={styles.rightIconStyle}
                            onPress={() => {
                                if (DataUtils.isArrayNull(onRightClicks)) {
                                    return;
                                }
                                if (index < Number(onRightClicks?.length)) {
                                    const onRightClick = onRightClicks?.[index];
                                    typeof onRightClick === 'function' && onRightClick();
                                }
                            }
                            }
                        />;
                    })}
                </View>
                );
            },
        });
    }

    /**
     * 获取标题栏左图标间距
     * @private
     */
    private getTitleLeftMargin(): number {
        if (isIos) {
            return 15;
        }
        if (this.props.navigation.canGoBack()) {
            return 0;
        }
        return 15;
    }

    /**
     * 获取物模型数据
     */
    getModalAttr() {
        const {device} = this.state;
        this.setState({
            reqTSLFailure: false,
            tslEmpty: false,
        });
        if (!device.productKey || !device.deviceKey) {
            return;
        }
        let params = {
            productKey: device.productKey,
            deviceKey: device.deviceKey,
            gatewayPk: undefined,
            gatewayDk: undefined,
        };
        if (
            Number(device.accessType) === DEVICE_ACCESS_TYPE_GATEWAY_CHILD &&
            this.props.route.params !== null &&
            this.props.route.params !== undefined
        ) {
            if (
                this.props.route.params.gatewayDk &&
                this.props.route.params.gatewayDk.length > 0 &&
                this.props.route.params.gatewayPk &&
                this.props.route.params.gatewayPk.length > 0
            ) {
                params.gatewayPk = this.props.route.params.gatewayPk;
                params.gatewayDk = this.props.route.params.gatewayDk;
            }
        }
        global.loading();
        QuecRNDeviceModule.getTslAndAttrs(params).then((res: { data: string | any[]; }) => {
            global.loadingDismiss();
            if (
                res.data &&
                res.data.length > 0 &&
                Array.isArray(res.data)
            ) {
                this.handlerTSLData(res.data);
            } else {
                this.setState({
                    tslEmpty: true,
                });
            }
        }).catch(((error: { code: string | any[]; message: any; }) => {
            console.error('error ==> ' + error);
            global.loadingDismiss();
            if (error.code && error.code.length > 0) {
                global.toast(error.message);
            }
            if (error.code.toString() === TSL_ERROR_CODE) {
                this.setState({
                    tslEmpty: true,
                });
            } else {
                this.setState({
                    reqTSLFailure: true,
                });
            }
        }));
    }

    /**
     * 处理物模型数据
     * @param data
     */
    handlerTSLData(data: any) {
        // todo 子页面需要重写该方法，根据物模型渲染页面
    }

    /**
     * 处理上报数据
     * @param message
     */
    handlerReportData(message: any) {
        // todo 子页面需要重写该方法，根据上报数据更新页面
    }

    /**
     * 发送命令后更新属性值
     */
    updateValueAfterSendCmd() {
        global.toast(i18n('succeed_set'));
    }

    /**
     * 更新处理后数据
     * @param data
     */
    updateDataAfterHandler(data: any) {
    }

    /**
     * 处理发送命令失败
     */
    handlerFailedSendCmd() {
        global.toast(i18n('failed_set'));
    }

    /**
     * 处理离线
     */
    handlerOffline() {
        global.toast(i18n('device_offline'));
    }

    /**
     * 是否能够发送命令，每次下发命令前需要调用该方法进行判断
     * @returns {boolean}
     */
    isCanSendCmd() {
        console.log('isCanSendCmd this.online ==> ' + this.online);
        if (!this.online) {
            global.toast(i18n('send_cmd_offline'));
            return false;
        }
        return true;
    }

    /**
     * Android监听返回键退出当前页面
     * @returns
     */
    onBackHandler = () => {
        console.log('BaseHome onBackHandler');
        this.goBack();
        return true;
    }

    /**
     * 返回上一页面
     */
    goBack() {
        //如果 路由栈 中存在多个页面，大于等于2，调用 路由组件的返回方法
        if (this.props.navigation.canGoBack()) {
            this.props.navigation?.pop();
        } else {
            //不存在，直接返回首页
            this.goBackHome();
        }
    }

    /**
     * 返回首页
     */
    goBackHome() {
        this.componentWillUnmount();
        // 调用 popWithNumber 方法，必须手动调用 componentWillUnmount ，
        // 不然无法触发 componentWillUnmount
        QuecRNRouterModule.popWithNumber(1);
    }

    // @ts-ignore
    /**
     * 通用导航到下一个页面
     * @param pageName 页面名称
     * @param param 需要传递到下一个页面的数据
     */


    navigationPage(pageName: string, param?: Object) {
        // @ts-ignore
        this.props.navigation.navigate(pageName, param);
    }

    /**
     *  渲染无属性界面
     * @returns 无属性界面
     */
    renderAttrEmptyView() {
        return (
            <NetError
                icon={require('../../image/icon_attr_empty.png')}
                mainTip={i18n('no_tsl_tip')}
                onClick={() => {
                    this.getModalAttr();
                }}
            />
        );
    }

    /**
     * 渲染网络错误属性界面
     * @returns 网络错误属性界面
     */
    renderNetworkErrorView() {
        return (
            <NetError
                onClick={() => {
                    this.getModalAttr();
                }}
            />
        );
    }
}
