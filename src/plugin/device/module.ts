
import React from 'react';
import { NativeModules, EmitterSubscription, NativeEventEmitter, Platform } from 'react-native';

const NativeNotificationModule = new NativeEventEmitter(NativeModules.QuecRNDeviceModule);

/**
设备桥组件
@version: 1.6.5
@owner: vic.huang@quectel.com
@platform: all
*/

/** 获取设备通道状态
@platform: all
@return Promise
*/
function getBleState(): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getBleState();
}

/** 获取物模型以及属性值
@platform: all
@param params {object} map
productKey  string  产品key
deviceKey   string   设备key
codeList   string  非必填  查询的属性标识符
gatewayDk string  网关设备的 Device Key
gatewayPk string  网关设备的 Product Key
和查询类型配合使用，如果查询多个属性，使用英文逗号分隔
type  string 非必填 查询类型
1 查询设备基础属性
2 查询物模型属性
3 查询定位信息
查询类型可以单选和多选，如果需要查询多个类型的属性值，使用英文逗号分隔
@return Promise
*/
function getTslAndAttrs(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getTslAndAttrs(params);
}

/** read data points
@platform: all
@param dps {Array<object>} – dps [ {id:0, type:BOOL, value:false} ,{id:1, type:INT, value:2}]
@return Promise
*/
function readDps(dps: Array<object>): Promise<any> {
  return NativeModules.QuecRNDeviceModule.readDps(dps);
}

/** write data points
@platform: all
@param dps {Array<object>} – dps [ {id:0, type:BOOL, value:false} ,{id:1, type:INT, value:2}]
@return Promise
*/
function writeDps(dps: Array<object>): Promise<any> {
  return NativeModules.QuecRNDeviceModule.writeDps(dps);
}

/** read data points
@platform: all
@param dps {Array<object>} – dps [ {id:0, type:BOOL, value:false} ,{id:1, type:INT, value:2}]
@param mode {integer} – mode 下发模式： 0 auto，1: websocket 2:wifi 3:ble
@return Promise
*/
function readDpsWithMode(dps: Array<object>, mode: number): Promise<any> {
  return NativeModules.QuecRNDeviceModule.readDpsWithMode(dps, mode);
}

/** write data points
@platform: all
@param dps {Array<object>} – dps [ {id:0, type:BOOL, value:false} ,{id:1, type:INT, value:2}]
@param mode {integer} – mode 下发模式： 0 auto，1: websocket 2:wifi 3:ble
@return Promise
*/
function writeDpsWithMode(dps: Array<object>, mode: number): Promise<any> {
  return NativeModules.QuecRNDeviceModule.writeDpsWithMode(dps, mode);
}

/** 获取设备通道状态
@platform: all
@return Promise
*/
function getOnlineState(): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getOnlineState();
}

/** 建立通道，（设备会自动根据设备通道能力capabilitiesBitmask建立通道，此API用于手动切换指定通道）
@platform: all
@param mode {integer} – mode 建立通道模式： 0 auto，1: websocket 2:wifi 3:ble
注意：1，建立的通通与已连接通道不同时，已连接通道会断开。
2，当设备不具备相应通道，建立其不具备的通道会失败。不会再自动建立其他通道
*/
function connectChannel(mode: number) {
  return NativeModules.QuecRNDeviceModule.connectChannel(mode);
}

/** 断开通道，（
@platform: all
@param type {integer} – type 通道类型，0: 关闭所有通道, 1: websocket 2:wifi 3:ble
*/
function disconnectChannel(type: number) {
  return NativeModules.QuecRNDeviceModule.disconnectChannel(type);
}

/**该方法已废弃 获取websocket是否登录成功
@platform: all
@param isLoginCallback {successcb} Func 接受是否登录websocket回调  已登录成功 true  登录失败  false
*/
function isWebSocketLoginCallback(isLoginCallback: Function) {
  return NativeModules.QuecRNDeviceModule.isWebSocketLoginCallback(isLoginCallback);
}

