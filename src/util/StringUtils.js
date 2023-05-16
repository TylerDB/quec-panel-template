/**
 * 字符串方法类
 */

export default class StringUtils {
    /**
     * 计算字符串长度
     * @param {*} str
     */
    static strLen (str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    }

    /**
     * 计算超过最大长度的那个字符所在的索引
     * @param {*} str  当前字符串
     * @param {*} max 最大长度
     */

    static strAt (str, max) {
        let pos = 0;
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
            if (len > max) {
                return pos;
            } else {
                pos++;
            }
        }
    }

    static format (str, arr) {
        if (!str || !arr) {
            return str;
        }
        for (let i = 0; i < arr.length; i++) {
            str = str.replace(/{(\d)}/, () => arr[i]);
        }
        return str;
    }

    /**
     * 过滤emoji
     * @param value
     * @returns {*}
     */
    static inputEmoji (value) {
        let regStr =
            /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\\A9|\\AE]\u3030|\\uA9|\\uAE|\u3030/gi;
        if (regStr.test(value)) {
            return value.replace(regStr, '');
        } else {
            return value;
        }
    }

    /**
     * 截取小数
     * @param value
     * @param n
     * @returns {*}
     */
    static subDecimals (value, n) {
        let split = value.toString().
            split('.');
        if (split.length > 1) {
            let realNum = split[1].length;
            n = realNum > n ? n : realNum;
            return value.toString().
                match(`\\d+(?:\\.)\\d{${n}}`)[0];
        }
        return value;
    }

    /**
     * 截取字符串后几位
     * @param value 当前字符串
     * @param digits 截取位数
     * @returns {*} 截取的后几位字符串
     */
    static subStringLast (value, digits) {
        if (value === undefined || value === null || value.length === 0) {
            return '';
        }
        if (value.length <= digits) {
            return value;
        }
        return value.substring(value.length - digits);
    }

    /**
     * 判断字符串是否为空
     * @param value
     * @returns {boolean}
     */
    static isEmpty (value) {
        if (value === undefined || value === null || value.length === 0) {
            return true;
        }
        let regStr = /^\s+$/g;
        return regStr.test(value);
    }

    /**
     * 拼接文本
     * @param preValue
     * @param value
     * @param code
     */
    static concatString (preValue, value, code) {
        if (this.isEmpty(preValue)) {
            return value;
        }
        return preValue + code + value;
    }

}
