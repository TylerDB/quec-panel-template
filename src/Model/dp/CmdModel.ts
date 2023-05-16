/**
 * 命令实体类
 */
export default class CmdModel {
    /**
     * 命令id
     */
    id: number
    /**
     * 命令标识符
     */
    code: string
    /**
     * 命令类型
     */
    dataType: string
    /**
     * 命令值
     */
    value: any

    constructor(id: number | undefined, code: string | undefined, dataType: string | undefined, value: any) {
        this.id = id ?? 0;
        this.code = code ?? '';
        this.dataType = dataType ?? '';
        this.value = value;
    }
}
