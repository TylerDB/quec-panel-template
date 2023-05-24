import React, { Component } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import i18n from '../../i18n/i18n';
import NetError from '../../component/NetError';
import { baseRecordStyle } from './style';
import TimeUtils from '../../util/TimeUtils';
import QuecRNUserModule from '../../plugin';

/**
 * 默认页下标
 * @type {number}
 */
const DEFAULT_PAGE_NUM = 1;
/**
 * 默认页大小
 * @type {number}
 */
const DEFAULT_PAGE_SIZE = 15;
/**
 * 事件类型
 * @type {null}
 */
let eventType = null;
/**
 * 单个设备告警与故障记录的基类
 */
export default class BaseRecord extends Component {
    constructor (props) {
        super(props);
        this.state = {
            pageNum: DEFAULT_PAGE_NUM, //页下标
            pageSize: DEFAULT_PAGE_SIZE, //页大小
            isRefresh: false, //是否刷新
            isLoadMore: false, //是否加载更多
            canLoadMore: false,
            total: 0, //数据总页数
            isEmpty: false,
            isNetError: false,
            dataList: [],
        };
    }

    componentDidMount () {
        this.resetData();
    }

    componentWillUnmount () {

    }

    /**
     * 设置事件类型
     * @param type 告警/故障
     */
    setEventType (type) {
        eventType = type;
    }

    /**
     * 获取告警记录
     */
    getAlarmLog (pageNum) {
        const { pageSize, isRefresh, isLoadMore } = this.state;
        if (!isRefresh) {
            global.loading();
        }

        let param = {
            pageNumber: pageNum,
            pageSize: pageSize,
            msgType: eventType,
            productKey: global.device.productKey,
            deviceKey: global.device.deviceKey,
        };
        QuecRNUserModule.getUserMessageListWithParams(param).
            then(res => {
                console.log('msg list-getAlarmLog-:' + JSON.stringify(res));
                for (let i = 0; i < res.data.list.length; i++) {
                    res.data.list[i].id = res.data.list[i].id ?? res.data.list[i].msgId;
                }
                if (isLoadMore) {
                    this.handlerLoadMore(res);
                } else {
                    this.handlerData(res);
                }
            }).
            catch(error => {
                if (!isRefresh) {
                    global.loadingDismiss();
                } else {
                    this.setState({
                        isRefresh: false,
                    });
                }
            });
    }

    /**
     * 刷新数据
     */
    onRefresh () {
        this.setState(
            {
                isRefresh: true,
                isLoadMore: false,
                pageNum: DEFAULT_PAGE_NUM,
                dataList: null,
                isNetError: false,
                isEmpty: false,
            },
            () => {
                this.getAlarmLog(DEFAULT_PAGE_NUM);
            },
        );
    }

    /**
     * 重置数据
     */
    resetData () {
        this.setState(
            {
                isRefresh: false,
                isLoadMore: false,
                pageNum: DEFAULT_PAGE_NUM,
                dataList: null,
                isNetError: false,
                isEmpty: false,
            },
            () => {
                this.getAlarmLog(DEFAULT_PAGE_NUM);
            },
        );
    }

    /**
     * 处理数据
     * @param res
     */
    handlerData (res) {
        const { isRefresh } = this.state;
        if (isRefresh) {
            this.setState({
                isRefresh: false,
            });
        } else {
            global.loadingDismiss();
        }
        if (res.data.list.length > 0) {
            if (res.data.list && res.data.list.length > 0) {
                this.markUIChange(res.data.list);
                this.setState({
                    dataList: res.data.list,
                    isEmpty: false,
                    isNetError: false,
                    total: res.data.total,
                });
            } else {
                this.setState({
                    isEmpty: true,
                    isNetError: false,
                });
            }
        } else {
            this.setState({
                isEmpty: true,
            });

        }
    }

