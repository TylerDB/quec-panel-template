import {EmitterSubscription} from 'react-native';

export const DataUtils = {
    /**
     * 参数是否空
     * @param value
     * @returns {boolean}
     */
    isNull(value: any): boolean {
        return value === undefined || value === null;
    },
    /**
     * 数组是否为空
     * @param array
     * @returns {boolean}
     */
    isArrayNull(array: any): boolean {
        return this.isNull(array) || array.length === 0;
    },
    /**
     * 移除监听事件
     * @param listener
     */
    removeListener(listener: EmitterSubscription | undefined) {
        if (listener) {
            listener.remove();
            listener = undefined;
        }
    },
};
