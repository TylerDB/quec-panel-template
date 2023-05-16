import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

/**
 * 自定义图片控件
 */
export default class QImage extends Component {
  render () {
    const { activeOpacity, style, source, onPress, disabled } = this.props
    return <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={() => {
        onPress && typeof onPress === 'function' && onPress()
      }}>
      <Image source={source} style={style}/>
    </TouchableOpacity>
  }
}
/**
 * 图片属性
 * @type {{}}
 */
QImage.propTypes = {
  /**
   * 点击透明度
   */
  activeOpacity: PropTypes.number,
  /**
   * 图片样式
   */
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /**
   * 图片来源
   */
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  /**
   * 点击事件
   */
  onPress: PropTypes.func,
  /**
   * 禁用点击事件
   */
  disabled: PropTypes.bool,
}
QImage.defualtProps = {
  activeOpacity: 0.5,
}
