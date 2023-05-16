/**
 * 物模型属性共有定义
 */
export default class TSLModel {
    /**
     * 属性标识符
     * @type {string}
     */
    code: string
    /**
     * 属性 id
     * @type {number}
     */
    id: number
    /**
     * 属性名称
     * @type {string}
     */
    name: string
    /**
     * 数据类型
     * {@link TSL_ATTR_DATA_TYPE_INT,TSL_ATTR_DATA_TYPE_FLOAT,TSL_ATTR_DATA_TYPE_DOUBLE}
     * {@link TSL_ATTR_DATA_TYPE_BOOL,TSL_ATTR_DATA_TYPE_ENUM,TSL_ATTR_DATA_TYPE_TEXT}
     * {@link TSL_ATTR_DATA_TYPE_DATE,TSL_ATTR_DATA_TYPE_ARRAY,TSL_ATTR_DATA_TYPE_STRUCT}
     * @type {string}
     */
    dataType: string
    /**
     * 排序
     * @type {string}
     */
    sort: string
    /**
     * 物模型子类型
     * {@link TSL_SUBTYPE_R,TSL_SUBTYPE_RW,TSL_SUBTYPE_W}
     * @type {string}
     */
    subType: string
    /**
     * 物模型类型
     * @type {string}
     */
    type: string

    constructor (code: string = '', id: number = 0, name: string = '', dataType: string = '',
        sort: string = '0', subType: string = '', type: string = '') {
        this.code = code;
        this.id = id;
        this.name = name;
        this.dataType = dataType;
        this.sort = sort;
        this.subType = subType;
        this.type = type;
    }
}
