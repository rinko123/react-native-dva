import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { List } from "antd-mobile-rn";
import { connect } from "react-redux";
import pxToDp from "../utils/pxToDp";
import { NavigationActions } from "../utils/index";

const { Item } = List;

@connect()
class Myself extends Component {
  static navigationOptions = {
    headerTitle: (
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: pxToDp(36),
          color: "rgb(255,255,255)"
        }}
      >
        我的
      </Text>
    ),
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../images/mine-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  gotoWordGroup = () => {
    const { dispatch, navigation } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "ZGroupList" }));
    //   navigation.navigate("ZGroupList");
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          source={require("../images/mine.jpg")}
          style={{ height: pxToDp(530), width: pxToDp(750) }}
        />
        <View style={styles.contentList}>
          <List className="my-list">
            <Item
              onClick={this.gotoWordGroup}
              arrow="horizontal"
              thumb={
                <Image
                  style={styles.iconList}
                  source={require("../images/sets.png")}
                />
              }
            >
              课程单词
            </Item>
          </List>
        </View>
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
    flex: 1
  }
});

export default Myself;