/**该方法已废弃 订阅设备
@platform: all
@param list {Array<object>} 订阅设备列表，订阅结果QuecDeviceServiceWebSocketDelegate返回
[
{
"deviceKey": "1234567890",
"messageType": [
"ONLINE"
],
"productKey": "p12345"
},
{
"deviceKey": "1234567890",
"messageType": [
"ONLINE",
"STATUS"
],
"productKey": "p12345"
}
]
*/
function subscribeDevicesWithList(list: Array<object>) {
  return NativeModules.QuecRNDeviceModule.subscribeDevicesWithList(list);
}

/**该方法已废弃 取消订阅设备
@platform: all
@param list {Array<object>} 取消订阅设备列表，取消订阅结果QuecDeviceServiceWebSocketDelegate返回
[
{
"deviceKey": "1234567890",
"productKey": "p12345"
},
{
"deviceKey": "1234567890",
"productKey": "p12345"
}
]
*/
function unSubscribeDevicesWithList(list: Array<object>) {
  return NativeModules.QuecRNDeviceModule.unSubscribeDevicesWithList(list);
}

/**该方法已废弃 获取设备业务属性值
@platform: all
@param params {object} 发送数据，需要在delegate的websocketDidOpen回调之后才能调用
透传
{
"cmd": "send",
"data": {
"cacheTime": 3600,
"dataFormat": "Text",
"deviceKey": "866123456789015",
"isCache": true,
"productKey": "p12345",
"raw": "123456",
"type": "RAW"
}
}
物模型
{
"cmd": "send",
"data": {
"deviceKey": "1234567890",
"kv": "[{\"id\":5,\"name\":\"openapi\",\"type\":\"BOOL\",\"value\":\"true\"}]",
"productKey": "p12345",
"type": "WRITE-ATTR"
}
}
*/
function sendDataToDeviceByWebSocketWithDataDict(params: Object) {
  return NativeModules.QuecRNDeviceModule.sendDataToDeviceByWebSocketWithDataDict(params);
}

/**该方法已废弃 获取设备列表
@platform: all
@param pageNumber {integer} number 页码
@param pageSize {integer} number 页大小
@return Promise
*/
function getDeviceListWithPageNumber(pageNumber: number, pageSize: number): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getDeviceListWithPageNumber(pageNumber, pageSize);
}

/**该方法已废弃 获取设备业务物模型属性值
@platform: all
@param params {object} map
productKey  string  产品key
deviceKey   string   设备key
codeList   string  非必填  查询的属性标识符
gatewayDk string  网关设备的 Device Key
gatewayPk string  网关设备的 Product Key
和查询类型配合使用，如果查询多个属性，使用英文逗号分隔
type  string 非必填 查询类型
1 查询设备基础属性
2 查询物模型属性
3 查询定位信息
查询类型可以单选和多选，如果需要查询多个类型的属性值，使用英文逗号分隔
@return Promise
*/
function getProductTSLWithProductKey(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getProductTSLWithProductKey(params);
}

/**该方法已废弃 获取设备业务属性值
@platform: all
@param params {object} map
productKey  string  产品key
deviceKey   string   设备key
codeList   string  非必填  查询的属性标识符
和查询类型配合使用，如果查询多个属性，使用英文逗号分隔
type  string 非必填 查询类型
1 查询设备基础属性
2 查询物模型属性
3 查询定位信息
查询类型可以单选和多选，如果需要查询多个类型的属性值，使用英文逗号分隔
@return Promise
*/
function getDeviceBusinessAttributesWithProductKey(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getDeviceBusinessAttributesWithProductKey(params);
}

/**该方法已废弃 更改分享设备名称
@platform: all
@param deviceName {string} string   设备名称
@param shareCode {string} string   分享码
@return Promise
*/
function updateDeviceNameByShareUserWithDeviceName(
  deviceName: string,
  shareCode: string
): Promise<any> {
  return NativeModules.QuecRNDeviceModule.updateDeviceNameByShareUserWithDeviceName(
    deviceName,
    shareCode
  );
}

