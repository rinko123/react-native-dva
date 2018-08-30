import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scaleSize } from '../utils/ScreenUtil';
import pxToDp from "../utils/pxToDp";
import {  YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);//忽略警告

class Practice extends Component {
    static navigationOptions = {
        headerTitle: (
            <Text
                style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: scaleSize(36),
                    color: "rgb(102,102,102)"
                }}
            >
                发布
            </Text>
        ),
        headerRight: <View />,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../images/mine-tab.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.wrapper}>
                <Text>练习</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: scaleSize(40),
        height: scaleSize(40),
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Practice;