import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { NavigationActions, createAction } from "../utils/index";
import pxToDp from "../utils/pxToDp";

@connect(({ home }) => ({ home }))
class Hall extends Component {
  static navigationOptions = {
      headerTitle: (
          <Text
              style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: pxToDp(36),
                  color: "rgb(102,102,102)"
              }}
          >
              发布
          </Text>
      ),
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../images/home-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  componentWillMount() {
    const { dispatch } = this.props;
    /**
     * 在组件中dispatch action
     * 一定要写namespace
     */
    dispatch({
      type: `home/fetchHomeName`
    });
  }

  goNext = () => {
    const { navigation } = this.props;
    /**
     * 页面跳转，传值
     */
    navigation.navigate("HomeNext", { name: "我是下一页" });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Text onPress={this.goNext}>1111</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(40),
    height: pxToDp(40)
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Hall;
