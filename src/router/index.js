'use strict';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../style';
import BaseRecord from '../page/BaseRecord';
import BaseMore from '../page/BaseMore';
import BaseRename from '../page/BaseRename';
import i18n from '../i18n/i18n';
import Home from '../page/Home';

const Stack = createNativeStackNavigator();

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
                initialRouteName="Home"
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
                {/*首页*/}
                <Stack.Screen
                    name={'Home'}
                    component={Home}
                    options={{
                        headerShown: true,
                        title: i18n('home'),
                    }}/>
                {/*告警页面*/}
                <Stack.Screen
                    name={'BaseRecord'}
                    component={BaseRecord}
                    options={{
                        headerShown: true,
                        title: i18n('record'),
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
