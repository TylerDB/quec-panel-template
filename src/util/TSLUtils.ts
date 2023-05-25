import * as TSLConfig from '../config/TSLConfig';
import {
    TSL_ATTR_DATA_TYPE_ARRAY,
    TSL_ATTR_DATA_TYPE_BOOL,
    TSL_ATTR_DATA_TYPE_DATE,
    TSL_ATTR_DATA_TYPE_DOUBLE,
    TSL_ATTR_DATA_TYPE_ENUM,
    TSL_ATTR_DATA_TYPE_FLOAT,
    TSL_ATTR_DATA_TYPE_INT,
    TSL_ATTR_DATA_TYPE_STRUCT,
    TSL_ATTR_DATA_TYPE_TEXT,
} from '../config/TSLConfig';
import StringUtils from './StringUtils';
import QuecRNDeviceModule from '../plugin';
import BooleanTSLModel from '../Model/tsl/bool/BooleanTSLModel';
import {DataUtils} from './DataUtils';
import DataPointModel from '../Model/dp/DataPointModel';
import {
    DP_ATTR_DATA_TYPE_ARRAY,
    DP_ATTR_DATA_TYPE_BOOL,
    DP_ATTR_DATA_TYPE_DATE,
    DP_ATTR_DATA_TYPE_DOUBLE,
    DP_ATTR_DATA_TYPE_ENUM,
    DP_ATTR_DATA_TYPE_FLOAT,
    DP_ATTR_DATA_TYPE_INT,
    DP_ATTR_DATA_TYPE_STRUCT,
    DP_ATTR_DATA_TYPE_TEXT,
} from '../config/DPConfig';
import type CmdModel from '../Model/dp/CmdModel';
import EnumTSLModel from '../Model/tsl/enum/EnumTSLModel';
import type SpecsGeneral from '../Model/tsl/bool/SpecsGeneral';
import NumberTSLModel from '../Model/tsl/number/NumberTSLModel';
import TSLModel from '../Model/tsl/TSLModel';

/**
 * 物模型方法类
 */
export default class TSLUtils {
    /**
     * 写属性
     * @param item 属性
     * @param value 属性值
     * @param mode mode 下发模式： 0 auto，1: websocket 2:wifi 3:ble
     * @param onSuccess 成功回调方法
     * @param onFailure 失败回调方法
     */
    static writeData(item: any, value: any, mode: number = 0, onSuccess: Function, onFailure: Function) {
        QuecRNDeviceModule.writeDpsWithMode(this.getDataPointParams(item, value), mode)
            .then(() => {
                // @ts-ignore
                global.loadingDismiss();
                console.log('write dps success');
                onSuccess && typeof onSuccess === 'function' && onSuccess();
            })
            .catch((error: any) => {
                // @ts-ignore
                global.loadingDismiss();
                onFailure && typeof onFailure === 'function' && onFailure(error);
                console.log('write dps error:', JSON.stringify(error));
            });
    }

    /**
     * 读属性
     * @param item 属性
     * @param value 属性值
     * @param mode mode 下发模式： 0 auto，1: websocket 2:wifi 3:ble
     * @param onSuccess 成功回调方法
     * @param onFailure 失败回调方法
     */
    static readData(item: any, value: any, mode: number = 0, onSuccess: Function, onFailure: Function) {
        QuecRNDeviceModule.readDpsWithMode(this.getDataPointParams(item, value), mode)
            .then(() => {
                // @ts-ignore
                global.loadingDismiss();
                console.log('write dps success');
                onSuccess && typeof onSuccess === 'function' && onSuccess();
            })
            .catch((error: any) => {
                // @ts-ignore
                global.loadingDismiss();
                onFailure && typeof onFailure === 'function' && onFailure(error);
                console.log('write dps error:', JSON.stringify(error));
            });
    }

    /**
     * 一次性读取多个属性值
     * @param data 属性集合
     * @param mode 下发模式
     * @param onSuccess 成功回调方法
     * @param onFailure 失败回调方法
     */
    static multiReadData(data: Array<TSLModel>, mode: number = 0, onSuccess?: Function, onFailure?: Function) {
        let dps: DataPointModel[] = [];
        data.forEach((attr: TSLModel) => {
            let dp = new DataPointModel(attr.id, TSLUtils.tslDataType2dp(attr.dataType), null);
            dps.push(dp);
        });
        QuecRNDeviceModule.readDpsWithMode(dps, mode)
            .then(() => {
                // @ts-ignore
                global.loadingDismiss();
                console.log('write dps success');
                onSuccess && typeof onSuccess === 'function' && onSuccess();
            })
            .catch((error: any) => {
                // @ts-ignore
                global.loadingDismiss();
                onFailure && typeof onFailure === 'function' && onFailure(error);
                console.log('write dps error:', JSON.stringify(error));
            });
    }

