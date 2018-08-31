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
        onPress={() => _this3.gotoZAddGroup()}
      >
        添加分组
      </Text>
    )
  });

  componentWillMount() {
    // eslint-disable-next-line
    _this3 = this;
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
      oldGroups.splice(
        index - 1,
        1,
        ...oldGroups.splice(index, 1, oldGroups[index - 1])
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
  editGroup = (group,index) => () => {
    const { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "ZAddGroup",
        params: { group,index }
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
        <Text>{JSON.stringify(groups)}</Text>
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
              <List.Item
                extra={item.desc}
                arrow="horizontal"
                onClick={this.gotoZGroupDetail(item)}
              >
                {item.name}+{index}
              </List.Item>
            </SwipeAction>
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative"
  },
  outTabWrap: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    height: pxToDp(120),
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    flexDirection: "row"
  },
  outInTitle: {
    color: "rgb(54,177,255)",
    fontSize: pxToDp(28)
  },
  outIn: {
    flexDirection: "row",
    marginTop: pxToDp(20)
  },
  yen: {
    fontSize: pxToDp(68),
    marginRight: pxToDp(100),
    color: "rgb(51,51,51)"
  },
  outInDetail: {
    fontSize: pxToDp(32),
    color: "rgb(51,51,51)",
    marginRight: pxToDp(20)
  },
  contentInfo: {
    backgroundColor: "#fff",
    marginTop: pxToDp(20),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    height: pxToDp(126)
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  maskCard: {
    backgroundColor: "#fff"
  },
  maskHeader: {
    position: "relative",
    height: pxToDp(88),
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: pxToDp(1),
    borderBottomColor: "#dcdcdc"
  },
  maskTitle: {
    fontSize: pxToDp(36),
    color: "rgb(51,51,51)"
  },
  close: {
    position: "absolute",
    top: pxToDp(30),
    margin: "auto",
    left: pxToDp(28),
    height: pxToDp(28),
    width: pxToDp(28)
  },
  maskContent: {
    height: pxToDp(306)
    // margin: pxToDp(26),
    // justifyContent: 'space-between',
  },
  btnList: {
    marginTop: pxToDp(80),
    marginLeft: pxToDp(80),
    flexDirection: "row",
    flexWrap: "wrap"
  },
  listWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  btnContent: {
    width: pxToDp(132),
    height: pxToDp(66),
    marginRight: pxToDp(80)
  },
  lastContent: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: pxToDp(66)
  },
  detailTime: {
    fontSize: pxToDp(28),
    color: "rgb(102,102,102)",
    textAlign: "left"
  },
  detailType: {
    fontSize: pxToDp(36),
    color: "rgb(102,102,102)",
    textAlign: "left"
  },
  plusAmount: {
    fontSize: pxToDp(40),
    color: "rgb(41,132,255)",
    textAlign: "left"
  },
  minusAmount: {
    fontSize: pxToDp(40),
    color: "rgb(102,102,102)",
    textAlign: "left"
  },
  maskClick: {
    flex: 3
    // backgroundColor: 'rgba(0,0,0,.3)',
  }
});

export default ZGroupList;
