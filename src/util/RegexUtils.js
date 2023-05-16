/**
 * 正则方法类
 */
export default class RegexUtils {
    /**
     * 检查整数
     * @param number 数字
     * @returns {boolean} 校验结果
     */
    static checkInteger (number) {
        if (number.toString().
            search('-') != -1) {
            if (number.toString().length >= 2) {
                if (number.toString().
                    substr(0, 2) === '-0') {
                    return false;
                }
            }
        } else {
            if (number.toString().length >= 2) {
                if (number.toString().
                    substr(0, 1) === '0') {
                    return false;
                }
            }
        }
        let regex = /^-?\d+$/;
        return regex.test(number);
    }

    /**
     * 检查小数
     * @param decimal 小数
     * @returns {boolean} 校验结果
     */
    static checkDecimal (decimal) {
        let regex = /^-?\d+\.?\d*$/;
        return regex.test(decimal);
    }

    /**
     *检查设备名称是否合法
     * @param name
     */
    static checkDeviceName (name) {
        let regex = /^[\u4e00-\u9fa5A-Za-z0-9~!@#$%^&*_-]*$/;
        return regex.test(name);
    }

    /**
     * 检查小数
     * @param decimal 小数
     * @returns {boolean} 校验结果
     */
    static checkFloatDecimal (decimal) {
        if (decimal.toString().
            search('-') != -1) {
            if (decimal.toString().length >= 3) {
                if (
                    decimal.toString().
                        substr(1, 1) === '0' &&
                    decimal.toString().
                        substr(2, 1) !== '.'
                ) {
                    return false;
                }
            }
        } else {
            if (decimal.toString().length >= 2) {
                if (
                    decimal.toString().
                        substr(0, 1) === '0' &&
                    decimal.toString().
                        substr(1, 1) !== '.'
                ) {
                    return false;
                }
            }
        }
        let regex = /^-?\d+\.?\d{0,7}$/;
        return regex.test(decimal);
    }

    /**
     * 检查小数
     * @param decimal 小数
     * @returns {boolean} 校验结果
     */
    static checkDoubleDecimal (decimal) {
        if (decimal.toString().
            search('-') != -1) {
            if (decimal.toString().length >= 3) {
                if (
                    decimal.toString().
                        substr(1, 1) === '0' &&
                    decimal.toString().
                        substr(2, 1) !== '.'
                ) {
                    return false;
                }
            }
        } else {
            if (decimal.toString().length >= 2) {
                if (
                    decimal.toString().
                        substr(0, 1) === '0' &&
                    decimal.toString().
                        substr(1, 1) !== '.'
                ) {
                    return false;
                }
            }
        }
        let regex = /^-?\d+\.?\d{0,15}$/;
        return regex.test(decimal);
    }
}