    /**
     * 获取数据点参数
     * @param item 物模型属性
     * @param value
     * @private
     */
    private static getDataPointParams(item: any, value: any): Array<DataPointModel> {
        let dataValue = this.getCmdValue(item.dataType, value);
        let dp = new DataPointModel(item.id, TSLUtils.tslDataType2dp(item.dataType), dataValue);
        let dps = [];
        dps.push(dp);
        return dps;
    }

    /**
     * 转换物模型属性下发命令
     * @param dataType 属性类型
     * @param value 属性值
     * @private
     */
    private static getCmdValue(dataType: string | undefined, value: any): any {
        if (StringUtils.isEmpty(dataType)) {
            return value;
        }
        switch (dataType) {
            case TSLConfig.TSL_ATTR_DATA_TYPE_INT:
            case TSLConfig.TSL_ATTR_DATA_TYPE_ENUM:
                return parseInt(value, 10);
            case TSLConfig.TSL_ATTR_DATA_TYPE_FLOAT:
                return StringUtils.subDecimals(value, 7);
            case TSLConfig.TSL_ATTR_DATA_TYPE_DOUBLE:
                return StringUtils.subDecimals(value, 15);
            case TSLConfig.TSL_ATTR_DATA_TYPE_ARRAY:
                return TSLUtils.getArrayCmdValue(value);
            case TSLConfig.TSL_ATTR_DATA_TYPE_STRUCT:
                return TSLUtils.getStructCmdValue(value);
            case TSLConfig.TSL_ATTR_DATA_TYPE_BOOL:
            default:
                return value;
        }
    }

    /**
     * 转换数组属性下发命令
     * @param realValues
     * @private
     */
    private static getArrayCmdValue(realValues: Array<CmdModel>) {
        console.log('getArrayCmdValue ==> ' + JSON.stringify(realValues));
        let cmdValues = [];
        for (let i = 0; i < realValues.length; i++) {
            let value = realValues[i];
            cmdValues.push({
                id: value?.id,
                dataType: TSLUtils.tslDataType2dp(value?.dataType),
                value: TSLUtils.getCmdValue(value?.dataType, value?.value),
            });
        }
        console.log('structItems cmdValues ==> ' + JSON.stringify(cmdValues));
        return cmdValues;
    }

    /**
     * 转换结构体属性下发命令
     * @param structItems 结构体下发命令
     * @private
     */
    private static getStructCmdValue(structItems: Array<CmdModel>) {
        console.log('structItems ==> ' + JSON.stringify(structItems));
        let cmdValues = [];
        for (let i = 0; i < structItems.length; i++) {
            let item = structItems[i];
            cmdValues.push({
                id: Number(item?.id),
                code: item?.code,
                dataType: TSLUtils.tslDataType2dp(item?.dataType),
                value: TSLUtils.getCmdValue(item?.dataType, item?.value),
            });
        }
        console.log('structItems cmdValues ==> ' + JSON.stringify(cmdValues));
        return cmdValues;
    }

    /**
     *  物模型数据类型 转 数据点数据类型
     * @param dataType
     * @return 数据点数据类型
     */
    static tslDataType2dp(dataType: string | undefined): number {
        if (StringUtils.isEmpty(dataType)) {
            return 0;
        }
        switch (dataType) {
            case TSL_ATTR_DATA_TYPE_BOOL:
                return DP_ATTR_DATA_TYPE_BOOL;
            case TSL_ATTR_DATA_TYPE_INT:
                return DP_ATTR_DATA_TYPE_INT;
            case TSL_ATTR_DATA_TYPE_FLOAT:
                return DP_ATTR_DATA_TYPE_FLOAT;
            case TSL_ATTR_DATA_TYPE_DOUBLE:
                return DP_ATTR_DATA_TYPE_DOUBLE;
            case TSL_ATTR_DATA_TYPE_ENUM:
                return DP_ATTR_DATA_TYPE_ENUM;
            case TSL_ATTR_DATA_TYPE_TEXT:
                return DP_ATTR_DATA_TYPE_TEXT;
            case TSL_ATTR_DATA_TYPE_DATE:
                return DP_ATTR_DATA_TYPE_DATE;
            case TSL_ATTR_DATA_TYPE_STRUCT:
                return DP_ATTR_DATA_TYPE_STRUCT;
            case TSL_ATTR_DATA_TYPE_ARRAY:
                return DP_ATTR_DATA_TYPE_ARRAY;
            default:
                return 0;
        }
    }

