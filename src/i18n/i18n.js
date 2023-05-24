/**
 * Created by vic.huang on 2022/12/13.
 */
import zh from './locales/zh';
import { I18n } from 'i18n-js';
import { translate } from '../plugin/language/i18n';

const i18n = new I18n({
    zh,
}, { locale: 'zh', enableFallback: true });

export default function (name, option) {
    /**
     * 使用本地语言文件，需要在{@link zh}配置对应的语言
     * 使用场景：开发期间可使用本地文件，
     * 目的：避免频繁更新远程文件
     * 更新远程文件时机：1.详细设计期间梳理出的语言  2.开发完成后在详细设计期间输出语言文件基础上补充的语言
     */
    if (__DEV__) {
        return i18n.t(name, option);
    }
    /**
     *  线上版本统一使用远程语言文件，
     */
    return translate(name, option);
}
