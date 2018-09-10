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
import { createAction, NavigationActions } from "../utils";
import pxToDp from "../utils/pxToDp";
import { toneData } from "../utils/data";

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

  state = {
    showSpell: false
  };

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

  editWord = (group, word) => () => {
    const { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "ZAddWord",
        params: { group, word }
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
          <List>
            {words.map((item, index) => (
              <View key={item.id}>
                <SwipeAction
                  style={{ backgroundColor: "gray" }}
                  autoClose
                  right={[
                    {
                      text: "编辑",
                      onPress: this.editWord(params.group, item),
                      style: { backgroundColor: "#108ee9", color: "white" }
                    },
                    {
                      text: "删除",
                      onPress: this.deleteWord(item.id),
                      style: { backgroundColor: "#F4333C", color: "white" }
                    }
                  ]}
                  onOpen={() => console.log("global open")}
                  onClose={() => console.log("global close")}
                >
                  <Item
                    multipleLine
                    extra={item.mean}
                    onClick={()=>this.setState({
                      showSpell: !this.state.showSpell
                    })}
                  >
                    {item.word}{" "}
                    <Brief>
                      {item.alias}
                      &nbsp;&nbsp;
                      {toneData.find(it => it.tone === item.tone).string}
                    </Brief>
                  </Item>
                  {this.state.showSpell && <Item>{item.spell}</Item>}
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

const styles = StyleSheet.create({});

export default ZGroupDetail;
