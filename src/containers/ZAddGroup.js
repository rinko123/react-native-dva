import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, List, Picker, InputItem } from "antd-mobile-rn";
import { createForm } from "rc-form";
import pxToDp from "../utils/pxToDp";
import { NavigationActions, createAction, Storage } from "../utils";
import { BottomSingleButton } from "../components/BottomSingleButton";
import { connect } from "../utils/dva";

/**
 *
 */
@createForm()
@connect(({ rinko }) => ({ rinko }))
class ZAddGroup extends Component {
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
        {(navigation.state.params && "编辑分组") || "添加分组"}
      </Text>
    ),
    headerRight: <View />
  });

  componentWillMount() {}

  handleAdd = () => {
    const { form, dispatch } = this.props;
    const oldGroups = this.props.rinko.groups;
    const { params } = this.props.navigation.state;
    form.validateFields((err, values) => {
      console.log({ err, values });
      if (!err) {
        const group = {
          name: values.name,
          desc: values.desc
        };

        if (typeof (params && params.index) === "number") {
          oldGroups.splice(params.index, 1, {
            ...group,id:params.group.id
          });
        } else {
          oldGroups.push({ ...group, id: new Date().getTime() });
        }
        dispatch(
          createAction("rinko/updateState")({
            groups: oldGroups
          })
        );
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({
              routeName: "HomeNavigator",
              action: NavigationActions.navigate({ routeName: "Myself" })
            }),
            NavigationActions.navigate({ routeName: "ZGroupList" })
          ]
        });
        dispatch(resetAction);
      }
    });
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { params } = this.props.navigation.state;
    return (
      <View>
        <List>
          <InputItem
            {...getFieldProps("name", {
              initialValue: params && params.group && params.group.name,
              rules: [
                {
                  required: true,
                  message: "请输入组名"
                }
              ]
            })}
            placeholder="请输入"
          >
            <Text style={styles.inputT}>组名</Text>
          </InputItem>
          <View style={styles.inputErrWrap}>
            <Text style={styles.inputErr}>
              {getFieldError("name") ? getFieldError("name").join(",") : ""}
            </Text>
          </View>

          <InputItem
            {...getFieldProps("desc", {
              initialValue: params && params.group && params.group.desc
            })}
            placeholder="请输入"
          >
            <Text style={styles.inputT}>描述</Text>
          </InputItem>

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

export default ZAddGroup;
