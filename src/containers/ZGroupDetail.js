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
class ZGroupDetail extends Component {
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
        {navigation.state.params &&
          navigation.state.params.group &&
          navigation.state.params.group.name}
      </Text>
    ),
    headerRight: (
      <Text
        style={{ color: "#fff", marginRight: pxToDp(20) }}
        onPress={() => _this3.gotoZAddWord()}
      >
        添加单词
      </Text>
    )
  });

  componentWillMount() {
    // eslint-disable-next-line
    _this3 = this;
  }

  componentWillUnmount() {}

  gotoZAddWord = () => {
    const { dispatch } = this.props;
    const { params } = this.props.navigation.state;
    if (params && params.group && params.group.id) {
      dispatch(
        NavigationActions.navigate({
          routeName: "ZAddWord",
          params: { group: params.group }
        })
      );
    } else {
      Toast.show("出现了一个bug！");
    }
  };

  deleteWord = id => () => {
    const {
      rinko: { words },
      dispatch
    } = this.props;
    dispatch(
      createAction("rinko/updateState")({
        words: words.filter(it => it.id !== id)
      })
    );
  };

  render() {
    const { params } = this.props.navigation.state;

    if (params && params.group && params.group.id) {
      const groupId = params.group.id;
      const words = this.props.rinko.words.filter(it => it.groupId === groupId);
      return (
        <ScrollView>
          <Text>{JSON.stringify(words)}</Text>
          <List>
            {words.map((item, index) => (
              <View key={item.id}>
                <SwipeAction
                  style={{ backgroundColor: "gray" }}
                  autoClose
                  right={[
                    {
                      text: "删除",
                      onPress: this.deleteWord(item.id),
                      style: { backgroundColor: "#F4333C", color: "white" }
                    }
                  ]}
                  onOpen={() => console.log("global open")}
                  onClose={() => console.log("global close")}
                >
                  <List.Item multipleLine extra={item.mean}>
                    {item.word}{" "}
                    <Brief>
                      {item.alias}&nbsp;&nbsp;
                      {item.tone}
                    </Brief>
                  </List.Item>
                </SwipeAction>
              </View>
            ))}
          </List>
        </ScrollView>
      );
    } else {
      return <Text>暂无数据</Text>;
    }
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

export default ZGroupDetail;
