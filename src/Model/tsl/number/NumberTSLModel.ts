import type SpecsNumber from './SpecsNumber';
import TSLModel from '../TSLModel';

/**
 * 数值属性实体类
 */
export default class NumberTSLModel extends TSLModel {
    /**
     * 属性值
     * @type {number}
     */
    attributeValue: number
    /**
     * 数据定义
     * @type {Array<SpecsNumber>}
     */
    specs: Array<SpecsNumber>

    constructor(attributeValue: number = 0, specs: Array<SpecsNumber> = []) {
        super();
        this.attributeValue = attributeValue;
        this.specs = specs;
    }
}
