/*
 *
 * @Author: Ives Li
 * @Date: 2023/1/17 08:47
 * @Description
 * IOS android屏幕适配
 */

import {Platform} from 'react-native';

export const DisplayUtils = {
    /**
     * 获取字体大小，按UI的字体大小设置，实际IOS的字体小了2号
     * @param size
     * @return {[]}
     */
    getFontSize(size) {
        if (Platform.OS === 'ios') {
            return size + 2;
        }
        return size;
    },

    /**
     * 获取宽高对应的大小，按UI的高度设置，实际IOS的高度小了4
     * @param size
     * @return {*}
     */
    getDisplaySize(size) {
        if (Platform.OS === 'ios') {
            return size + 4;
        }
        return size;
    },
};
