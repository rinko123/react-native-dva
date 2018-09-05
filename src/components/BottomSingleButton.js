import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "antd-mobile-rn";
import pxToDp from "../utils/pxToDp";

export const BottomSingleButton = ({ fun, text, styleB, styleT }) => (
  <View>
    <Button style={[styles.saveB, styleB]} onClick={fun}>
      <Text style={[styles.saveT, styleT]}>{text}</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  saveB: {
    backgroundColor: "rgb(16,173,94)",
    margin: pxToDp(20),
    flexGrow: 1
  },
  saveT: {
    color: "#fff",
    fontSize: pxToDp(36)
  }
});

export default BottomSingleButton;