/**该方法已废弃 更改分享设备名称
@platform: all
@param deviceName {string} string   deviceName
@param productKey {string} string   product key
@param deviceKey {string} string   deviceKey
@return Promise
*/
function updateDeviceName(deviceName: string, productKey: string, deviceKey: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.updateDeviceName(deviceName, productKey, deviceKey);
}

/**该方法已废弃 查询网关设备下子设备列表
@platform: all
@param params {object} deviceKey string  必传  网关设备deviceKey
productKey string  必传 网关设备productKey
pageNumber number 必传 页码
pageSize number 必传 页大小
@return Promise
*/
function getGatewayDeviceChildListWithParams(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getGatewayDeviceChildListWithParams(params);
}

/**该方法已废弃 设备解绑
@platform: all
@param deviceKey {string} string  device key
@param productKey {string} string  product key
@return Promise
*/
function unbindDeviceWithDeviceKey(deviceKey: string, productKey: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.unbindDeviceWithDeviceKey(deviceKey, productKey);
}

/**该方法已废弃 设备解绑
@platform: all
@param shareCode {string} string  分享码
@return Promise
*/
function unShareDeviceByShareUserWithShareCode(shareCode: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.unShareDeviceByShareUserWithShareCode(shareCode);
}

/** 获取设备属性图表列表
@platform: all
@param params {object} productKey 产品key
deviceKey 设备key
startTimestamp 开始时间（毫秒时间戳）
endTimestamp 结束时间（毫秒时间戳）
attributeCode 物模型属性标识符，查询多个属性时使用英文逗号分隔
gatewayDk 网关设备的 Device Key
gatewayPk 网关设备的 Product Key
countType 聚合类型（默认3）：1-最大值 2-最小值 3-平均值 4-差值 5-总值
timeGranularity 统计时间粒度（默认2）：1-月 2-日 3-小时 4-分钟 5-秒
callback  {"data": []}
@return Promise
*/
function getPropertyChartListWithParams(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getPropertyChartListWithParams(params);
}

/** 获取设备分享人列表
@platform: all
@param deviceKey {string} string  设备名称
@param productKey {string} string   产品key
@return Promise
*/
function getDeviceShareUserListWithDeviceKey(deviceKey: string, productKey: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getDeviceShareUserListWithDeviceKey(
    deviceKey,
    productKey
  );
}

/** 分享人设置分享信息
@platform: all
@param params {object} deviceKey  string   设备key
productKey   string   产品key
acceptingExpireTime  number   分享二维码种子失效时间 时间戳（毫秒），表示该分享在此时间戳时间内没有使用，会失效
coverMark   number   覆盖标志:1 直接覆盖上条有效分享（默认）（覆盖原有的分享码）；2 直接添加，允许多条并存；3 只有分享时间延长了，才允许覆盖上条分享
isSharingAlwaysValid   bool   设备是否永久有效
sharingExpireTime   number   设备使用到期时间 时间戳（毫秒），表示该分享的设备，被分享人可以使用的时间，isSharingAlwaysValid为YES时该参数无效
@return Promise
*/
function setShareInfoByOwnerWithDeviceKey(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.setShareInfoByOwnerWithDeviceKey(params);
}

/** 分享人取消分享
@platform: all
@param shareCode {string} string   分享码
@return Promise
*/
function unShareDeviceByOwnerWithShareCode(shareCode: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.unShareDeviceByOwnerWithShareCode(shareCode);
}

/** 获取设备历史轨迹
@platform: all
@param params {object} productKey 产品key
deviceKey 设备key
startTimestamp 开始时间（毫秒时间戳）
endTimestamp 结束时间（毫秒时间戳）
gatewayDk 网关设备的 Device Key
gatewayPk 网关设备的 Product Key
locateTypes 定位类型（默认查询所有类型的定位），查询多种定位时使用英文逗号分隔
GNSS-全球导航卫星系统
GPS-美国导航定位系统
GL-俄罗斯格洛纳导航定位系统
GA-欧盟伽利略卫星导航系统
BD/PQ-中国导航定位系统
LBS-基于通信运营商的基站定位系统
@return Promise
*/
function getLocationHistoryWithParams(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getLocationHistoryWithParams(params);
}

