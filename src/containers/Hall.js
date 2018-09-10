import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Accordion, List, Button, SwipeAction } from "antd-mobile-rn";
import { connect } from "react-redux";
import { NavigationActions, createAction } from "../utils/index";
import pxToDp from "../utils/pxToDp";
import { aoinData, toneData } from "../utils/data";
import {getSite} from "../utils/myUtils";

const Item = List.Item;
const Brief = Item.Brief;
const Panel = Accordion.Panel;

// todo 筛选改为气泡 Popover
@connect(({ rinko }) => ({ rinko }))
class Hall extends Component {
  static navigationOptions = {
    headerLeft: <View />,
    headerTitle: (
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: pxToDp(36),
          color: "rgb(255,255,255)"
        }}
      >
        首页
      </Text>
    ),
    headerRight: (
      <TouchableOpacity
        activeOpacity={1}
        style={{ backgroundColor: "#3087fc" }}
        onPress={() => {
          _this.setState({ popup: !_this.state.popup });
        }}
      >
        <Image source={require("../images/left-hand.png")} />
      </TouchableOpacity>
    ),
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../images/home-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  state = {
    popup: false,
    wordShow: true,
    aliasShow: true,
    toneShow: true,
    meanShow: true,
    bigWordShow: false,
    bigWord: "",
    collectShow: false // 只显示收藏
  };

  componentWillMount() {
    _this = this;
    const { dispatch } = this.props;
  }

  goNext = () => {
    const { navigation } = this.props;
    /**
     * 页面跳转，传值
     */
    navigation.navigate("HomeNext", { name: "我是下一页" });
  };

  onChange = key => {
    console.log(key);
  };

  signTone = (alias, tone) => {
    const { toneShow } = this.state;
    const aliasArr = getSite(alias);
    if (tone === "0" || tone === alias.length) {
      return (
        <Text style={styles.blackT}>
          {aliasArr[0]}
          <Text style={toneShow && styles.redT}>{aliasArr.slice(1).join('')}</Text>
          {toneShow && (
            <Text style={styles.toneT}>
              &nbsp; &nbsp;
              {toneData.find(it => it.tone === tone).string}
            </Text>
          )}
        </Text>
      );
    }
    if (tone === "1") {
      return (
        <Text style={styles.blackT}>
          <Text style={toneShow && styles.redT}>{aliasArr[0]}</Text>
            {aliasArr.slice(1).join('')}
          {toneShow && (
            <Text style={styles.toneT}>
              &nbsp; &nbsp; {toneData.find(it => it.tone === tone).string}
            </Text>
          )}
        </Text>
      );
    }
    return (
      <Text style={styles.blackT}>
          {aliasArr[0]}
        <Text style={toneShow && styles.redT}>{aliasArr.slice(1,tone).join('')}</Text>
        {aliasArr.slice(tone).join('')}
        {toneShow && (
          <Text style={styles.toneT}>
            &nbsp; &nbsp;
            {toneData.find(it => it.tone === tone).string}
          </Text>
        )}
      </Text>
    );
  };

  // 传入id 和当前状态
  collectWord = (id, bo) => () => {
    const {
      rinko: { words },
      dispatch
    } = this.props;
    words.find(it => it.id === id).familiar = !bo;
    dispatch(
      createAction("rinko/updateState")({
        words: words
      })
    );
  };

  render() {
    const { wordShow, aliasShow, toneShow, meanShow, collectShow } = this.state;
    const { groups, words } = this.props.rinko;
    let groupWords = [...groups];
    if (!collectShow) {
      groupWords.map(g => (g.words = words.filter(w => w.groupId === g.id)));
    } else {
      groupWords.map(
        g =>
          (g.words = words.filter(
            w => w.groupId === g.id && w.familiar === false
          ))
      );
      groupWords = groupWords.filter(it => it.words.length !== 0);
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Accordion onChange={this.onChange} defaultActiveKey="2">
            {groupWords.map(group => (
              <Panel key={group.id} header={`${group.name}  ${group.desc}`}>
                <List>
                  {group.words.map(word => (
                    <SwipeAction
                      key={word.id}
                      style={{ backgroundColor: "gray" }}
                      autoClose
                      right={[
                        {
                          text: word.familiar ? "收藏" : "取消收藏",
                          onPress: this.collectWord(word.id, word.familiar),
                          style: {
                            backgroundColor: word.familiar
                              ? "rgb(236,55,48)"
                              : "rgb(11,11,13)",
                            color: "white"
                          }
                        }
                      ]}
                      onOpen={() => console.log("global open")}
                      onClose={() => console.log("global close")}
                    >
                      <Item
                        key={word.id}
                        multipleLine
                        extra={
                          <Text
                            style={[
                              word.mean.length > 8
                                ? styles.greyT2
                                : styles.greyT
                            ]}
                          >
                            {meanShow && word.mean}
                          </Text>
                        }
                        // style={{ height: pxToDp(230) }}
                      >
                        <Text
                          style={{
                            fontSize: pxToDp(40),
                            color: word.familiar ? "rgb(8,27,33)" : "#00BFFF"
                          }}
                          onPress={() =>
                            this.setState({
                              bigWordShow: true,
                              bigWord: word.word
                            })
                          }
                        >
                          {wordShow && word.word}
                        </Text>
                        {aliasShow && (
                          <Brief style={{ width: pxToDp(400) }}>
                            {this.signTone(word.alias, word.tone)}
                          </Brief>
                        )}
                      </Item>
                    </SwipeAction>
                  ))}
                </List>
              </Panel>
            ))}
          </Accordion>
        </ScrollView>
        {this.state.popup ? (
          <View style={styles.mask}>
            <View style={styles.popV}>
              <Button
                style={styles.popB}
                onClick={() => this.setState({ wordShow: !wordShow })}
              >
                <Text style={styles.popT}>隐藏单词</Text>
              </Button>
              <Button
                style={styles.popB}
                onClick={() => this.setState({ aliasShow: !aliasShow })}
              >
                <Text style={styles.popT}>隐藏假名</Text>
              </Button>
              <Button
                style={styles.popB}
                onClick={() => this.setState({ toneShow: !toneShow })}
              >
                <Text style={styles.popT}>隐藏声调</Text>
              </Button>
              <Button
                style={styles.popB}
                onClick={() => this.setState({ meanShow: !meanShow })}
              >
                <Text style={styles.popT}>隐藏意思</Text>
              </Button>
            </View>
            <View style={styles.popV}>
              <TouchableOpacity
                style={{ flexGrow: 1 }}
                onPress={() => this.setState({ popup: false })}
              >
                <View />
              </TouchableOpacity>
              <Button
                style={{ width: "25%" }}
                onClick={() => this.setState({ collectShow: !collectShow })}
              >
                <Text style={styles.popT}>
                  {collectShow ? "显示全部" : "显示收藏"}
                </Text>
              </Button>
            </View>
            <TouchableOpacity
              style={styles.maskClick}
              activeOpacity={1}
              onPress={() => this.setState({ popup: false })}
            >
              <View />
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.bigWordShow ? (
          <View style={styles.mask}>
            <Text
              style={{
                backgroundColor: "#fff",
                fontSize: pxToDp(100),
                color: "rgb(16,173,94)",
                textAlign: "center",
                fontFamily: "ProW6",
                paddingTop: pxToDp(30),
                paddingBottom: pxToDp(30)
              }}
            >
              {this.state.bigWord}
            </Text>
            <TouchableOpacity
              style={styles.maskClick}
              onPress={() => this.setState({ bigWordShow: false })}
            >
              <View />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(40),
    height: pxToDp(40)
  },
  container: {
    flex: 1
  },

  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1
    // justifyContent: 'flex-end',
  },
  maskClick: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,.1)"
  },
  popV: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,.1)"
  },
  popB: {
    flex: 1
  },
  popT: {
    fontSize: pxToDp(28),
    color: "rgb(121,154,42)"
  },
  blackT: {
    lineHeight: pxToDp(50),
    fontSize: pxToDp(36),
    color: "black"
  },
  blackT2: {
    lineHeight: pxToDp(50),
    fontSize: pxToDp(24),
    color: "black"
  },
  greyT: {
    fontSize: pxToDp(36),
    color: "#8B8B83"
  },
  greyT2: {
    fontSize: pxToDp(24),
    color: "#8B8B83"
  },
  redT: {
    color: "red"
  },
  toneT: {
    marginLeft: pxToDp(50)
  }
});

export default Hall;
