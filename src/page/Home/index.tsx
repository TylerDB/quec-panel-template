import React from 'react';
import BaseDeviceDetail from '../BaseDeviceDetail';
import { BaseProps, BaseStates} from '../BaseDeviceDetail';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import i18n from '../../i18n/i18n';
import TSLModel from '../../Model/tsl/TSLModel';
import BoolCard from './BoolCard';
import BooleanTSLModel from '../../Model/tsl/bool/BooleanTSLModel';
import {
    TSL_ATTR_DATA_TYPE_BOOL,
    TSL_ATTR_DATA_TYPE_ENUM,
    TSL_ATTR_DATA_TYPE_INT,
} from '../../config/TSLConfig';
import { TSL_SUBTYPE_R } from '../../config/TSLConfig';
import TSLUtils from '../../util/TSLUtils';
import EnumTSLModel from '../../Model/tsl/enum/EnumTSLModel';
import EnumCard from './EnumCard';
import NumberTSLModel from '../../Model/tsl/number/NumberTSLModel';
import NumberCard from './NumberCard';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

const iconSetting = require('../../image/icon_setting.png');
const iconRecoder = require('../../image/icon_recoder.png');

interface HomeProps extends BaseProps {
  // 在这里添加 Home 特有的 Props
}

interface HomeStates extends BaseStates {
  // 物模型属性数据列表
  attrList: Array<TSLModel>,
  sheetData: Array<string> | undefined,
  lastItem: EnumTSLModel | NumberTSLModel | undefined,
  isBleConnected: Boolean,
}

class Home extends BaseDeviceDetail<HomeProps, HomeStates> {

    state: HomeStates = {
        device: global.device,
        reqTSLFailure: false,
        isSucceedSubscribe: false,
        tslEmpty: false,
        attrList: [],
        sheetData: [],
        lastItem: undefined,
        isBleConnected: false,
    }

    bottomSheetRef = React.createRef<BottomSheet>();

    // 在这里编写 Home 组件的具体实现
    componentDidMount(): void {
        super.componentDidMount();
        super.renderTitleView(i18n('home'), [iconRecoder, iconSetting], [
            ()=>{
                this.props.navigation.push('BaseRecord');
            },
            ()=>{
                this.props.navigation.push('BaseMore');
            }]);
        // 获取物模型数据
        super.getModalAttr();
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
    }

    render(): React.ReactNode {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <FlatList
                style={{flex: 1}}
                renderItem={this.renderItem}
                data={this.state.attrList}
                keyExtractor={item => item.code}
            />
            <BottomSheet
                ref={this.bottomSheetRef}
                index={-1}
                snapPoints={['50']}
                enablePanDownToClose={true}
            >
                <BottomSheetFlatList
                    data={this.state.sheetData}
                    keyExtractor={(i) => i}
                    renderItem={this.renderSheetItem}
                />
            </BottomSheet>
        </View>;
    }

    renderSheetItem = ({item}: {item: string}) => {
        return <TouchableOpacity
            style={{flex: 1, alignItems: 'center', height: 44}}
            onPress={()=>{
                if (this.state.lastItem && this.isCanSendCmd()) {
                    if (this.state.lastItem.dataType === TSL_ATTR_DATA_TYPE_INT) {
                        TSLUtils.writeData(this.state.lastItem, Number(item), 0, () => {
                            this.updateValueAfterSendCmd();
                        }, () => {
                            this.handlerFailedSendCmd();
                        });
                    }
                    if (this.state.lastItem.dataType === TSL_ATTR_DATA_TYPE_ENUM) {
                        const lastEnumItem = this.state.lastItem as EnumTSLModel;
                        const value = TSLUtils.getBoolEnumValue(item, lastEnumItem.specs);
                        TSLUtils.writeData(lastEnumItem, value, 0, () => {
                            this.updateValueAfterSendCmd();
                        }, () => {
                            this.handlerFailedSendCmd();
                        });
                    }
                }
            }}
        >
            <Text style={{color: 'black',
                fontSize: 14,
                fontWeight: 'normal'}}>{item}</Text>
        </TouchableOpacity>;
    }

