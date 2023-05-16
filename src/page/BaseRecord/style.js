import { StyleSheet } from 'react-native';
import { hintTextColor, textColor, whiteColor } from '../../style/colors';
import { normalTextFontSize, thirdTitleFontSize, tipTextFontSize } from '../../style/dimens';

/**
 * 告警记录基类页面样式
 */
export const baseRecordStyle = StyleSheet.create({
    /**
     * 整体样式
     */
    containerStyle: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    /**
     * 空消息页面整体样式
     */
    emptyMessageContainerStyle: {
        alignItems: 'center',
    },
    /**
     * 空消息页面图标样式
     */
    emptyMessageIconStyle: {
        width: 240,
        height: 140,
        marginTop: 100,
    },
    /**
     * 空消息页面文本样式
     */
    emptyMessageTextStyle: {
        fontSize: normalTextFontSize,
        color: hintTextColor,
    },
    /**
     * 告警记录的整体布局
     */
    recordContainerStyle: {
        flexDirection: 'row',
        paddingStart: 28,
        paddingEnd: 28,
    },
    /**
     * 时间轴的整体布局
     */
    timelineContainerStyle: {
        alignItems: 'center',
    },
    /**
     * 时间轴顶部显示的样式
     */
    timelineTopShowStyle: {
        width: 1,
        backgroundColor: '#D9D9D9',
        height: 24,
    },
    /**
     * 时间轴顶部显示的样式
     */
    timelineTopHideStyle: {
        width: 1,
        backgroundColor: '#00000000',
        height: 24,
    },
    /**
     * 时间轴节点样式
     */
    timelineDotStyle: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#D9D9D9',
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    /**
     * 时间轴底部显示的样式
     */
    timelineBottomShowStyle: {
        width: 1,
        backgroundColor: '#D9D9D9',
        flex: 1,
    },
    /**
     * 时间轴底部显示的样式
     */
    timelineBottomHideStyle: {
        width: 1,
        backgroundColor: '#00000000',
        flex: 1,
    },
    /**
     * 记录内容整体样式
     */
    recordContentContainerStyle: {
        marginStart: 15,
        marginTop: 24,
        marginBottom: 6,
    },
    /**
     * 记录文本的样式
     */
    recordTextStyle: {
        fontSize: thirdTitleFontSize,
        color: textColor,
    },
    /**
     * 时间文本样式
     */
    timeTextStyle: {
        marginTop: 8,
        fontSize: tipTextFontSize,
        color: hintTextColor,
    },
});
