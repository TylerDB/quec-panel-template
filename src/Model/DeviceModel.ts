
export interface DeviceModel {
  /**
   * 访问类型：0-直连设备 1-网关设备 2-网关子设备
   */
  accessType: string;
  /**
   * 激活时间
   */
  activeTime: string;
  /**
   * 激活时间戳
   */
  activeTimeTs: number;
  /**
   * 授权code
   */
  authCode: string;
  /**
   * 授权key
   */
  authKey: string;
  /**
   * 绑定类型
   */
  bindType?: any;
  /**
   * 蓝牙密码
   */
  btPwd?: any;
  /**
   * 绑定时间
   */
  deviceBindTime: string;
  /**
   * 绑定时间戳
   */
  deviceBindTimeTs: number;
  /**
   * 设备创建时间
   */
  deviceCreateTime: string;
  /**
   * 设备创建时间戳
   */
  deviceCreateTimeTs: number;
  /**
   * Device Key
   */
  deviceKey: string;
  /**
   * 设备名称
   */
  deviceName: string;
  /**
   * 设备状态：离线 在线
   */
  deviceStatus: string;
  /**
   * 设备类型
   */
  deviceType: number;
  /**
   * 
   */
  enabled: boolean;
  /**
   * 失效时间
   */
  invaildTime?: any;
  /**
   * 失效时间戳
   */
  invaildTimeTs: number;
  /**
   * 最后上线时间
   */
  lastConnTime: string;
  /**
   * 最后上线时间戳
   */
  lastConnTimeTs: number;
  /**
   * 离线时间
   */
  lastOfflineTime?: any;
  /**
   * 离线时间戳
   */
  lastOfflineTimeTs: number;
  /**
   * 支持的定位内容
   */
  locateType: string;
  /**
   * 产品logo
   */
  logoImage?: any;
  /**
   * 网络类型
   */
  networkType: string;
  /**
   * 设备状态：0-离线 1-在线
   */
  onlineStatus: number;
  /**
   * 拥有者Id
   */
  ownerUid?: any;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 产品图片
   */
  productIcon?: any;
  /**
   * 产品key
   */
  productKey: string;
  /**
   * 产品名称
   */
  productName: string;
  /**
   * 接入时间
   */
  protocol: string;
  /**
   * 
   */
  selected: boolean;
  /**
   * 分享码
   */
  shareCode?: any;
  /**
   * 信号强度
   */
  signalStrength: string;
  /**
   * sn
   */
  sn?: any;
  /**
   * 状态
   */
  status: number;
  /**
   * 用户Id
   */
  uid: string;
  /**
   * 用户名称
   */
  userName: string;
  /**
   * 验证状态
   */
  verified: string;
}
