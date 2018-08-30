import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { List } from "antd-mobile-rn";
import { connect } from "react-redux";
import { scaleSize } from "../utils/ScreenUtil";
import pxToDp from "../utils/pxToDp";
import { NavigationActions } from "../utils/index";

const { Item } = List;

class Myself extends Component {
  static navigationOptions = {
    headerTitle: (
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: scaleSize(36),
          color: "rgb(102,102,102)"
        }}
      >
        我的
      </Text>
    ),
    headerRight: <View />,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../images/mine-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  gotoWordGroup = () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "ZGroupList" }));
  };

  render() {
    return (
      <View style={styles.wrapper}>
        {/*<Image*/}
        {/*source={require("../image/mine.jpg")}*/}
        {/*style={{height:scaleSize(530),width:scaleSize(750)}}*/}
        {/*/>*/}
        <View
          style={{
            height: pxToDp(530),
            width: pxToDp(750),
            backgroundColor: "steelblue"
          }}
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
              たんごグループ
            </Item>
          </List>
        </View>
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
    flex: 1
  }
});

export default Myself;