/** 获取设备信息
@platform: all
@param deviceKey {string} string 设备key
@param productKey {string} string 产品key
@return Promise
*/
function getDeviceInfoByDeviceKey(deviceKey: string, productKey: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getDeviceInfoByDeviceKey(deviceKey, productKey);
}

/** 获取设备属性信息
@platform: all
@param params {object} map
productKey 产品key
deviceKey 设备key
startTimestamp 开始时间（毫秒时间戳）
endTimestamp 结束时间（毫秒时间戳）
attributeCode 物模型属性标识符，查询多个属性时使用英文逗号分隔
gatewayDk 网关设备的 Device Key
gatewayPk 网关设备的 Product Key
pageNumber 当前页，默认为第 1 页
pageSize 页大小，默认为 10 条
@return Promise
*/
function getPropertyDataListWithParams(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getPropertyDataListWithParams(params);
}

/** 获取设备属性环比统计数据
@platform: all
@param params {object} map
productKey 产品key
deviceKey 设备key
currentTimestamp 当前时间（毫秒时间戳
attributeCode 物模型属性标识符，查询多个属性时使用英文逗号分隔
gatewayDk 网关设备的 Device Key
gatewayPk 网关设备的 Product Key
countType 聚合类型（默认3）：1-最大值 2-最小值 3-平均值 4-差值 5-总值
timeGranularities 统计时间粒度，查询多个粒度时使用英文逗号分隔（默认1）：1-日 2-周 3-月 4-年
callback  {"data": []}
@return Promise
*/
function getPropertyStatisticsWithParams(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getPropertyStatisticsWithParams(params);
}

/** 通过分享码查询设备信息
@platform: all
@param shareCode {string} 分享码
@return Promise
*/
function getDeviceInfoByShareCode(shareCode: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getDeviceInfoByShareCode(shareCode);
}

/** 获取设备列表-根据设备名称搜索
@platform: all
@param deviceName {string} 设备名称
@param pageNumber {integer} number 页码
@param pageSize {integer} number 页大小
@return Promise
*/
function getDeviceListByDeviceName(
  deviceName: string,
  pageNumber: number,
  pageSize: number
): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getDeviceListByDeviceName(
    deviceName,
    pageNumber,
    pageSize
  );
}

/** 通过SN绑定设备
@platform: all
@param serialNumber {string} string 设备SN码
@param productKey {string} string 产品key
@param deviceName {string} string 设备名称
@return Promise
*/
function bindDeviceBySerialNumber(
  serialNumber: string,
  productKey: string,
  deviceName: string
): Promise<any> {
  return NativeModules.QuecRNDeviceModule.bindDeviceBySerialNumber(
    serialNumber,
    productKey,
    deviceName
  );
}

/** 通过authCode绑定设备
可用于wifi/wifi+蓝牙设备绑定
@platform: all
@param params {object} Map  包含以下属性
authCode  string 设备authCode
productKey  string 产品key
deviceKey  string 设备key
deviceName  string 设备名称
@return Promise
*/
function bindDeviceByAuthCode(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.bindDeviceByAuthCode(params);
}

/** 通过authCode + password绑定设备
可用于蓝牙设备绑定
@platform: all
@param params {object} Map  包含以下属性
authCode   string 设备authCode
productKey   string 产品key
deviceKey   string 设备key
password   string 设备password
deviceName   string 设备名称
@return Promise
*/
function bindDeviceByPSWAuthCode(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.bindDeviceByPSWAuthCode(params);
}

