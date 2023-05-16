import type SpecsGeneral from './SpecsGeneral';
import TSLModel from '../TSLModel';

/**
 * 布尔属性实体类
 */
export default class BooleanTSLModel extends TSLModel {
    /**
     * 属性值
     * @type {boolean}
     */
    attributeValue: boolean
    /**
     * 数据定义
     * @type { Array<SpecsGeneral>}
     */
    specs: Array<SpecsGeneral>

    constructor(attributeValue: boolean = false, specs: Array<SpecsGeneral> = []) {
        super();
        this.attributeValue = attributeValue;
        this.specs = specs;
    }
}
