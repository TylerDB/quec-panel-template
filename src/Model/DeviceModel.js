/**
 * "accessType": "0",
 "activeTime": "2023-01-04 16:55:25",
 "activeTimeTs": 1672822525000,
 "authCode": "CFB56B0F8DC514B1",
 "authKey": "gcZjeRNwSZYYRd/nFr8udg==",
 "bindType": null,
 "btPwd": null,
 "deviceBindTime": "2023-01-04 16:55:34",
 "deviceBindTimeTs": 1672822534000,
 "deviceCreateTime": "2023-01-04 16:55:23",
 "deviceCreateTimeTs": 1672822523000,
 "deviceKey": "ec1d9e612879",
 "deviceName": "香薰机",
 "deviceStatus": "在线",
 "deviceType": 1,
 "enabled": true,
 "invaildTime": null,
 "invaildTimeTs": 0,
 "lastConnTime": "2023-01-04 16:55:23",
 "lastConnTimeTs": 1672822523000,
 "lastOfflineTime": null,
 "lastOfflineTimeTs": 0,
 "locateType": "AUTO;LBS;WIFI;",
 "logoImage": null,
 "networkType": "1",
 "onlineStatus": 1,
 "ownerUid": null,
 "phone": "18119685951",
 "productIcon": null,
 "productKey": "p11p1s",
 "productName": "XXJ_公版-剩余容量",
 "protocol": "MQTT",
 "selected": false,
 "shareCode": null,
 "signalStrength": "-113",
 "sn": null,
 "status": 1,
 "uid": "C3266",
 "userName": "QULkGn9PFkV",
 "verified": "1"
 */

export interface DeviceModel {
  accessType: string;
  activeTime: string;
  activeTimeTs: number;
  authCode: string;
  authKey: string;
  bindType?: any;
  btPwd?: any;
  deviceBindTime: string;
  deviceBindTimeTs: number;
  deviceCreateTime: string;
  deviceCreateTimeTs: number;
  deviceKey: string;
  deviceName: string;
  deviceStatus: string;
  deviceType: number;
  enabled: boolean;
  invaildTime?: any;
  invaildTimeTs: number;
  lastConnTime: string;
  lastConnTimeTs: number;
  lastOfflineTime?: any;
  lastOfflineTimeTs: number;
  locateType: string;
  logoImage?: any;
  networkType: string;
  onlineStatus: number;
  ownerUid?: any;
  phone: string;
  productIcon?: any;
  productKey: string;
  productName: string;
  protocol: string;
  selected: boolean;
  shareCode?: any;
  signalStrength: string;
  sn?: any;
  status: number;
  uid: string;
  userName: string;
  verified: string;
}
