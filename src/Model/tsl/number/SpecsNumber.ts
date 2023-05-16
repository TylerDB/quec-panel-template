/**
 * 数值属性的数据定义
 */
export default class SpecsNumber {
    /**
     * 属性id
     * @type {number}
     */
    id: number
    /**
     * 单位
     * @type {string}
     */
    unit: string
    /**
     * 最小值
     * @type {string}
     */
    min: string
    /**
     * 最大值
     * @type {string}
     */
    max: string
    /**
     * 步长
     * @type {string}
     */
    step: string

    constructor(id: number = 0, unit: string = '', min: string = '0', max: string = '0', step: string = '') {
        this.id = id;
        this.unit = unit;
        this.min = min;
        this.max = max;
        this.step = step;
    }
}
