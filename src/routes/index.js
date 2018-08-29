import { StackNavigator, TabNavigator } from "react-navigation";
import { connect } from "../utils/dva";
import React, { Component } from "react";
import { scaleSize } from "../utils/ScreenUtil";

import Home from "../pages/Home";
import Mine from "../pages/Mine";
import Practice from "../pages/Practice";

import Pages from "../config/routerConfig";

class Router extends Component {
  renderTabs() {
    return TabNavigator(
      {
        首页: {
          screen: Home,
          navigationOptions: {
            header: null
          }
        },
        练习: {
          screen: Practice
        },
        我的: {
          screen: Mine,
          navigationOptions: {
            header: null
          }
        }
      },
      {
        tabBarPosition: "bottom",
        animationEnabled: false,
        swipeEnabled: false,
        initialRouteName: "首页",
        backBehavior: "none",
        lazy: true, // 懒加载
        tabBarOptions: {
          activeTintColor: "#4396ec",
          inactiveTintColor: "#b2b2b2",
          showIcon: true,
          showLabel: false,
          pressColor: "#999",
          indicatorStyle: {
            height: 0
          },
          style: {
            height: scaleSize(88),
            backgroundColor: "#fff"
          },
          iconStyle: {
            width: scaleSize(40),
            height: scaleSize(40)
          },
          labelStyle: {
            marginTop: scaleSize(0),
            fontSize: scaleSize(20)
          }
        }
      }
    );
  }

  renderApp() {
    const Tabs = this.renderTabs();
    return StackNavigator(
      {
        App: { screen: Tabs },
        ...Pages
      },
      {
        navigationOptions: {
          gesturesEnabled: true,
          headerStyle: {
            // elevation: 0,
            height: scaleSize(98)
          },
          headerTitleStyle: {
            fontSize: scaleSize(36)
          }
        }
      }
    );
  }

  render() {
    const AppNavigator = this.renderApp();
    return <AppNavigator />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Router);
