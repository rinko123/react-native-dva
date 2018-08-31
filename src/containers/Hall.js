import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Accordion, List, Drawer, Button } from "antd-mobile-rn";
import { connect } from "react-redux";
import { NavigationActions, createAction } from "../utils/index";
import pxToDp from "../utils/pxToDp";
import { Storage } from "../utils";

const Item = List.Item;
const Brief = Item.Brief;
const Panel = Accordion.Panel;

const toneData = [
  {
    tone: 0,
    string: "⓪"
  },
  {
    tone: 1,
    string: "①"
  },
  {
    tone: 2,
    string: "②"
  },
  {
    tone: 3,
    string: "③"
  },
  {
    tone: 4,
    string: ""
  },
  {
    tone: 5,
    string: "⑤"
  },
  {
    tone: 6,
    string: "⑥"
  },
  {
    tone: 7,
    string: "⑦"
  },
  {
    tone: 8,
    string: "⑧"
  },
  {
    tone: 9,
    string: "⑨"
  },
  {
    tone: 10,
    string: "⑩"
  }
];

@connect(({ rinko }) => ({ rinko }))
class Hall extends Component {
  static navigationOptions = {
    headerTitle: (
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: pxToDp(36),
          color: "rgb(102,102,102)"
        }}
      >
        首页
      </Text>
    ),
    headerRight: (
      <Text
        onPress={() => {
          _this.setState({ drawer: true });
        }}
      >
        ···
      </Text>
    ),
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../images/home-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  state = {
    drawer: false,
    close: false, // 第二次变化时更新drawer
    wordShow: true,
    aliasShow: true,
    toneShow: true,
    meanShow: true
  };

  componentWillMount() {
    _this = this;
    const { dispatch } = this.props;
    Storage.get("groups1").then(groups => {
      console.log(groups);
    });
    Storage.get("words1").then(groups => {
      console.log(groups);
    });
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
    if (tone === 0 || tone === alias.length) {
      return (
        <Text style={styles.blackT}>
          {alias.substr(0, 1)}
          <Text style={toneShow && styles.redT}>{alias.substr(1)}</Text>
          {toneShow && (
            <Text style={styles.toneT}>
              &nbsp; &nbsp;
              {toneData.find(it => it.tone === tone).string}
            </Text>
          )}
        </Text>
      );
    }
    if (tone === 1) {
      return (
        <Text style={styles.blackT}>
          <Text style={toneShow && styles.redT}>{alias.substr(0, 1)}</Text>
          {alias.substr(1)}
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
        {alias.substr(0, 1)}
        <Text style={toneShow && styles.redT}>{alias.substr(1, tone)}</Text>
        {alias.substr(tone)}
        {toneShow && (
          <Text style={styles.toneT}>
            &nbsp; &nbsp;
            {toneData.find(it => it.tone === tone).string}
          </Text>
        )}
      </Text>
    );
  };

  onOpenChange = () => {
    const { drawer, close } = this.state;
    console.log(drawer, close);
    if (close) {
      this.setState({
        close: false,
        drawer: false
      });
    } else {
      this.setState({
        close: true
      });
    }
  };

  render() {
    const { wordShow, aliasShow, toneShow, meanShow } = this.state;
    const { groups, words } = this.props.rinko;
    const groupWords = [...groups];
    groupWords.map(g => (g.words = words.filter(w => w.groupId === g.id)));

    const sidebar = (
      <View style={{ backgroundColor: "red" }}>
        <List>
          <List.Item>qw</List.Item>
          <List.Item>er</List.Item>
          <List.Item>as</List.Item>
        </List>
      </View>
    );
    return (
      <Drawer
        sidebar={sidebar}
        position="right"
        open={this.state.drawer}
        onOpenChange={this.onOpenChange}
        drawerBackgroundColor="rgba(255,255,255,0)"
        drawerWidth={pxToDp(100)}
      >
        <View style={styles.container}>
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
          <Accordion onChange={this.onChange} defaultActiveKey="2">
            {groupWords.map(group => (
              <Panel key={group.id} header={group.name}>
                <List>
                  {group.words.map(word => (
                    <Item
                      key={word.id}
                      multipleLine
                      extra={meanShow && word.mean}
                      style={{ height: pxToDp(120) }}
                    >
                      <Text onPress={() => console.log(word.word)}>
                        {wordShow && word.word}
                      </Text>
                      {aliasShow && (
                        <Brief style={{ width: pxToDp(400) }}>
                          {this.signTone(word.alias, word.tone)}
                        </Brief>
                      )}
                    </Item>
                  ))}
                </List>
              </Panel>
            ))}
          </Accordion>
        </View>
      </Drawer>
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
    // justifyContent: "center",
    // alignItems: "center"
  },
  popV: {
    flexDirection: "row"
  },
  popB: {
    flex: 1
  },
  popT: {
    fontSize: pxToDp(30),
    color: "blue"
  },
  blackT: {
    fontSize: pxToDp(36),
    color: "black"
  },
  redT: {
    fontSize: pxToDp(36),
    color: "red"
  },
  toneT: {
    marginLeft: pxToDp(50)
  }
});

export default Hall;
