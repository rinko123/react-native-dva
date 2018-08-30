import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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
                    fontSize: pxToDp(36),
                    color: "rgb(102,102,102)"
                }}
            >
                发布
            </Text>
        ),
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
        width: pxToDp(40),
        height: pxToDp(40),
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Practice;