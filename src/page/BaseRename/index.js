import React, { Component } from 'react';
import { DEVICE_NAME_MAX_LENGTH, DEVICE_TYPE_BIND } from '../../config/DeviceConfig';
import { DeviceEventEmitter, Keyboard, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import StringUtils from '../../util/StringUtils';
import { baseRenameStyle } from './style';
import i18n from '../../i18n/i18n';
import QuecRNDeviceModule from '@quec/rn-device-module';
import { hintTextColor } from '../../style/colors';
import { styles } from '../../style';
import { EVENT_TYPE_GO_BACK_HOME } from '../../config/EventType';

/**
 *  设备重命名的基类
 */
export default class BaseRename extends Component {
    constructor (props) {
        super(props);

        let mDevice = global.device;

        this.state = {
            device: mDevice,
            maxLength: DEVICE_NAME_MAX_LENGTH,
            deviceName: mDevice.deviceName,
        };
    }

    componentDidMount () {
    }

    render () {
        const { maxLength, deviceName } = this.state;
        return (
            <View style={styles.containerStyle}>
                <View style={baseRenameStyle.itemContainerStyle}>
                    <Text style={baseRenameStyle.itemTitleStyle}>{i18n('device_name')}</Text>
                    <TextInput
                        style={baseRenameStyle.inputTextStyle}
                        onChangeText={(text) => this.onInputChange(text)}
                        placeholder={i18n('enter_name_tip')}
                        value={deviceName}
                        maxLength={maxLength}
                        placeholderTextColor={hintTextColor}
                    />
                </View>
                <Button
                    onPress={() => this.deviceRename()}
                    title={i18n('confirm')}
                    type="Solid"
                    disabled={deviceName.length === 0}
                    disabledTitleStyle={styles.buttonDisableTitleStyle}
                    buttonStyle={
                        this.state.deviceName.length > 0
                            ? [styles.buttonStyle, baseRenameStyle.buttonContainerStyle]
                            : [
                                styles.buttonDisableStyle,
                                baseRenameStyle.buttonContainerStyle,
                            ]
                    }
                    titleStyle={styles.buttonTitleStyle}
                />
            </View>
        );
    }

    /**
     * 输入变化
     * @param text
     */
    onInputChange (text) {
        let deviceName = StringUtils.inputEmoji(text);
        this.setState({
            deviceName: deviceName,
        });
    }

    /**
     * 设备重命名
     */
    deviceRename () {
        const { device, deviceName } = this.state;
        if (StringUtils.isEmpty(deviceName)) {
            global.toast(i18n('rename_illegal'));
            return;
        }
        Keyboard.dismiss();
        global.loading();
        if (device.deviceType === DEVICE_TYPE_BIND) {
            // 绑定设备
            this.renameDeviceBind(deviceName);
        } else {
            // 分享设备
            this.renameDeviceShare(deviceName);
        }
    }

    /**
     * 分享设备重命名
     * @param name 设备新名称
     */
    renameDeviceShare (name) {
        const { device } = this.state;
        global.loading();
        QuecRNDeviceModule.updateDeviceNameByShareUserWithDeviceName(name, device.shareCode).
            then((res) => {
                this._succeedRename();
            }).
            catch((error) => {
                this._failedRename(error);
            });
    }

    /**
     * 绑定设备重命名
     * @param name 设备新名称
     */
    renameDeviceBind (name) {
        const { device } = this.state;
        if (StringUtils.isEmpty(name)) {
            global.toast(i18n('rename_illegal'));
            return;
        }
        global.loading();
        QuecRNDeviceModule.updateDeviceName(name, device.productKey, device.deviceKey).
            then((res) => {
                this._succeedRename();
            }).
            catch((error) => {
                this._failedRename(error);
            });
    }

    /**
     * 重命名成功
     * @private
     */
    _succeedRename () {
        global.loadingDismiss();
        global.toast(i18n('succeed_modify'));
        DeviceEventEmitter.emit(EVENT_TYPE_GO_BACK_HOME);
    }

    /**
     * 重命名失败
     * @param error 错误信息
     * @private
     */
    _failedRename (error) {
        console.log('错误信息' + error.code + error.message);
        global.loadingDismiss();
        global.toast(error.message);
    }
}
