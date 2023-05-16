import {createNavigationContainerRef, StackActions} from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

/**
 * 替换当前页面
 * @param args
 */
export function replace(...args) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(...args));
    }
}

/**
 * 回到顶级
 * @param args
 */
export function popToTop() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.dispatch(StackActions.popToTop());
    }
}

/**
 * 回到上一级
 * @param number
 */
export function pop(number = 1) {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.dispatch(StackActions.pop(number));
    }
}

/**
 * 导航tab页面
 * @param routeName tab页根页面名称
 * @param tabName tab页面名称
 */
export function navigateTab(routeName, tabName) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(routeName, {screen: tabName});
    }
}


/**
 * 获取当前路由
 * @returns {Route<string>}
 */
export function getCurrentRoute() {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute();
    }
}
