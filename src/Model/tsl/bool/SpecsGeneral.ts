/**
 * 通用数据定义：布尔、枚举属性
 */
export default class SpecsGeneral {
    /**
     * 属性id
     * @type {number}
     */
    id: number
    /**
     * 参数值
     * @type {string}
     */
    value: string
    /**
     * 参数名称
     * @type {string}
     */
    name: string
    /**
     * 数据类型
     * @type {string}
     */
    dataType: string

    constructor (id: number = 0, value: string = '', name: string = '', dataType: string = '') {
        this.id = id;
        this.value = value;
        this.name = name;
        this.dataType = dataType;
    }
}
