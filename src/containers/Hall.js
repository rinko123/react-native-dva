import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { scaleSize } from "../utils/ScreenUtil";
import { NavigationActions, createaction } from "../utils/index";

@connect(({ home }) => ({ home }))
class Hall extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../images/home-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.goNext = this.goNext.bind(this);
  }

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
    const { name } = this.props.home;
    return (
      <View style={styles.wrapper}>
        <Text onPress={this.goNext}>{name}</Text>
        <Text onPress={this.goNext}>1111</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: scaleSize(40),
    height: scaleSize(40)
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Hall;