/** 查询设备升级信息
@platform: all
@param productKey {string} string  产品key
@param deviceKey {string} string  设备key
@param params {object} map  其他信息  非必传
batteryLevelLimit  number  设备剩余电量百分比
mcuVersions    array      固件信息  componentNo  string  升级组件标识   version  string  升级组件版本
minSignalIntensity  number  设备最小信号量 dbM
moduleVersion    string    模组版本
upgradeTime   number     升级时间时间戳，默认为当前时间戳
useSpace     number      所需磁盘空间，KB
{'batteryLevelLimit':1, 'mcuVersions':[{'componentNo': '', 'version': ''}], 'minSignalIntensity':1, 'moduleVersion':'', 'upgradeTime':1, 'useSpace':1}
@return Promise
*/
function getFetchPlanWithProductKey(
  productKey: string,
  deviceKey: string,
  params: Object
): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getFetchPlanWithProductKey(productKey, deviceKey, params);
}

/** 上报设备升级信息
@platform: all
@param params {object} map
productKey   string   产品key
deviceKey   string  设备key
componentNo  string  升级固件标识
reportStatus  number  升级状态 0 - 1 2
@return Promise
*/
function reportDeviceUpgradeStatusWithProductKey(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.reportDeviceUpgradeStatusWithProductKey(params);
}

/** 设备批量控制
@platform: all
@param params {object} Map
data 遵循tsl格式的json string [{"id":62,"value":99,"type":"INT","name":"温度(temp)"},{"id":63,"value":"true","type":"BOOL","name":"开关机状态(powerstate)"}]
deviceList 设备列表 [{"deviceKey":"", "productKey":""}]
type   number   类型 1：透传 2：属性 3：服务
dataFormat   number  数据类型 1：Hex 2：Text（当type为透传时，需要指定 dataFormat）
cacheTime  number  非必传   缓存时间，单位为秒，缓存时间范围 1-7776000 秒，启用缓存时必须设置缓存时间
isCache number 非必传  是否启用缓存 1：启用 2：不启用，默认不启用
isCover number 非必传  是否覆盖之前发送的相同的命令 1：覆盖 2：不覆盖，默认不覆盖，启用缓存时此参数有效
@return Promise
*/
function sendDataToDevicesByHttpWithData(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.sendDataToDevicesByHttpWithData(params);
}

/** 创建定时任务
@platform: all
@param params {object} productKey – string 必传  产品key
deviceKey – string 必传 设备key
type – string 必传  定时任务类型，once: 执行一次，day-repeat: 每天重复，custom-repeat: 自定义重复，multi-section: 多段执行，random: 随机执行，delay: 延迟执行（倒计时）
timers:[{
action – string 必传 定时任务执行的命令，格式：物模型的 json 字符串,
time – string 非必传  执行时间，格式为 HH:mm:ss, 当 type = once || day-repeat || custom-repeat ||
multi-section 时必填,
startTime – string 非必传  当 type 为 random 时必填，格式为 "HH:mm:ss"，如 "12:00:00"
endTime – string 非必传  当 type 为 random 时必填，格式为 "HH:mm:ss"，如 "12:00:00"
delay – number 非必传 延迟执行时间，单位为秒, 当 type = delay 时必填，单位为 s
}]
enabled – 定时任务状态：false-停止（默认） true-启动
dayOfWeek – string 非必传  周几执行：1-周一 2-周二 3-周三 4-周四 5-周五 6-周六 7-周日, 可以多选，传多个值时使用英文逗号分隔, 当 type = custom-repeat || multi-section || random 时必填
@return Promise
*/
function addCornJob(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.addCornJob(params);
}

