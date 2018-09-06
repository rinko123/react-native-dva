import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "antd-mobile-rn";
import pxToDp from "../utils/pxToDp";

export const BottomButton = ({ funs, texts }) => (
  <View style={styles.buttonV}>
    <Button style={styles.lastBtn} onClick={funs[0]}>
      <Text style={styles.lastT}>{texts[0]}</Text>
    </Button>
    <Button style={styles.nextBtn} onClick={funs[1]}>
      <Text style={styles.nextT}>{texts[1]}</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  buttonV: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: pxToDp(26)
  },
  lastBtn: {
    borderWidth: pxToDp(3),
    borderColor: "rgb(16,173,94)",
    marginRight: pxToDp(26)
  },
  nextBtn: {
    flexGrow: 1,
    backgroundColor: "rgb(16,173,94)"
  },
  lastT: {
    color: "rgb(16,173,94)"
  },
  nextT: {
    color: "#fff"
  }
});

export default BottomButton;
