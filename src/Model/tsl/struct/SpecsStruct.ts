/**
 * 结构体数据定义
 */
export default class SpecsStruct<T> {
    /**
     * 属性id
     * @type {number}
     */
    id: number
    /**
     * 属性标识符
     * @type {string}
     */
    code: string
    /**
     * 属性名称
     * @type {string}
     */
    name: string
    /**
     * 数据类型
     * @type {string}
     */
    dataType: string
    /**
     * 属性定义
     * @type {Array<T>}
     */
    specs: Array<T>

    constructor(code?: string, specs?: Array<T>) {
        this.id = 0;
        this.code = code ?? '';
        this.name = '';
        this.dataType = '';
        this.specs = specs ?? [];
    }
}
