import TSLModel from '../TSLModel';
import type SpecsStruct from './SpecsStruct';

/**
 * 结构体属性定义
 */
export default class StructTSLModel<T, R> extends TSLModel {
    /**
     * 属性值
     * @type {string}
     */
    attributeValue: T
    /**
     * 数据定义
     * @type {SpecsGeneral}
     */
    specs: SpecsStruct<R>

    constructor(attributeValue: T, specs: SpecsStruct<R>) {
        super();
        this.attributeValue = attributeValue;
        this.specs = specs;
    }
}
