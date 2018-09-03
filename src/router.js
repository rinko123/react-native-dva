import React, { PureComponent } from "react";
import { BackHandler, Animated, Easing, AppState } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions
} from "react-navigation";
import {
  initializeListeners,
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";

import Hall from "./containers/Hall";
import Myself from "./containers/Myself";
import Practice from "./containers/Practice";
import ZGroupList from "./containers/ZGroupList";
import ZGroupDetail from "./containers/ZGroupDetail";
import ZAddGroup from "./containers/ZAddGroup";
import ZAddWord from "./containers/ZAddWord";
import {createAction, Storage} from "./utils";
import Toast from "react-native-root-toast";

const HomeNavigator = TabNavigator(
  {
    Hall: { screen: Hall },
    Practice: { screen: Practice },
    Myself: { screen: Myself }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: false,
    navigationOptions: {
      headerLeft: null
    }
  }
);

const MainNavigator = StackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    ZGroupList: { screen: ZGroupList },
    ZGroupDetail: { screen: ZGroupDetail },
    ZAddGroup: { screen: ZAddGroup },
    ZAddWord: { screen: ZAddWord }
  },
  {
    headerMode: "float",
    navigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        // backgroundColor: "#3087fc",
        backgroundColor: "rgb(8,27,33)",
        borderBottomWidth: 0
      },
      headerTintColor: "#fff"
    }
  }
);

const AppNavigator = SwitchNavigator(
  {
    // 以下不能后退页面 禁止返回
    Main: { screen: MainNavigator }
  },
  {
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentScreen(route);
  }
  return route.routeName;
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.router
);
const addListener = createReduxBoundAddListener("root");

@connect(({ rinko, router }) => ({ rinko, router }))
class Router extends PureComponent {
  componentWillMount() {
    const {dispatch} = this.props;
      Storage.get("groups").then(groups => {
          if (groups) {
              dispatch(
                  createAction("rinko/updateState")({
                      groups
                  })
              );
          }
      });
      Storage.get("words").then(words => {
          if (words) {
              dispatch(
                  createAction("rinko/updateState")({
                      words
                  })
              );
          }
      });
    BackHandler.addEventListener("hardwareBackPress", this.backHandle);
  }

  componentDidMount() {
    initializeListeners("root", this.props.router);
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandle);
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      Storage.set("groups", this.props.rinko.groups);
      Storage.set("words", this.props.rinko.words);
      console.log("更新完成 background");
    }
  };

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router);
    if (currentScreen !== "Hall") {
      this.props.dispatch(NavigationActions.back());
      return true;
    }
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }

    Storage.set("groups", this.props.rinko.groups);
    Storage.set("words", this.props.rinko.words);
    console.log("更新完成 exit");
    this.lastBackPressed = Date.now();
    Toast.show("再按一次退出应用");
    return true;
  };

  render() {
    const { dispatch, router } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: router,
      addListener
    });
    return <AppNavigator navigation={navigation} />;
  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state);
}

export default Router;
