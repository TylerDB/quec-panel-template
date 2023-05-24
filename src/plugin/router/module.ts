
import React from 'react';
import { NativeModules, EmitterSubscription, NativeEventEmitter, Platform } from 'react-native';

/**
RN路由模块
@version: 1.1.7
@owner: vic.huang@quectel.com
@platform: all
*/

/** 退出页面栈
@platform: all
@param number {integer} 页面栈数量，当number大于页面栈数量，至退出到APP首页
*/
function popWithNumber(number: number) {
  return NativeModules.QuecRNRouterModule.popWithNumber(number);
}

/** 网关打开子设备
@platform: all
@param info {object} 传递信息
@return Promise
*/
function pushWithInfo(info: Object): Promise<any> {
  return NativeModules.QuecRNRouterModule.pushWithInfo(info);
}

/** 进入设备分享页面
@platform: all
@param device {object} 传递deviceModel
*/
function gotoSharePage(device: Object) {
  return NativeModules.QuecRNRouterModule.gotoSharePage(device);
}

const QuecRNRouterModuleMethods = {
  popWithNumber,
  pushWithInfo,
  gotoSharePage,
};
const QuecRNRouterModuleEvents = {};
const QuecRNRouterModule = {
  ...NativeModules.QuecRNRouterModule,
  ...QuecRNRouterModuleMethods,
  ...QuecRNRouterModuleEvents,
};
export default QuecRNRouterModule;
