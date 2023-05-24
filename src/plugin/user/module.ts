
import React from 'react';
import { NativeModules, EmitterSubscription, NativeEventEmitter, Platform } from 'react-native';

/**
quec rn user service
@version: 1.0.4
@owner: vic.huang@quectel.com
@platform: all
*/

/** 查询用户消息列表
@platform: all
@param params {object} pageNumber  number 必传 页码
pageSize   number 必传 页大小
msgType   number 必传 消息类型
content string 非必传
title string 非必传
isRead bool  是否已读 非必传
deviceKey string  非必传  网关设备deviceKey
productKey string  非必传 网关设备productKey
callback  {"data": {"list" : [], "total" : 12}}
@return Promise
*/
function getUserMessageListWithParams(params: Object): Promise<any> {
  return NativeModules.QuecRNUserModule.getUserMessageListWithParams(params);
}

/** 查询所有产品列表
@platform: all
@param productKey {string} product key
@return Promise
*/
function getAllProductListWithProductKey(productKey: string): Promise<any> {
  return NativeModules.QuecRNUserModule.getAllProductListWithProductKey(productKey);
}

const QuecRNUserModuleMethods = {
  getUserMessageListWithParams,
  getAllProductListWithProductKey,
};
const QuecRNUserModuleEvents = {};
const QuecRNUserModule = {
  ...NativeModules.QuecRNUserModule,
  ...QuecRNUserModuleMethods,
  ...QuecRNUserModuleEvents,
};
export default QuecRNUserModule;