    /**
     * 加载更多
     */
    onLoadMore () {
        const { pageNum, pageSize, total } = this.state;
        if (total < pageNum * pageSize) {
            global.toast(i18n('no_more_data'));
            return;
        }
        this.setState(
            {
                isRefresh: false,
                isLoadMore: true,
                canLoadMore: false,
            },
            () => {
                this.getAlarmLog(pageNum + 1);
            },
        );
    }

    /**
     * 处理加载更多
     * @param res
     */
    handlerLoadMore (res) {
        global.loadingDismiss();
        const { dataList, pageNum } = this.state;
        if (res.data.list.length > 0) {
            if (res.data.list && res.data.list.length > 0) {
                let list = dataList.concat(res.data.list);
                this.markUIChange(list);
                this.setState({
                    dataList: list,
                    pageNum: pageNum + 1,
                    total: res.data.total,
                });
            } else {
                global.toast(i18n('no_more_data'));
            }
        } else {
            global.toast(res.msg);
        }
    }

    /**
     * 标记是否绘制日期和分割新
     * @param dataList
     */
    markUIChange (dataList) {
        if (dataList) {
            dataList.forEach((record, index) => {
                record.isDrawTop = index !== 0;
                record.isDrawBottom = index !== dataList.length - 1;
            });
        }
    }

    render () {
        const { isEmpty, isNetError, dataList, isRefresh, canLoadMore } = this.state;
        //网络错误
        if (isNetError) {
            return <NetError onClick={() => {
                this.resetData();
            }}/>;
        }
        //空页面
        if (isEmpty) {
            return this.renderEmptyView();
        }
        //正常页面
        return <FlatList
            style={baseRecordStyle.containerStyle}
            data={dataList}
            refreshing={isRefresh}
            onRefresh={this.onRefresh.bind(this)}
            renderItem={item => this.renderItem(item)}
            onEndReachedThreshold={0.1}
            keyExtractor={item => item.id}
            onScrollBeginDrag={() => {
                this.setState({
                    canLoadMore: true,
                });
            }}
            onScrollEndDrag={() => {
                this.setState({
                    canLoadMore: false,
                });
            }}
            onMomentumScrollBegin={() => {
                this.setState({
                    canLoadMore: true,
                });
            }}
            onMomentumScrollEnd={() => {
                this.setState({
                    canLoadMore: false,
                });
            }}
            onEndReached={() => {
                if (canLoadMore) {
                    this.onLoadMore();
                }
            }}
        />;
    }

    /**
     * 渲染空页面
     */
    renderEmptyView () {
        return <View style={[baseRecordStyle.containerStyle, baseRecordStyle.emptyMessageContainerStyle]}>
            <Image source={require('../../image/icon_no_data.png')} style={baseRecordStyle.emptyMessageIconStyle}/>
            <Text style={baseRecordStyle.emptyMessageTextStyle}>{i18n('no_data')}</Text>
        </View>;
    }

    /**
     * 渲染列表条目页面
     */
    renderItem (item) {
        return (
            <View style={baseRecordStyle.recordContainerStyle}>
                <View style={baseRecordStyle.timelineContainerStyle}>
                    <View style={item.item.isDrawTop ? baseRecordStyle.timelineTopShowStyle
                        : baseRecordStyle.timelineTopHideStyle}/>
                    <View style={baseRecordStyle.timelineDotStyle}/>
                    <View style={item.item.isDrawBottom ? baseRecordStyle.timelineBottomShowStyle
                        : baseRecordStyle.timelineBottomHideStyle}/>
                </View>
                <View style={baseRecordStyle.recordContentContainerStyle}>
                    <Text style={baseRecordStyle.recordTextStyle}>
                        {item.item.title}
                    </Text>
                    <Text style={baseRecordStyle.timeTextStyle}>
                        {TimeUtils.formatDate(item.item.addTime, i18n('time_format_long'))}
                    </Text>
                </View>
            </View>
        );
    }

}
