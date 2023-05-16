'use strict';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Platform, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../style';
import BaseMore from '../page/BaseMore';
import BaseRename from '../page/BaseRename';
import i18n from '../i18n/i18n';
import Demo from '../page/Demo';

const Stack = Platform.select({
    ios: () => createStackNavigator(),
    android: () => createNativeStackNavigator(),
})();

const _getHeaderLeft = (route) => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (route.navigation.canGoBack()) {
                    route.navigation.goBack();
                }
            }}>
            <Image
                source={require('../image/icon_navigator_back.png')}
                style={styles.backIconStyle}
            />
        </TouchableOpacity>
    );
};
export default function createAppContainer () {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Demo'
                detachInactiveScreens={false}
                screenOptions={(route) => ({
                    headerTranslucent: true,
                    headerShadowVisible: false,
                    screenOrientation: 'portrait',
                    headerBackTitleVisible: false,
                    headerTitleStyle: styles.headTitleStyle,
                    headerTitleAlign: 'center',
                    statusBarTranslucent: true,
                    headerLeft: () => _getHeaderLeft(route),
                })}>
                {/*Demo首页*/}
                <Stack.Screen
                    name={'Demo'}
                    component={Demo}
                    options={{
                        headerShown: true,
                        title: i18n('Demo'),
                    }}/>
                {/*设置页面*/}
                <Stack.Screen
                    name={'BaseMore'}
                    component={BaseMore}
                    options={{
                        headerShown: true,
                        title: i18n('setting'),
                    }}/>
                {/*重命名页面*/}
                <Stack.Screen
                    name={'BaseRename'}
                    component={BaseRename}
                    options={{
                        headerShown: true,
                        title: i18n('device_name'),
                    }}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}
