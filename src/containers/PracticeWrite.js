import React, { Component } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { List, InputItem, Button, Progress } from "antd-mobile-rn";
import { connect } from "react-redux";
import pxToDp from "../utils/pxToDp";
import { NavigationActions } from "../utils/index";
import { BottomSingleButton } from "../components/BottomSingleButton";
import { createForm } from "rc-form";
import { createAction } from "../utils";
import { getRandomArrayElements } from "../utils/myUtils";
import Toast from "react-native-root-toast";
import { toneData } from "../utils/data";

const Item = List.Item;
const Brief = Item.Brief;

@createForm()
@connect(({ rinko }) => ({ rinko }))
class PracticeWrite extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    const { words, practiceOption } = this.props.rinko;
    let practiceWords;
    if (practiceOption.isCourse) {
      // 筛选课程词汇
      practiceWords = words.filter(
        it => practiceOption.practiceGroups.indexOf(it.groupId) !== -1
      );
    } else {
      // 筛选收藏词汇
      practiceWords = words.filter(
        it =>
          it.familiar === false &&
          practiceOption.practiceGroups.indexOf(it.groupId) !== -1
      );
    }
    this.setState({
      randomWords: getRandomArrayElements(
        practiceWords,
        practiceOption.practiceCount
      )
    });
    console.log(this.state.randomWords);
  }

  state = {
    randomWords: [],
    showAnswer: false
  };

  collectWord = (id, bo) => () => {
    if (bo) {
      Toast.show("收藏成功");
    } else {
      Toast.show("取消收藏成功");
    }
    this.state.randomWords.find(it => it.id === id).familiar = !bo;
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

  gotoHall = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Main" }));
  };

  showAnswer = () => {
    this.setState({
      showAnswer: true
    });
  };

  signTone = (alias, tone) => {
    if (tone === "0" || tone === alias.length) {
      return (
        <Text style={styles.blackT}>
          {alias.substr(0, 1)}
          <Text style={styles.redT}>{alias.substr(1)}</Text>
          {
            <Text style={styles.toneT}>
              &nbsp; &nbsp;
              {toneData.find(it => it.tone === tone).string}
            </Text>
          }
        </Text>
      );
    }
    if (tone === "1") {
      return (
        <Text style={styles.blackT}>
          <Text style={styles.redT}>{alias.substr(0, 1)}</Text>
          {alias.substr(1)}
          {
            <Text style={styles.toneT}>
              &nbsp; &nbsp; {toneData.find(it => it.tone === tone).string}
            </Text>
          }
        </Text>
      );
    }
    return (
      <Text style={styles.blackT}>
        {alias.substr(0, 1)}
        <Text style={styles.redT}>{alias.substr(1, tone)}</Text>
        {alias.substr(tone)}
        {
          <Text style={styles.toneT}>
            &nbsp; &nbsp;
            {toneData.find(it => it.tone === tone).string}
          </Text>
        }
      </Text>
    );
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { randomWords, showAnswer } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <List>
              {!showAnswer &&
                randomWords.map(word => (
                  <Text
                    key={word.id}
                    style={[
                      styles.fieldT,
                      { color: word.familiar ? "rgb(0,0,0)" : "rgb(207,51,39)" }
                    ]}
                    onPress={this.collectWord(word.id, word.familiar)}
                  >
                    {word.mean}
                  </Text>
                ))}
              {showAnswer &&
                randomWords.map(word => (
                  <Item
                    key={word.id}
                    multipleLine
                    extra={word.mean}
                    style={{ height: pxToDp(120) }}
                  >
                    <Text
                      style={{ fontSize: pxToDp(40), color: "rgb(8,27,33)" }}
                    >
                      {word.word}
                    </Text>

                    <Brief style={{ width: pxToDp(400) }}>
                      {this.signTone(word.alias, word.tone)}
                    </Brief>
                  </Item>
                ))}
            </List>
          </View>
        </ScrollView>
        <BottomSingleButton
          fun={showAnswer ? this.gotoHall : this.showAnswer}
          text="完成"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between"
  },
  content: {
    margin: pxToDp(26)
  },

  fieldT: {
    fontSize: pxToDp(40),
    marginTop: pxToDp(15),
    marginBottom: pxToDp(15)
  },
  errorT: {
    fontSize: pxToDp(40),
    color: "rgb(226,54,42)",
    marginTop: pxToDp(5),
    marginBottom: pxToDp(5)
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

export default PracticeWrite;
