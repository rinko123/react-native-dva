/* eslint-disable prefer-destructuring,no-undef */
import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SwipeAction, List } from "antd-mobile-rn";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
import { createAction, NavigationActions, Storage } from "../utils";
import pxToDp from "../utils/pxToDp";

const Item = List.Item;
const Brief = Item.Brief;

/**
 *
 */
@connect(({ rinko }) => ({ rinko }))
class ZGroupList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: pxToDp(36),
          color: "rgb(255,255,255)"
        }}
      >
        分组管理
      </Text>
    ),
    headerRight: (
      <Text
        style={{ color: "#fff", marginRight: pxToDp(20) }}
        onPress={() => {
          debugger;
          return _this2.gotoZAddGroup()}}
      >
        添加分组
      </Text>
    )
  });

  componentWillMount() {
    // eslint-disable-next-line
      _this2 = this;
  }

  gotoZAddGroup = () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "ZAddGroup" }));
  };

  gotoZGroupDetail = group => () => {
    const { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "ZGroupDetail",
        params: { group }
      })
    );
  };

  // 第二个上移动 等于 第一个下移
  upGroup = index => () => {
    if (index === 0) {
      Toast.show("已经在最上了");
    } else {
      const { dispatch } = this.props;
      const oldGroups = this.props.rinko.groups;
      //将第1个替换成第2个
      oldGroups.splice(
        index - 1,
        1,
        ...oldGroups.splice(index, 1, oldGroups[index - 1]) //将第2个换成第1个，返回第2个
      );
      dispatch(
        createAction("rinko/updateState")({
          groups: oldGroups
        })
      );
    }
  };
  downGroup = index => () => {
    const { dispatch } = this.props;
    const oldGroups = this.props.rinko.groups;
    if (index === oldGroups.length - 1) {
      Toast.show("已经在最下了");
    } else {
      oldGroups.splice(
        index + 1,
        1,
        ...oldGroups.splice(index, 1, oldGroups[index + 1])
      );
      dispatch(
        createAction("rinko/updateState")({
          groups: oldGroups
        })
      );
    }
  };
  editGroup = (group, index) => () => {
    const { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "ZAddGroup",
        params: { group, index }
      })
    );
  };
  deleteGroup = index => () => {
    const { dispatch } = this.props;
    const oldGroups = this.props.rinko.groups;
    oldGroups.splice(index, 1);
    dispatch(
      createAction("rinko/updateState")({
        groups: oldGroups
      })
    );
  };

  render() {
    const { groups } = this.props.rinko;
    return (
      <ScrollView>
        <List>
          {groups.map((item, index) => (
            <SwipeAction
              key={item.id}
              style={{ backgroundColor: "gray" }}
              autoClose
              left={[
                {
                  text: "上移",
                  onPress: this.upGroup(index),
                  style: { backgroundColor: "#ddd", color: "white" }
                },
                {
                  text: "下移",
                  onPress: this.downGroup(index),
                  style: { backgroundColor: "#F4333C", color: "white" }
                }
              ]}
              right={[
                {
                  text: "编辑",
                  onPress: this.editGroup(item, index),
                  style: { backgroundColor: "#108ee9", color: "white" }
                },
                {
                  text: "删除",
                  onPress: this.deleteGroup(index),
                  style: { backgroundColor: "#F4333C", color: "white" }
                }
              ]}
              onOpen={() => console.log("global open")}
              onClose={() => console.log("global close")}
            >
              <Item
                extra={item.desc}
                arrow="horizontal"
                onClick={this.gotoZGroupDetail(item)}
              >
                {item.name}
              </Item>
            </SwipeAction>
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default ZGroupList;
