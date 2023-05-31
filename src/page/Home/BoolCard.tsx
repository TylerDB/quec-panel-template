import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import { Switch } from 'react-native-elements';

interface Props {
  title: string;
  text: string;
  interactive: boolean,
  enabled: boolean;
  onPress: (enabled: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>; //自定义容器样式
  titleStyle?: StyleProp<ViewStyle>; // 自定义text样式
  textStyle?: StyleProp<ViewStyle>; // 自定义text样式
  switchStyle?: StyleProp<ViewStyle>; // 自定义switch样式
}

const BoolCard: React.FC<Props> = ({ title, text, interactive, enabled, onPress, containerStyle, titleStyle, textStyle, switchStyle }) => {
    const toggleSwitch = () => {onPress(enabled);};
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <View style={styles.switchContainer}>
                {
                    !interactive && (
                        <Text style={[styles.text, textStyle]}>{text}</Text>
                    )
                }
                {
                    interactive && (
                        <Switch
                            style={[styles.switch, switchStyle]}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={enabled}
                        />
                    )
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 16,
        flex: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0,
        marginEnd: 16,
    },
    text: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'right',
    },
    switch: {
    },
});

export default BoolCard;
