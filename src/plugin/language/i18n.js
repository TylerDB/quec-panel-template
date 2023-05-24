/**
 * Created by vic.huang on 2022/12/13.
 */
import { I18n } from "i18n-js";
import memoize from "lodash.memoize";
import {NativeModules, I18nManager} from 'react-native';

const i18n = new I18n()
// var lang = NativeModules.QuecRNLanguageModule.getConstants()
// console.log('origin getConstants:', lang);

var languageContent = NativeModules.QuecRNLanguageModule.getConstants().languageContent
// console.log('origin languageContent:', languageContent);
var appLanguageCode = NativeModules.QuecRNLanguageModule.getConstants().languageCode
if (appLanguageCode == "EN" || appLanguageCode == "CN") {
   //do nothing 因为中英文默认有
} else {
  var appLangContent = languageContent[NativeModules.QuecRNLanguageModule.getConstants().languageCode]
  const enLangContent = languageContent["EN"]// 面板多语言接口，EN默认下发
  // console.log('origin appLangContent:', appLangContent);
  // console.log('enLangContent:', enLangContent);
  appLangContent = Object.assign(enLangContent, appLangContent);//合并
  // console.log('merge appLangContent:', appLangContent);
  languageContent[appLanguageCode] = appLangContent
}

export const translate = memoize(
  (key, config) => i18n.translate(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)

export const setupI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "EN", isRTL: false };

  var appLanguageCode = NativeModules.QuecRNLanguageModule.getConstants().languageCode
  if (appLanguageCode == null || appLanguageCode == undefined) {
    appLanguageCode = fallback.languageTag
  }
  
  const { languageTag, isRTL } =
  { languageTag: appLanguageCode, isRTL: fallback.isRTL }
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  console.log('final languageContent:', languageContent);
  // set i18n-js config
  i18n.translations = {
    [languageTag]: languageContent[languageTag],
  };

  i18n.locale = languageTag;
}

export default translate