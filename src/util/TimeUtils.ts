import * as RNLocalize from 'react-native-localize';
import momentTz from 'moment-timezone';
import moment from 'moment';
import Decimal from 'decimal.js';

export default class TimeUtils {
    /**
     * 根据后端传入北京时间时间戳，与手机所在时区进行转换,并返回对应时区的时间
     * @param {*} timeStamp 时间戳 int
     * @param {*} format 时间格式
     */
    static formatDate(timeStamp: number, format: string): string {
        if (timeStamp == null) {
            return '';
        }
        let fmt = format ? format : 'YYYY-MM-DD HH:mm:ss';
        let timeZone = RNLocalize.getTimeZone();
        let result = momentTz.tz(timeStamp, timeZone).format(fmt);
        return result;
    }

    /**
     * 获取时间戳
     * @param time
     * @param format
     */
    static getTimeStamp(time: string, format: string): number {
        if (!time) {
            return 0;
        }
        let timeZone = RNLocalize.getTimeZone();
        return momentTz.tz(time, format, timeZone).valueOf();
    }

    /**
     * 获取时区偏移量 前缀
     * @public
     */
    static getUTCOffset(): string {
        let offset = moment().utcOffset();
        let prefix;
        if (offset >= 0) {
            prefix = '+';
        } else {
            prefix = '-';
        }
        let hour = Decimal.abs(offset).divToInt(60);
        let minute = Decimal.abs(offset).mod(60);
        return prefix + this.formatTime(hour) + ':' + this.formatTime(minute);
    }

    /**
     * 格式化时间
     * @param time 当前时间
     * @returns {string|*}
     * @private
     */
    static formatTime(time: any): string | number {
        return time < 10 ? '0' + time : time;
    }

    /**
     * 将秒数转为 HH:mm:SS 格式
     * @param {*} seconds 秒：1天的时间用秒计算
     * @param {*} format 时间格式
     * @returns 时分表示
     */
    static secondsFormat(seconds: number, format: string = 'HH:mm:ss'): string {
        const {hour, minute, second} = this.secondsToTime(seconds);
        return moment().set('hour', hour).set('minute', minute).set('second', second)
            .format(format);
    }

    /**
     *
     * @param {*} time HH:mm
     * @returns 秒
     */
    static timeToSeconds(time: string): number {
        let timeArr = time.split(':');
        if (timeArr !== undefined && timeArr !== null && timeArr.length === 2) {
            return Number(timeArr[0]) * 3600 + Number(timeArr[1]) * 60;
        }
        return 0;
    }

    /**
     *
     * @param {*} seconds 秒：1天的时间用秒计算
     * @returns 时分表示
     */
    static secondsToTime(seconds: number): { hour: number, minute: number, second: number } {
        if (seconds === null || seconds === undefined) {
            return {hour: 0, minute: 0, second: 0};
        }
        let numSeconds = Number(seconds);
        let hour = Math.floor(numSeconds / 60 / 60);
        let minute = Math.floor((numSeconds - hour * 60 * 60) / 60);
        let second = numSeconds % 60;
        return {hour, minute, second};
    }

    /**
     * 获取秒数
     * @param hour 小时
     * @param minute 分钟
     * @param second 秒
     */
    static getSecond(hour: number = 0, minute: number = 0, second: number = 0): number {
        return hour * 3600 + minute * 60 + second;
    }
}
