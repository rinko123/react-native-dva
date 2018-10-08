import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { List } from "antd-mobile-rn";
import { connect } from "react-redux";
import pxToDp from "../utils/pxToDp";
import { createAction, NavigationActions } from "../utils/index";
import { imageList } from "../utils/data";

const { Item } = List;

@connect(({ rinko }) => ({ rinko }))
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
  };

  gotoHelp = () => {
    const { dispatch, navigation } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "Help" }));
  };

  changeImage = id => () => {
    const { dispatch } = this.props;
    if (id < 6) {
      dispatch(
        createAction("rinko/updateState")({
          imgId: id + 1
        })
      );
    } else {
      dispatch(
        createAction("rinko/updateState")({
          imgId: 1
        })
      );
    }
  };

  render() {
    const { imgId } = this.props.rinko;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={{ backgroundColor: "rgb(0,0,0)" }}
          onPress={this.changeImage(imgId)}
          activeOpacity={1}
        >
          {imgId === 1 && (
            <Image
              source={require(`../images/phos.jpg`)}
              style={{ height: pxToDp(530), width: pxToDp(750) }}
            />
          )}
          {imgId === 2 && (
            <Image
              source={require(`../images/cinnabar.jpg`)}
              style={{ height: pxToDp(530), width: pxToDp(750) }}
            />
          )}
          {imgId === 3 && (
            <Image
              source={require(`../images/diamond.jpg`)}
              style={{ height: pxToDp(530), width: pxToDp(750) }}
            />
          )}
          {imgId === 4 && (
            <Image
              source={require(`../images/bort.jpg`)}
              style={{ height: pxToDp(530), width: pxToDp(750) }}
            />
          )}
          {imgId === 5 && (
            <Image
              source={require(`../images/amethyst.jpg`)}
              style={{ height: pxToDp(530), width: pxToDp(750) }}
            />
          )}
          {imgId === 6 && (
            <Image
              source={require(`../images/phos-cinnabar.jpg`)}
              style={{ height: pxToDp(530), width: pxToDp(750) }}
            />
          )}
        </TouchableOpacity>
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
              &nbsp;&nbsp;课程单词
            </Item>
            <Item
              onClick={this.gotoHelp}
              arrow="horizontal"
              thumb={
                <Image
                  style={styles.iconList}
                  source={require("../images/people.png")}
                />
              }
            >
              &nbsp;&nbsp;帮助
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
