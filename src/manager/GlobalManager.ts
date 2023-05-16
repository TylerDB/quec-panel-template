/**
 * 从app获取的初始化常量
 */
import {DataUtils} from '../util/DataUtils';

/**
 * 全局管理器
 */
export default class GlobalManager {
    /**
     * 参数管理器的实例
     * @private
     */
    private static instance: GlobalManager;
    /**
     * 从app获取的初始化常量
     */
    private mProps: any;

    /**
     * 私有构造方法
     * @private
     */
    private constructor() {

    }

    /**
     * 获取单例
     */
    public static getInstance() {
        if (!GlobalManager.instance) {
            GlobalManager.instance = new GlobalManager();
        }
        return GlobalManager.instance;
    }


    /**
     * 设置props
     * @param props
     */
    setProps(props: any) {
        this.mProps = props;
    }

    /**
     * 获取Props
     * @returns {*}
     */
    getProps() {
        return this.mProps;
    }

    /**
     * showMoreSetting
     */
    showMoreSetting() {
        // var isaaa = this.showUnbindButton()
        // console.log('showUnbindButton 2222',isaaa)

        let extraProps = this.getProps().extraProps;
        if (DataUtils.isNull(extraProps)) {
            return true;
        }
        if (typeof extraProps === 'string') {
            extraProps = JSON.parse(extraProps);
        }
        let haveMoreSetting = extraProps.haveMoreSetting;
        if (DataUtils.isNull(haveMoreSetting)) {
            return true;
        }
        return haveMoreSetting;
    }


    /**
     * showUnbindButton
     */
    showUnbindButton() {
        const {familyModeEnabled, familyId, familyRole} = this.mProps;
        console.log('showUnbindButton', familyModeEnabled, familyId, familyRole);
        if (familyModeEnabled) {
            if (familyRole === '3') {
                return false;
            }
        }
        return true;
    }

    /**
     * getGatewayPk
     */
    getGatewayPk() {
        // var isaaa = this.showUnbindButton()
        // console.log('showUnbindButton 2222',isaaa)

        let extraProps = this.getProps().extraProps;
        if (DataUtils.isNull(extraProps)) {
            return null;
        }
        if (typeof extraProps === 'string') {
            extraProps = JSON.parse(extraProps);
        }
        let gatewayPk = extraProps.gatewayPk;
        if (DataUtils.isNull(gatewayPk)) {
            return null;
        }
        return gatewayPk;
    }

    /**
     * getGatewayDk
     */
    getGatewayDk() {
        let extraProps = this.getProps().extraProps;
        if (DataUtils.isNull(extraProps)) {
            return null;
        }
        if (typeof extraProps === 'string') {
            extraProps = JSON.parse(extraProps);
        }
        let gatewayDk = extraProps.gatewayDk;
        if (DataUtils.isNull(gatewayDk)) {
            return null;
        }
        return gatewayDk;
    }
}
