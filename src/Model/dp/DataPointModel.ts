/**
 * 数据点实体类
 */
export default class DataPointModel {
    /**
     * 数据点id
     */
    id: number
    /**
     * 数据点类型
     */
    dataType: number
    /**
     * 数据点数值
     */
    value: any

    /**
     * 构造方法
     * @param id 数据点id
     * @param dataType 数据点类型
     * @param value 数据点数值
     */
    constructor(id?: number, dataType?: number, value?: any) {
        this.id = id ?? 0;
        this.dataType = dataType ?? 0;
        this.value = value ?? null;
    }
}