/** 修改定时任务
@platform: all
@param params {object} productKey – string 必传  产品key
deviceKey – string 必传 设备key
ruleId – string 必传 规则唯一标识，修改规则实例信息时必填
type – string 必传  定时任务类型，once: 执行一次，day-repeat: 每天重复，custom-repeat: 自定义重复，multi-section: 多段执行，random: 随机执行，delay: 延迟执行（倒计时）
timers:[{
action – string 必传 定时任务执行的命令，格式：物模型的 json 字符串,
time – string 非必传  执行时间，格式为 HH:mm:ss, 当 type = once || day-repeat || custom-repeat ||
multi-section 时必填,
startTime – string 非必传  当 type 为 random 时必填，格式为 "HH:mm:ss"，如 "12:00:00"
endTime – string 非必传  当 type 为 random 时必填，格式为 "HH:mm:ss"，如 "12:00:00"
delay – number 非必传 延迟执行时间，单位为秒, 当 type = delay 时必填，单位为 s
}]
enabled – 定时任务状态：false-停止（默认） true-启动
dayOfWeek – string 非必传  周几执行：1-周一 2-周二 3-周三 4-周四 5-周五 6-周六 7-周日, 可以多选，传多个值时使用英文逗号分隔, 当 type = custom-repeat || multi-section || random 时必填
@return Promise
*/
function setCronJob(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.setCronJob(params);
}

/** 查询设备下定时任务列表
@platform: all
@param params {object} productKey – string 必传  产品key
deviceKey – string 必传 设备key
type – string 必传  定时任务类型，once: 执行一次，day-repeat: 每天重复，custom-repeat: 自定义重复，multi-section: 多段执行，random: 随机执行，delay: 延迟执行（倒计时）
page – number 分页页码，默认: 1
pageSize – number 分页大小，默认: 10
@return Promise
*/
function getCronJobList(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getCronJobList(params);
}

/** 查询定时任务详情
@platform: all
@param ruleId {string} – string 必传 定时任务ID
@return Promise
*/
function getCronJobInfo(ruleId: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getCronJobInfo(ruleId);
}

/** 批量删除定时任务
@platform: all
@param params {object} – {ruleIdList:[] String[] 必传 定时任务ID}
@return Promise
*/
function batchDeleteCronJob(params: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.batchDeleteCronJob(params);
}

/** 查询产品下定时任务限制数
@platform: all
@param productKey {string} – string 必传  产品key
@return Promise
*/
function getProductCornJobLimit(productKey: string): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getProductCornJobLimit(productKey);
}

/** 打开websocket
@platform: all
*/
function openWebSocket() {
  return NativeModules.QuecRNDeviceModule.openWebSocket();
}

/** 关闭websocket
@platform: all
*/
function closeWebSocket() {
  return NativeModules.QuecRNDeviceModule.closeWebSocket();
}

/** 查询产品的tls模型
@platform: all
@param param {object} -{productKey:String } --必传
@return Promise
*/
function getProductTSLWithCacheByProductKey(param: Object): Promise<any> {
  return NativeModules.QuecRNDeviceModule.getProductTSLWithCacheByProductKey(param);
}

/** 设备在离线状态通知
@call (object:object)=>{}  @param object   事件数据 {"onlineState": 0/1/2/3/4/5/6/7}
onlineStateMaskWS   = 1 << 0,
onlineStateMaskWifi = 1 << 1,
onlineStateMaskBle  = 1 << 2,
（0: all offline, 1: websocket online, 2 : wifi online, 3: wifi + websocket online, 4: ble online, 5: websocket + ble online, 6: ble + wifi online , 7: wifi + ble + ws online)
*/
function NativeEvent_onDeviceOnlineState(call: (object: object) => void): EmitterSubscription {
  return NativeNotificationModule.addListener('onDeviceOnlineState', call);
}

/** 设备dps更新
@call (object:object)=>{}  @param object   事件数据 {
type: （1：ws 2: wifi 3: ble，）
pk: "xxxx",
dk: "xxxx",
"dps": [{id: 0, type:BOOL, value, true/false},{id: 1, type:INT, value, 1}, ...]
}
*/
function NativeEvent_onDeviceDpsUpdate(call: (object: object) => void): EmitterSubscription {
  return NativeNotificationModule.addListener('onDeviceDpsUpdate', call);
}

