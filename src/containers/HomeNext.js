import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "../utils/dva";

class HomeNext extends Component {
  static navigationOptions = {
    title: "下一页"
  };

  render() {
    const { navigation } = this.props;
    const { name } = navigation.state.params;
    return (
      <View style={styles.wrapper}>
        <Text>{name}</Text>
        <Text>123456</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeNext;
