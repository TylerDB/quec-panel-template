import React, { Component } from 'react';
import { DeviceEventEmitter, FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { baseMoreStyle } from './style';
import i18n from '../../i18n/i18n';
import { DEVICE_TYPE_BIND } from '../../config/DeviceConfig';
import QuecRNDeviceModule from '@quec/rn-device-module';
import QuecRNRouterModule from '@quec/rn-router-module';
import { EVENT_TYPE_GO_BACK_HOME } from '../../config/EventType';
import { styles } from '../../style';
import GlobalManager from '../../manager/GlobalManager';
import { Button } from 'react-native-elements';
import QConfirmDialog from '../../component/QConfirmDialog';

/**
 * 更多设置页面基类
 */
export default class BaseMore extends Component {
    constructor (props) {
        super(props);
        let device = global.device;
        this.state = {
            device: device,
            menuList:
                device.deviceType === DEVICE_TYPE_BIND
                    ? [
                        {
                            name: i18n('device_name'),
                            value: device.deviceName,
                            page: 'BaseRename',
                        },
                        {
                            name: i18n('share_manager'),
                            value: '',
                            page: 'Share',
                        },
                    ]
                    : [
                        {
                            name: i18n('device_name'),
                            value: device.deviceName,
                            page: 'BaseRename',
                        },
                    ],
            isUnbindVisible: GlobalManager.getInstance().showUnbindButton(),
            showDialog: false,
        };
    }

    componentDidMount () {
    }

    render () {
        const { menuList, isUnbindVisible, showDialog, device } = this.state;
        let listHeight = menuList.length * 54 + 10;
        return (
            <>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={[baseMoreStyle.containerStyle, { maxHeight: listHeight }]}
                        data={menuList}
                        renderItem={item => this.renderItem(item)}
                        onEndReachedThreshold={0.1}
                        ItemSeparatorComponent={this.renderItemSeparator}
                        keyExtractor={item => item.name}
                    />
                </View>
                {isUnbindVisible && <Button
                    title={i18n('unbind_device')}
                    type="Solid"
                    containerStyle={baseMoreStyle.buttonContainerStyle}
                    titleStyle={baseMoreStyle.buttonTitleStyle}
                    onPress={() => {
                        this.setState({
                            showDialog: true,
                        });
                    }}
                />}
                <QConfirmDialog
                    visible={showDialog}
                    confirmText={i18n('confirm')}
                    cancelText={i18n('cancel')}
                    tipText={i18n('delete_device_tip', { deviceName: device.deviceName })}
                    titleText={i18n('tip')}
                    onCancel={() => {
                        this.setState({
                            showDialog: false,
                        });
                    }}
                    onConfirm={() => {
                        this.setState({
                            showDialog: false,
                        }, () => {
                            this.unbindDevice();
                        });
                    }}
                />
            </>

        );
    }

    renderItemSeparator () {
        return <View style={styles.itemSeparatorStyle}/>;
    }

    /**
     * 渲染条目
     * @param item
     */
    renderItem (item) {
        return (
            <TouchableOpacity
                style={baseMoreStyle.itemContainerStyle}
                onPress={this.openPage.bind(this, item.item.page)}>
                <Text style={baseMoreStyle.itemNameStyle}>{item.item.name}</Text>
                <Text style={baseMoreStyle.itemValueStyle}>{item.item.value}</Text>
                <Image
                    style={baseMoreStyle.itemIconStyle}
                    source={require('../../image/icon_menu_arrow.png')}
                />
            </TouchableOpacity>
        );
    }

    /**
     * 打开页面
     * @param page
     */
    openPage (page) {
        if (page == 'Share') {
            QuecRNRouterModule.gotoSharePage(global.device);
        } else {
            this.props.navigation.navigate(page);
        }
    }

    /**
     * 设备解绑
     */
    unbindDevice () {
        if (global.device.deviceType === DEVICE_TYPE_BIND) {
            this.unbindOwnerDevice(global.device);
        } else {
            this.unbindShareDevice(global.device);
        }
    }

    /**
     * 删除拥有者的设备
     * @param device 设备信息
     */
    unbindOwnerDevice (device) {
        if (device.deviceKey && device.productKey) {
            global.loading();
            QuecRNDeviceModule.unbindDeviceWithDeviceKey(device.deviceKey, device.productKey).
                then((res) => {
                    this._succeedDelete();
                }).
                catch((error) => {
                    this._failedDelete(error);
                });
        }
    }

    /***
     * 删除分享的设备
     * @param device  设备信息
     */
    unbindShareDevice (device) {
        if (device.shareCode && device.shareCode.length > 0) {
            global.loading();
            QuecRNDeviceModule.unShareDeviceByShareUserWithShareCode(device.shareCode).
                then((res) => {
                    this._succeedDelete();
                }).
                catch((error) => {
                    this._failedDelete(error);
                });
        }
    }

    /**
     * 删除成功
     * @private
     */
    _succeedDelete () {
        global.loadingDismiss();
        global.toast(i18n('succeed_delete'));
        DeviceEventEmitter.emit(EVENT_TYPE_GO_BACK_HOME);
    }

    /**
     * 删除失败
     * @param error 错误信息
     * @private
     */
    _failedDelete (error) {
        console.log('错误信息' + error.code + error.message);
        global.loadingDismiss();
        global.toast(error.message);
    }
}
