
import React from 'react';
import { NativeModules, EmitterSubscription, NativeEventEmitter, Platform } from 'react-native';

/**
面板多语言模块
@version: 0.1.8
@owner: vic.huang@quectel.com
@platform: all
*/

const QuecRNLanguageModuleMethods = {};
const QuecRNLanguageModuleEvents = {};
const QuecRNLanguageModule = {
  ...NativeModules.QuecRNLanguageModule,
  ...QuecRNLanguageModuleMethods,
  ...QuecRNLanguageModuleEvents,
};
export default QuecRNLanguageModule;
