import { StyleSheet } from 'react-native'

export const confirmDialogStyle = StyleSheet.create({
  /**
   * 模态框样式
   */
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingStart: 50,
    paddingEnd: 50,
  },
  /**
   * 标题文本的样式
   */
  titleTextStyle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  /**
   * 整体样式
   */
  style: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  /**
   * 提示文本样式
   */
  tipTextStyle: {
    margin: 10,
    fontSize: 14,
    color: '#333333',
  },
  /**
   * 底部整体布局
   */
  bottomContainerStyle: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E8',
  },
  /**
   * 取消文本的样式
   */
  cancelTextStyle: {
    height: 55,
    borderRightWidth: 0.5,
    borderRightColor: '#E8E8E8',
    flex: 1,
    textAlign: 'center',
    paddingTop: 16,
    color: '#999999',
    fontSize: 16,
  },
  /**
   * 确认文本的样式
   */
  confirmTextStyle: {
    height: 55,
    flex: 1,
    textAlign: 'center',
    paddingTop: 16,
    color: '#EF5959',
    fontSize: 16,
  },
})
