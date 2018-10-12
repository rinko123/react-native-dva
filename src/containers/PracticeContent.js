import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { List, InputItem, Button, Progress } from "antd-mobile-rn";
import { connect } from "react-redux";
import pxToDp from "../utils/pxToDp";
import { NavigationActions } from "../utils/index";
import { BottomSingleButton } from "../components/BottomSingleButton";
import { BottomButton } from "../components/BottomButton";
import { createForm } from "rc-form";
import { createAction } from "../utils";
import { getRandomArrayElements } from "../utils/myUtils";

const { Item } = List;

/**
 * 测试拼写、单词、假名、声调页面
 */
@createForm()
@connect(({ rinko }) => ({ rinko }))
class PracticeContent extends Component {
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
    index: 0,
    checkedTone: "0",
    errorShow: false,
    spellShow: false,
    wordShow: false,
    aliasShow: false
  };

  onAdd = () => {
    const { index } = this.state;
    const { setFieldsValue } = this.props.form;
    const count = this.state.randomWords.length;
    let p = index + 1;
    if (index + 1 >= count) {
      p = 0;
    }
    this.setState({
      index: p,
      checkedTone: "0",
      errorShow: false
    });
    setFieldsValue({ spell: "", word: "", alias: "" });
  };

  getRandomArrayElements = (arr, count) => {
    if (arr.length <= count) {
      return arr;
    }
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  };

  nextWord = () => {
    console.log(this.state.randomWords);
    const { form, dispatch } = this.props;
    const { randomWords, index, errorShow, checkedTone } = this.state;
    const word = randomWords[index];
    form.validateFields((err, values) => {
      console.log({ err, values });
      if (!err && word.tone === checkedTone) {
        this.onAdd();
      } else {
        this.setState({
          errorShow: true
        });
      }
    });
  };

  collectWord = (id, bo) => () => {
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

  selectTone = tone => () => {
    this.setState({
      checkedTone: tone
    });
  };

  gotoHall = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: "Practice" }));
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { randomWords, index, errorShow, checkedTone } = this.state;
    const word = randomWords[index];

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              marginTop: pxToDp(26),
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.gotoHall}
              style={{
                marginRight: pxToDp(26)
              }}
            >
              <Image
                style={{ width: pxToDp(40), height: pxToDp(40) }}
                source={require("../images/close.png")}
              />
            </TouchableOpacity>
            <Progress
              style={{ borderRadius: pxToDp(20) }}
              barStyle={{
                borderColor: "rgb(16,173,94)",
                borderBottomWidth: pxToDp(20),
                borderRadius: pxToDp(20)
              }}
              percent={((index + 1) / randomWords.length) * 100}
            />
            <Text
              style={{
                marginLeft: pxToDp(26),
                fontSize: pxToDp(40)
              }}
              onPress={this.onAdd}
            >
              {this.state.index + 1}/{randomWords.length}
            </Text>
          </View>
          <Text
            style={{
              color: "rgb(16,173,94)",
              fontSize: pxToDp(60),
              textAlign: "center",
              marginTop: pxToDp(50),
              marginBottom: pxToDp(50)
            }}
          >
            {word.mean}
          </Text>

          <Text
            style={
              errorShow && getFieldError("spell")
                ? styles.errorT
                : styles.fieldT
            }
            onPress={() => this.setState({ spellShow: !this.state.spellShow })}
          >
            拼写{" "}
            {this.state.spellShow && (
              <Text style={{ color: "rgb(16,173,94)" }}>{word.spell}</Text>
            )}
          </Text>
          <InputItem
            {...getFieldProps("spell", {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value !== word.spell) {
                      callback("罗马音拼写错误");
                    } else {
                      callback();
                    }
                  }
                }
              ]
            })}
            clear
            placeholder="请输入"
            type="text"
            style={[styles.inputItem]}
          />

          <Text
            style={
              errorShow && getFieldError("word") ? styles.errorT : styles.fieldT
            }
            onPress={() => this.setState({ wordShow: !this.state.wordShow })}
          >
            单词{" "}
            {this.state.wordShow && (
              <Text style={{ color: "rgb(16,173,94)" }}>{word.word}</Text>
            )}
          </Text>
          <InputItem
            {...getFieldProps("word", {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value !== word.word) {
                      callback("单词输入错误");
                    } else {
                      callback();
                    }
                  }
                }
              ]
            })}
            clear
            placeholder="请输入"
            type="text"
            style={[styles.inputItem]}
          />
          <View style={styles.input}>
            <Text
              style={
                errorShow && getFieldError("alias")
                  ? styles.errorT
                  : styles.fieldT
              }
              onPress={() =>
                this.setState({ aliasShow: !this.state.aliasShow })
              }
            >
              假名{" "}
              {this.state.aliasShow && (
                <Text style={{ color: "rgb(16,173,94)" }}>{word.alias}</Text>
              )}
            </Text>
            <InputItem
              {...getFieldProps("alias", {
                rules: [
                  {
                    validator: (rule, value, callback) => {
                      if (value !== word.alias) {
                        callback("假名输入错误");
                      } else {
                        callback();
                      }
                    }
                  }
                ]
              })}
              clear
              placeholder="请输入"
              type="text"
              style={[styles.inputItem]}
            />
          </View>
          <View style={styles.rateV}>
            <Text
              style={
                errorShow && word.tone !== checkedTone
                  ? styles.errorT
                  : styles.fieldT
              }
            >
              声调
            </Text>
            <View style={styles.rateBtnV}>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "0" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("0")}
              >
                <Text>0</Text>
              </Button>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "1" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("1")}
              >
                <Text>1</Text>
              </Button>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "2" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("2")}
              >
                <Text>2</Text>
              </Button>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "3" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("3")}
              >
                <Text>3</Text>
              </Button>
            </View>
            <View style={styles.rateBtnV}>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "4" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("4")}
              >
                <Text>4</Text>
              </Button>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "5" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("5")}
              >
                <Text>5</Text>
              </Button>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "6" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("6")}
              >
                <Text>6</Text>
              </Button>
              <Button
                style={[
                  styles.btnmode,
                  {
                    backgroundColor:
                      (checkedTone === "7" && "rgb(218,234,255)") || "white"
                  }
                ]}
                activeStyle={false}
                onClick={this.selectTone("7")}
              >
                <Text>7</Text>
              </Button>
            </View>
            {word.tone >= 6 && (
              <View style={styles.rateBtnV}>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (checkedTone === "8" && "rgb(218,234,255)") || "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectTone("8")}
                >
                  <Text>8</Text>
                </Button>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (checkedTone === "9" && "rgb(218,234,255)") || "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectTone("9")}
                >
                  <Text>9</Text>
                </Button>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (checkedTone === "10" && "rgb(218,234,255)") || "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectTone("10")}
                >
                  <Text>10</Text>
                </Button>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (checkedTone === "11" && "rgb(218,234,255)") || "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectTone("11")}
                >
                  <Text>11</Text>
                </Button>
              </View>
            )}

            <View style={styles.inputErrWrap}>
              <Text style={styles.inputErr}>
                {errorShow && getFieldError("tone")
                  ? getFieldError("tone").join(",")
                  : ""}
              </Text>
            </View>
          </View>
        </View>

        <BottomButton
          funs={[this.collectWord(word.id, word.familiar), this.nextWord]}
          texts={[word.familiar ? "收藏" : "取消收藏", "下一个"]}
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
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26)
  },
  inputErrWrap: {
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    height: pxToDp(30)
  },
  inputErr: {
    color: "rgb(255,106,110)",
    fontSize: pxToDp(24)
  },
  input: {
    justifyContent: "space-between"
    // backgroundColor: 'red',
    // paddingLeft: pxToDp(26),
    // height: pxToDp(88),
    // borderRadius: pxToDp(12),
    // marginTop: pxToDp(26),
  },
  inputItem: {
    backgroundColor: "#f5f5f5"
  },

  rateV: {
    flexDirection: "column",
    marginBottom: pxToDp(26)
  },
  rateBtnV: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: pxToDp(10)
  },
  btnmode: {
    // height: pxToDp(66),
    // width: pxToDp(220),
    flex: 1,
    marginRight: pxToDp(10),
    marginBottom: pxToDp(10)
  },
  fieldT: {
    fontSize: pxToDp(30),
    color: "rgb(0,0,0)",
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10)
  },
  errorT: {
    fontSize: pxToDp(40),
    color: "rgb(226,54,42)",
    marginTop: pxToDp(5),
    marginBottom: pxToDp(5)
  }
});

export default PracticeContent;
