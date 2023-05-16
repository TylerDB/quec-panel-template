import React, { Component } from 'react'
import { Modal, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { confirmDialogStyle } from './style'

/**
 * 确认弹出框
 */
export default class QConfirmDialog extends Component {
  /**
   * 点击取消按钮
   * @private
   */
  _onCancelClick () {
    const { onCancel } = this.props
    onCancel && typeof onCancel === 'function' && onCancel()
  }

  /**
   * 点击确认按钮
   * @private
   */
  _onConfirmClick () {
    const { onConfirm } = this.props
    onConfirm && typeof onConfirm === 'function' && onConfirm()
  }

  render () {
    const {
      visible,
      modelStyle,
      cancelText,
      titleText,
      confirmText,
      cancelTextStyle,
      titleTextStyle,
      confirmTextStyle,
      tipText,
      tipTextStyle,
      style,
      bottomContainerStyle,
      titleEllipsizeMode,
    } = this.props
    return <Modal
      transparent
      visible={visible}
      statusBarTranslucent={true}>
      <View style={modelStyle}>
        <View style={style}>
          <Text numberOfLines={1} style={titleTextStyle}
                ellipsizeMode={titleEllipsizeMode}>{titleText}</Text>
          <Text style={tipTextStyle}>{tipText}</Text>
          <View style={bottomContainerStyle}>
            <Text
              style={cancelTextStyle}
              suppressHighlighting={true}
              numberOfLines={1}
              onPress={() => { this._onCancelClick() }}>{cancelText}</Text>
            <Text
              style={confirmTextStyle}
              suppressHighlighting={true}
              numberOfLines={1}
              onPress={() => { this._onConfirmClick() }}>{confirmText}</Text>
          </View>
        </View>
      </View>
    </Modal>
  }
}
/**
 * 属性定义
 * @type {{}}
 */
QConfirmDialog.propTypes = {
  /**
   * 弹框可见
   */
  visible: PropTypes.bool.isRequired,
  /**
   * 取消文本
   */
  cancelText: PropTypes.string,
  /**
   * 标题文本
   */
  titleText: PropTypes.string,
  /**
   * 确认文本
   */
  confirmText: PropTypes.string,
  /**
   * 取消文本的样式
   */
  cancelTextStyle: PropTypes.object,
  /**
   * 标题文本的样式
   */
  titleTextStyle: PropTypes.object,
  /**
   * 确认文本的样式
   */
  confirmTextStyle: PropTypes.object,
  /**
   * 提示文本
   */
  tipText: PropTypes.string,
  /**
   * 提示文本样式
   */
  tipTextStyle: PropTypes.object,
  /**
   * 取消事件
   */
  onCancel: PropTypes.func,
  /**
   * 确认事件
   */
  onConfirm: PropTypes.func,
  /**
   * 整体样式
   */
  style: PropTypes.object,
  /**
   * 模态框样式
   */
  modelStyle: PropTypes.object,
  /**
   * 按钮容器的样式
   */
  bottomContainerStyle: PropTypes.object,
  /**
   * 标题超长样式
   */
  titleEllipsizeMode: PropTypes.string,
}
/**
 *  默认属性
 * @type {{}}
 */
QConfirmDialog.defaultProps = {
  visible: false,
  modelStyle: confirmDialogStyle.modelStyle,
  titleTextStyle: confirmDialogStyle.titleTextStyle,
  style: confirmDialogStyle.style,
  bottomContainerStyle: confirmDialogStyle.bottomContainerStyle,
  tipTextStyle: confirmDialogStyle.tipTextStyle,
  cancelTextStyle: confirmDialogStyle.cancelTextStyle,
  confirmTextStyle: confirmDialogStyle.confirmTextStyle,
  titleEllipsizeMode: 'middle'
}