    /**
     * 数据点数据类型 转 物模型数据类型
     * @param dataType
     */
    static dpDataType2tsl(dataType: number): string {
        switch (dataType) {
            case DP_ATTR_DATA_TYPE_BOOL:
                return TSL_ATTR_DATA_TYPE_BOOL;
            case DP_ATTR_DATA_TYPE_INT:
                return TSL_ATTR_DATA_TYPE_INT;
            case DP_ATTR_DATA_TYPE_FLOAT:
                return TSL_ATTR_DATA_TYPE_FLOAT;
            case DP_ATTR_DATA_TYPE_DOUBLE:
                return TSL_ATTR_DATA_TYPE_DOUBLE;
            case DP_ATTR_DATA_TYPE_ENUM:
                return TSL_ATTR_DATA_TYPE_ENUM;
            case DP_ATTR_DATA_TYPE_TEXT:
                return TSL_ATTR_DATA_TYPE_TEXT;
            case DP_ATTR_DATA_TYPE_DATE:
                return TSL_ATTR_DATA_TYPE_DATE;
            case DP_ATTR_DATA_TYPE_STRUCT:
                return TSL_ATTR_DATA_TYPE_STRUCT;
            case DP_ATTR_DATA_TYPE_ARRAY:
                return TSL_ATTR_DATA_TYPE_ARRAY;
            default:
                return '';
        }
    }

    /**
     * 初始化布尔物模型
     * @param model
     * @return {*}
     */
    static initBooleanModel(model: any): BooleanTSLModel {
        const boolModel = this.copyObject(model, new BooleanTSLModel());
        boolModel.attributeValue = this.initBooleanAttributeValue(model.attributeValue);
        return boolModel;
    }

    /**
     * 初始化布尔物模型属性值
     * @param value 当前属性值
     * @param defaultValue 默认值
     * @return {boolean}
     * @private
     */
    private static initBooleanAttributeValue(value: string | boolean, defaultValue: boolean = false) {
        if (DataUtils.isNull(value)) {
            return defaultValue;
        }
        return value === true || value === 'true';
    }

    /**
     * 从源实体类复制指定字段到目标实体类
     * @param srcObject 源实体类
     * @param dstObject 目标实体类
     * @return {*} 目标实体类
     */
    static copyObject(srcObject: any, dstObject: any) {
        if (DataUtils.isNull(srcObject)) {
            return;
        }
        let keys = Object.keys(dstObject);
        for (let index in keys) {
            let key = keys[index];
            // @ts-ignore
            dstObject[key] = srcObject[key];
        }
        return dstObject;
    }

    /**
     * 处理布尔属性上报值
     * @param boolAttr
     * @param value
     * @private
     */
    public static handlerReportBoolAttr(boolAttr: BooleanTSLModel | undefined, value: boolean): void {
        if (DataUtils.isNull(boolAttr)) {
            return;
        }
        boolAttr!.attributeValue = value;
    }

    /**
     * 初始化枚举物模型
     * @param model
     * @return {*}
     */
    static initEnumModel(model: any): EnumTSLModel {
        const boolModel = this.copyObject(model, new EnumTSLModel());
        boolModel.attributeValue = this.initEnumAttributeValue(model.attributeValue);
        return boolModel;
    }

    /**
     * 初始化枚举物模型属性值
     * @param value 属性值
     * @param defaultValue 默认值
     * @return {boolean}
     * @private
     */
    private static initEnumAttributeValue(value: string, defaultValue: string = '0'): string {
        if (StringUtils.isEmpty(value) || Number.isNaN(value)) {
            return defaultValue;
        }
        return value;
    }

    /**
     * 获取布尔、枚举属性名称
     * @param value
     * @param specs
     */
    public static getBoolEnumName(value: string, specs: Array<SpecsGeneral>): string {
        if (StringUtils.isEmpty(value) || DataUtils.isArrayNull(specs)) {
            return '';
        }
        for (let i = 0; i < specs.length; i++) {
            if (value === specs[i]?.value) {
                return specs[i]?.name ?? '';
            }
        }
        return specs[0]?.name ?? '';
    }

    /**
     * 处理枚举属性上报值
     * @param enumAttr
     * @param value
     * @private
     */
    public static handlerReportEnumAttr(enumAttr: EnumTSLModel | undefined, value: number): void {
        if (DataUtils.isNull(enumAttr)) {
            return;
        }
        enumAttr!.attributeValue = value.toString();
    }

    /**
     * 初始化数值物模型
     * @param model
     * @return {*}
     */
    public static initNumberModel(model: any): NumberTSLModel {
        const numberModel: NumberTSLModel = this.copyObject(model, new NumberTSLModel());
        numberModel.attributeValue = this.initNumberAttributeValue(model.attributeValue, model.specs[0].min);
        return numberModel;
    }

    /**
     * 初始化数值型模型属性值
     * @param value 当前属性值
     * @param min 当前属性值
     * @param defaultValue 默认值
     * @return {boolean}
     * @private
     */
    private static initNumberAttributeValue(value: number | undefined, min: string | undefined,
        defaultValue?: number): number {
        if (value !== undefined) {
            return Number(value);
        }
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        if (!Number.isNaN(min)) {
            return Number(min);
        }
        return 0;
    }

    /**
     * 处理数值属性上报值
     * @param numberAttr
     * @param value
     * @private
     */
    public static handlerReportNumberAttr(numberAttr: NumberTSLModel | undefined, value?: number): void {
        if (numberAttr === undefined || value === undefined || Number.isNaN(value)) {
            return;
        }
        numberAttr.attributeValue = value;
    }
}
