/**
 * 数组属性定义
 */

export default class SpecsArray<T> {
    /**
     * 属性id
     */
    id: number
    /**
     * 数组大小
     * @type {number}
     */
    size: number
    /**
     * 数据类型
     * @type {string}
     */
    dataType: string
    /**
     * 数据定义
     * @type {Array<T>}
     */
    specs: Array<T>

    constructor(id: number = 0, size: number = 0, dataType: string = '', specs: Array<T> = []) {
        this.id = id;
        this.size = size;
        this.dataType = dataType;
        this.specs = specs;
    }
}
