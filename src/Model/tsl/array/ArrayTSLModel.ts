import TSLModel from '../TSLModel';
import type SpecsArray from './SpecsArray';

/**
 * 数组物模型实体类
 */
export default class ArrayTSLModel<T, R> extends TSLModel {
    /**
     * 属性值
     * @type {boolean}
     */
    attributeValue: Array<T>
    /**
     * 数据定义
     * @type {Array<SpecsArray>}
     */
    specs: Array<SpecsArray<R>>

    constructor(attributeValue: Array<T> = [], specs: Array<SpecsArray<R>> = []) {
        super();
        this.attributeValue = attributeValue;
        this.specs = specs;
    }
}
