import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { connect } from "../utils/dva";
import { scaleSize } from "../utils/ScreenUtil";
import icon from "../assets/image/home.png";
import { FETCH_HOME_NAME } from "../constants/ActionTypes";
import pxToDp from "../utils/pxToDp"


class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image source={icon} style={[styles.icon, { tintColor: tintColor }]} />
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
      type: `home/${FETCH_HOME_NAME}`
    });
  }

  goNext() {
    const { navigation } = this.props;
    /**
     * 页面跳转，传值
     */
    navigation.navigate("HomeNext", { name: "我是下一页" });
  }

  render() {
    const { name } = this.props;
    return (
      <View style={styles.wrapper}>
        <Text onPress={this.goNext}>{name}</Text>
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

function mapStateToProps(state) {
  return {
    name: state.home.name // state 映射到 props
  };
}

export default connect(mapStateToProps)(Home);
