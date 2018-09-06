import React, { Component } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { List, Button, Tag } from "antd-mobile-rn";
import { connect } from "react-redux";
import pxToDp from "../utils/pxToDp";
import { createAction, NavigationActions } from "../utils";
import Toast from "react-native-root-toast";

@connect(({ rinko }) => ({ rinko }))
class Practice extends Component {
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
        测试
      </Text>
    ),
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../images/mine-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  selectPracticeScope = isCourse => () => {
    const {
      rinko: { practiceOption },
      dispatch
    } = this.props;
    dispatch(
      createAction("rinko/updateState")({
        practiceOption: { ...practiceOption, isCourse, practiceGroups: [] }
      })
    );
  };
  selectPracticeGroups = groupId => () => {
    const {
      rinko: { practiceOption },
      dispatch
    } = this.props;
    let practiceGroups;
    if (practiceOption.practiceGroups.indexOf(groupId) !== -1) {
      practiceGroups = practiceOption.practiceGroups.filter(
        it => it !== groupId
      );
    } else {
      practiceGroups = [...practiceOption.practiceGroups, groupId];
    }
    dispatch(
      createAction("rinko/updateState")({
        practiceOption: {
          ...practiceOption,
          practiceGroups
        }
      })
    );
  };
  selectPracticeCount = practiceCount => () => {
    const {
      rinko: { practiceOption },
      dispatch
    } = this.props;
    dispatch(
      createAction("rinko/updateState")({
        practiceOption: { ...practiceOption, practiceCount }
      })
    );
  };

  selectPracticeType = testWord => () => {
    const {
      rinko: { practiceOption },
      dispatch
    } = this.props;
    dispatch(
      createAction("rinko/updateState")({
        practiceOption: { ...practiceOption, testWord }
      })
    );
  };

  resetDebtFilter = () => {
    const { dispatch } = this.props;
    dispatch(
      createAction("rinko/updateState")({
        practiceOption: {
          isCourse: true,
          practiceGroups: [],
          practiceCount: 10,
          testWord: true
        }
      })
    );
  };

  handleDebtFilter = () => {
    const {
      dispatch,
      rinko: { practiceOption }
    } = this.props;
    if (practiceOption.practiceGroups.length === 0) {
      Toast.show("请选择要抽查的组");
    } else if (practiceOption.testWord) {
      dispatch(NavigationActions.navigate({ routeName: "PracticeContent" }));
    } else {
      dispatch(NavigationActions.navigate({ routeName: "PracticeWrite" }));
    }
  };

  render() {
    const { practiceOption, words, groups } = this.props.rinko;
    //获得哪些组里有单词/有收藏的单词
    const courseGroups = groups.filter(it =>
      words.find(word => word.groupId === it.id)
    );
    const collectGroups = groups.filter(it =>
      words.find(word => word.groupId === it.id && word.familiar === false)
    );
    const practiceGroups = practiceOption.isCourse
      ? courseGroups
      : collectGroups;
    return (
      <View style={styles.container}>
        <View style={styles.topV}>
          <ScrollView style={styles.scrollV}>
            <View style={styles.rateV}>
              <Text style={styles.text}>测试范围</Text>
              <View style={styles.rateBtnV}>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (practiceOption.isCourse && "rgb(218,234,255)") ||
                        "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectPracticeScope(true)}
                >
                  <Text>课程</Text>
                </Button>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (!practiceOption.isCourse && "rgb(218,234,255)") ||
                        "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectPracticeScope(false)}
                >
                  <Text>收藏</Text>
                </Button>
              </View>
            </View>
            <View style={styles.rateV}>
              <Text style={styles.text}>选择抽查的组</Text>
              <View style={styles.rateBtnV}>
                {practiceGroups.map(g => (
                  <Button
                    style={[
                      styles.btnmode,
                      {
                        backgroundColor:
                          (practiceOption.practiceGroups.find(
                            it => it === g.id
                          ) &&
                            "rgb(218,234,255)") ||
                          "white"
                      }
                    ]}
                    activeStyle={false}
                    onClick={this.selectPracticeGroups(g.id)}
                    key={g.id}
                  >
                    <Text>{g.name}</Text>
                  </Button>
                ))}
              </View>
            </View>
            <View style={styles.rateV}>
              <Text style={styles.text}>选择抽查单词总数</Text>
              <View style={styles.rateBtnV}>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (practiceOption.practiceCount === 10 &&
                          "rgb(218,234,255)") ||
                        "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectPracticeCount(10)}
                >
                  <Text>10</Text>
                </Button>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (practiceOption.practiceCount === 20 &&
                          "rgb(218,234,255)") ||
                        "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectPracticeCount(20)}
                >
                  <Text>20</Text>
                </Button>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (practiceOption.practiceCount === 30 &&
                          "rgb(218,234,255)") ||
                        "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectPracticeCount(30)}
                >
                  <Text>30</Text>
                </Button>
              </View>
            </View>
            <View style={styles.rateV}>
              <Text style={styles.text}>选择抽查类型</Text>
              <View style={styles.rateBtnV}>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (practiceOption.testWord && "rgb(218,234,255)") ||
                        "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectPracticeType(true)}
                >
                  <Text>测试单词</Text>
                </Button>
                <Button
                  style={[
                    styles.btnmode,
                    {
                      backgroundColor:
                        (!practiceOption.testWord && "rgb(218,234,255)") ||
                        "white"
                    }
                  ]}
                  activeStyle={false}
                  onClick={this.selectPracticeType(false)}
                >
                  <Text>测试手写</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomV}>
          <Button
            style={[styles.bottomBtn, { borderRadius: 0 }]}
            onClick={this.resetDebtFilter}
          >
            <Text style={styles.resetT}>重置</Text>
          </Button>
          <Button
            style={[
              styles.bottomBtn,
              { backgroundColor: "rgb(135,211,207)", borderRadius: 0 }
            ]}
            onClick={this.handleDebtFilter}
          >
            <Text style={styles.confirmT}>确定</Text>
          </Button>
        </View>
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
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  topV: {
    flexGrow: 1
  },
  scrollV: {
    flex: 1,
    padding: pxToDp(26),
    paddingTop: pxToDp(30)
  },
  bottomV: {
    flexDirection: "row",
    alignItems: "flex-end"
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
  bottomBtn: {
    flex: 1
  },
  btnmode: {
    height: pxToDp(66),
    width: pxToDp(220),
    marginRight: pxToDp(10),
    marginBottom: pxToDp(10)
  },
  text: {
    fontSize: pxToDp(32),
    color: "rgb(51,51,51)"
  },
  resetT: {
    color: "rgb(170,170,170)"
  },
  confirmT: {
    color: "rgb(255,255,255)"
  }
});

export default Practice;
