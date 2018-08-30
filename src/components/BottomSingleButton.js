import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'antd-mobile-rn';
import pxToDp from '../utils/pxToDp';

export const BottomSingleButton = ({ fun, text, styleB, styleT }) => (
  <Button style={[styles.saveB, styleB]} onClick={fun}>
    <Text style={[styles.saveT, styleT]}>{text}</Text>
  </Button>
);

const styles = StyleSheet.create({
  saveB: {
    backgroundColor: '#ff8e2d',
    // borderRadius: pxToDp(30),
    margin: pxToDp(20),
    flexGrow: 1,
  },
  saveT: {
    color: '#fff',
    fontSize: pxToDp(36),
  },
});

export default BottomSingleButton;
