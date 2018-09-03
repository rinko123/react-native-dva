import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, List, Picker, InputItem } from "antd-mobile-rn";
import { createForm } from "rc-form";
import Toast from "react-native-root-toast";
import pxToDp from "../utils/pxToDp";
import { NavigationActions, createAction, Storage } from "../utils";
import { BottomSingleButton } from "../components/BottomSingleButton";
import { connect } from "../utils/dva";

/**
 *
 */
@createForm()
@connect(({ rinko }) => ({ rinko }))
class ZAddWord extends Component {
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
        添加单词
      </Text>
    ),
    headerRight: <View />
  };

  componentWillMount() {}

  // 添加单词
  handleAdd = () => {
    const {
      rinko: { words },
      form,
      dispatch
    } = this.props;
    const { params } = this.props.navigation.state;
    if (params && params.group && params.group.id) {
      form.validateFields((err, values) => {
        console.log({ err, values });
        if (!err) {
          const word = {
            groupId: params.group.id,
            word: values.word,
            alias: values.alias,
            tone: values.tone,
            mean: values.mean,
            id: new Date().getTime()
          };
          dispatch(
            createAction("rinko/updateState")({ words: [...words, word] })
          );
          const resetAction = NavigationActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({
                routeName: "HomeNavigator",
                action: NavigationActions.navigate({ routeName: "Myself" })
              }),
              NavigationActions.navigate({ routeName: "ZGroupList" }),
              NavigationActions.navigate({
                routeName: "ZGroupDetail",
                params: { group: params.group }
              })
            ]
          });
          dispatch(resetAction);
        }
      });
    } else {
      Toast.show("出现了一个bug！");
    }
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <View>
        <List>
          <InputItem
            {...getFieldProps("word", {
              rules: [
                {
                  required: true,
                  message: "请输入单词"
                }
              ]
            })}
            placeholder="请输入"
          >
            <Text style={styles.inputT}>单词</Text>
          </InputItem>
          <View style={styles.inputErrWrap}>
            <Text style={styles.inputErr}>
              {getFieldError("word") ? getFieldError("word").join(",") : ""}
            </Text>
          </View>

          <InputItem
            {...getFieldProps("alias", {
              rules: [
                {
                  required: true,
                  message: "请输入假名"
                }
              ]
            })}
            placeholder="请输入"
          >
            <Text style={styles.inputT}>假名</Text>
          </InputItem>
          <View style={styles.inputErrWrap}>
            <Text style={styles.inputErr}>
              {getFieldError("alias") ? getFieldError("alias").join(",") : ""}
            </Text>
          </View>

          <InputItem
            {...getFieldProps("tone", {
              rules: [
                {
                  required: true,
                  message: "请输入声调"
                }
              ]
            })}
            type="number"
            placeholder="请输入"
          >
            <Text style={styles.inputT}>声调</Text>
          </InputItem>
          <View style={styles.inputErrWrap}>
            <Text style={styles.inputErr}>
              {getFieldError("tone") ? getFieldError("tone").join(",") : ""}
            </Text>
          </View>

          <InputItem
            {...getFieldProps("mean", {
              rules: [
                {
                  required: true,
                  message: "请输入释义"
                }
              ]
            })}
            placeholder="请输入"
          >
            <Text style={styles.inputT}>释义</Text>
          </InputItem>
          <View style={styles.inputErrWrap}>
            <Text style={styles.inputErr}>
              {getFieldError("mean") ? getFieldError("mean").join(",") : ""}
            </Text>
          </View>

          <BottomSingleButton fun={this.handleAdd} text="添加" />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(244,245,248)"
  },
  lastbtn: {
    flexDirection: "row",
    justifyContent: "center"
  },
  inputErrWrap: {
    height: pxToDp(30),
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: pxToDp(26)
  },
  inputErr: {
    color: "rgb(255,106,110)",
    fontSize: pxToDp(24)
  },
  inputT: {
    fontSize: pxToDp(34),
    color: "rgb(51,51,51)"
  }
});

export default ZAddWord;
