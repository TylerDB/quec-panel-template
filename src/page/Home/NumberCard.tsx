import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, Text, Image, TouchableOpacity } from 'react-native';

const iconArrow = require('../../image/icon_menu_arrow.png');

interface Props {
  title: string;
  text: string;
  interactive: boolean,
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>; //自定义容器样式
  titleStyle?: StyleProp<ViewStyle>; // 自定义title样式
  textStyle?: StyleProp<ViewStyle>; // 自定义text样式
}

const NumberCard: React.FC<Props> = ({ title, text, interactive, onPress, containerStyle, titleStyle, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={() => {interactive && onPress();}}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <View style={styles.imgContainer}>
                <Text style={[styles.text, textStyle]}>{text}</Text>
                {
                    interactive && (
                        <Image style={styles.img} source={iconArrow}/>
                    )
                }
            </View>
        </TouchableOpacity>
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
    imgContainer: {
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
        marginEnd: 4,
    },
    img: {
        width: 22,
        height: 22,
    },
});

export default NumberCard;