    renderItem = ({ item }: {item: TSLModel}) => {
        if (item.dataType === TSL_ATTR_DATA_TYPE_BOOL) {
            const booleanItem = item as BooleanTSLModel;
            return <BoolCard
                key={booleanItem.code}
                title={booleanItem.name}
                text={TSLUtils.getBoolEnumName(booleanItem.attributeValue.toString(), booleanItem.specs)}
                interactive={booleanItem.subType !== TSL_SUBTYPE_R}
                enabled={booleanItem.attributeValue}
                onPress={(enabled)=>{
                    if (this.isCanSendCmd()) {
                        TSLUtils.writeData(booleanItem, !enabled, 0, () => {
                            this.updateValueAfterSendCmd();
                        }, () => {
                            this.handlerFailedSendCmd();
                        });
                    }
                }}/>;
        }
        if (item.dataType === TSL_ATTR_DATA_TYPE_ENUM) {
            const enumItem = item as EnumTSLModel;
            return <EnumCard
                key={enumItem.code}
                title={enumItem.name}
                text={TSLUtils.getBoolEnumName(enumItem.attributeValue, enumItem.specs)}
                interactive={enumItem.subType !== TSL_SUBTYPE_R}
                onPress={()=>{
                    this.setState({
                        lastItem: enumItem,
                        sheetData: enumItem.specs.map((element) => element.name),
                    }, () => {
                        this.bottomSheetRef.current?.snapToIndex(0);
                    });
                }}/>;
        }
        if (item.dataType === TSL_ATTR_DATA_TYPE_INT) {
            const numberItem = item as NumberTSLModel;
            return <NumberCard
                key={numberItem.code}
                title={numberItem.name}
                text={numberItem.attributeValue.toString()}
                interactive={numberItem.subType !== TSL_SUBTYPE_R}
                onPress={()=>{
                    this.setState({
                        lastItem: numberItem,
                        sheetData: numberItem.validRnage?.map(element => element.toString()),
                    }, () => {
                        this.bottomSheetRef.current?.snapToIndex(0);
                    });
                }}/>;
        }
        return <View key={item.code}/>;
    }

    handlerTSLData(data: any): void {
        // 处理物模型数据
        let attrList: TSLModel[] = [];
        if (typeof data === 'object' && data?.length > 0) {
            data.forEach((element: { dataType: string; }) => {
                // 布尔类型
                if (element?.dataType === TSL_ATTR_DATA_TYPE_BOOL) {
                    attrList.push(TSLUtils.initBooleanModel(element));
                }
                // 枚举类型
                if (element?.dataType === TSL_ATTR_DATA_TYPE_ENUM) {
                    attrList.push(TSLUtils.initEnumModel(element));
                }
                // 数值类型
                if (element?.dataType === TSL_ATTR_DATA_TYPE_INT) {
                    attrList.push(TSLUtils.initNumberModel(element));
                }
            });
        }
        this.setState({
            attrList: attrList,
        });
    }

    handlerReportData(message: any): void {
        //处理物模型上报
        if (message && this.state.attrList.length > 0) {
            for (let i = 0; i < message?.dps?.length; ++i) {
                let dp = message?.dps[i];
                for (let j = 0; j < this.state.attrList.length; ++j) {
                    let element = this.state.attrList[j];
                    if (element?.id === dp?.id) {
                        if (element?.dataType === TSL_ATTR_DATA_TYPE_BOOL) {
                            const booleanElement = element as BooleanTSLModel;
                            TSLUtils.handlerReportBoolAttr(booleanElement, dp.value);
                        }
                        if (element?.dataType === TSL_ATTR_DATA_TYPE_ENUM) {
                            const enumElement = element as EnumTSLModel;
                            TSLUtils.handlerReportEnumAttr(enumElement, dp.value);
                        }
                        if (element?.dataType === TSL_ATTR_DATA_TYPE_INT) {
                            const numberElement = element as NumberTSLModel;
                            TSLUtils.handlerReportNumberAttr(numberElement, dp.value);
                        }
                    }
                }
            }
            this.setState({attrList: this.state.attrList});
        }
    }
}

export default Home;
