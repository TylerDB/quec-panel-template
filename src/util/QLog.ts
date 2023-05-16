/**
 * log方法类
 */
export default class QLog {
    /**
     * 自动禁用log打印
     */
    static autoDisableLog() {
        // 判断当前环境是否为生产环境
        const isProduction = !__DEV__;
        // 定义一个空函数，用于覆盖所有的console方法
        const noop = () => {
        };
        // 如果是生产环境，将所有console方法覆盖为一个空函数
        if (isProduction) {
            console.log = noop;
            console.info = noop;
            console.warn = noop;
            console.error = noop;
            console.debug = noop;
            console.trace = noop;
        }
    }
}