/** 设备信息更新
@call (object:object)=>{}  @param object   事件数据
*/
function NativeEvent_onDeviceInfoUpdate(call: (object: object) => void): EmitterSubscription {
  return NativeNotificationModule.addListener('onDeviceInfoUpdate', call);
}

/** WebSocket 已打开事件
@call (object:object)=>{}  @param object   事件数据 data = {"code":"this is code", @"message":" this is reason"}
reminder.data = {}
*/
function NativeEvent_onWebSocketDidOpen(call: (object: object) => void): EmitterSubscription {
  return NativeNotificationModule.addListener('onWebSocketDidOpen', call);
}

/** WebSocket 错误事件
@call (object:object)=>{}  @param object   事件数据 data = {"code":"this is code", @"message":" this is reason"}
*/
function NativeEvent_onWebSocketDidError(call: (object: object) => void): EmitterSubscription {
  return NativeNotificationModule.addListener('onWebSocketDidError', call);
}

/** WebSocket 消息事件
@call (object:object)=>{}  @param object   事件数据
object.data = {
"cmd": "message",
"data": {
"createdAt": 1609316592000,
"data": {
"value": 1
},
"deviceKey": "866123456789015",
"productKey": "123456",
"ticket": "5f9924d171977c33bc5ad1b1",
"type": "ONLINE"
}
}
error
{
cmd = error;
data =     {
code = 4010;
msg = "user not logged in";
reqMsg = "";
};
*/
function NativeEvent_onWebSocketDidReceiveMessage(
  call: (object: object) => void
): EmitterSubscription {
  return NativeNotificationModule.addListener('onWebSocketDidReceiveMessage', call);
}

const QuecRNDeviceModuleMethods = {
  getBleState,
  getTslAndAttrs,
  readDps,
  writeDps,
  readDpsWithMode,
  writeDpsWithMode,
  getOnlineState,
  connectChannel,
  disconnectChannel,
  isWebSocketLoginCallback,
  subscribeDevicesWithList,
  unSubscribeDevicesWithList,
  sendDataToDeviceByWebSocketWithDataDict,
  getDeviceListWithPageNumber,
  getProductTSLWithProductKey,
  getDeviceBusinessAttributesWithProductKey,
  updateDeviceNameByShareUserWithDeviceName,
  updateDeviceName,
  getGatewayDeviceChildListWithParams,
  unbindDeviceWithDeviceKey,
  unShareDeviceByShareUserWithShareCode,
  getPropertyChartListWithParams,
  getDeviceShareUserListWithDeviceKey,
  setShareInfoByOwnerWithDeviceKey,
  unShareDeviceByOwnerWithShareCode,
  getLocationHistoryWithParams,
  getDeviceInfoByDeviceKey,
  getPropertyDataListWithParams,
  getPropertyStatisticsWithParams,
  getDeviceInfoByShareCode,
  getDeviceListByDeviceName,
  bindDeviceBySerialNumber,
  bindDeviceByAuthCode,
  bindDeviceByPSWAuthCode,
  getFetchPlanWithProductKey,
  reportDeviceUpgradeStatusWithProductKey,
  sendDataToDevicesByHttpWithData,
  addCornJob,
  setCronJob,
  getCronJobList,
  getCronJobInfo,
  batchDeleteCronJob,
  getProductCornJobLimit,
  openWebSocket,
  closeWebSocket,
  getProductTSLWithCacheByProductKey,
};
const QuecRNDeviceModuleEvents = {
  NativeEvent_onDeviceOnlineState,

  NativeEvent_onDeviceDpsUpdate,

  NativeEvent_onDeviceInfoUpdate,

  NativeEvent_onWebSocketDidOpen,

  NativeEvent_onWebSocketDidError,

  NativeEvent_onWebSocketDidReceiveMessage,
};
const QuecRNDeviceModule = {
  ...NativeModules.QuecRNDeviceModule,
  ...QuecRNDeviceModuleMethods,
  ...QuecRNDeviceModuleEvents,
};
export default QuecRNDeviceModule;
