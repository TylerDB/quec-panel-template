import type SpecsGeneral from '../bool/SpecsGeneral';
import TSLModel from '../TSLModel';

/**
 * 枚举物模型属性
 */
export default class EnumTSLModel extends TSLModel {
    /**
     * 属性值
     * @type {string}
     */
    attributeValue: string
    /**
     * 数据定义
     * @type {Array<SpecsGeneral>}
     */
    specs: Array<SpecsGeneral>

    constructor(attributeValue: string = '', specs: Array<SpecsGeneral> = []) {
        super();
        this.attributeValue = attributeValue;
        this.specs = specs;
    }
}
