import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modalbox';

let lo;
const defaultTimeOut = -1; //设置显示时间标识
let timeOutCallBack;

//todo 多语言处理
export class EasyLoading {
    /**
     * 显示Loading
     * @param text  Loading显示文本，默认为'加载中'
     * @param timeout Loading显示时间，为-1时会一只显示，需要手动关闭
     */
    static show (text = 'loading' + '...', timeout = defaultTimeOut) {
        console.log(timeout);
        lo.setState({ isShow: true, text: text, timeout: timeout });
    }

    static showEx (text = 'loading' + '...', timeout = defaultTimeOut, func) {
        console.log(timeout);
        lo.setState({ isShow: true, text: text, timeout: timeout });
        timeOutCallBack = func;
    }

    /**
     * 关闭Loading
     */
    static dismiss () {
        timeOutCallBack = '';
        lo.setState({ isShow: false });
    }

    static isShow () {
        return lo.state.isShow;
    }
}

export class Loading extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        textStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
    };

    constructor (props) {
        super(props);
        this.handle = 0;
        this.state = {
            isShow: false,
            timeout: defaultTimeOut,
            text: 'Loading' + '...',
        };
        lo = this;
    }

    componentWillUnmount () {
        clearTimeout(this.handle);
    }

    render () {
        clearTimeout(this.handle);

        this.state.timeout !== defaultTimeOut &&
        (this.handle = setTimeout(() => {
            if (typeof timeOutCallBack === 'function') {
                timeOutCallBack();
                timeOutCallBack = '';
            }
            EasyLoading.dismiss();
        }, this.state.timeout));

        return (
            <Modal
                isOpen={this.state.isShow}
                style={{ backgroundColor: '#0000000', flex: 1 }}
                backdrop={false}
                swipeToClose={false}
                animationDuration={0}
                startOpen={true}>
                <View style={styles.container}>
                    <View style={[styles.load_box, this.props.loadingStyle]}>
                        <ActivityIndicator
                            animating={true}
                            color={this.props.color || '#FFF'}
                            size={'large'}
                            style={styles.load_progress}
                        />
                        <Text style={[styles.load_text, this.props.textStyle]}>
                            {this.state.text}
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    load_box: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(0,0,0,.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    load_progress: {
        width: 50,
        height: 50,
    },
    //默认字体颜色
    load_text: {
        color: '#FFFFFF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});
