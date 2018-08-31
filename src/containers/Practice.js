import React, { Component } from "react";
import { Text, View, Image, StyleSheet,ScrollView } from "react-native";
import {List,Button,Drawer,WhiteSpace } from "antd-mobile-rn"
import { connect } from "react-redux";
import pxToDp from "../utils/pxToDp";
import { YellowBox } from "react-native";

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
        source={require("../images/mine-tab.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };



    onOpenChange = (isOpen) => {
        /* tslint:disable: no-console */
        console.log('是否打开了 Drawer', isOpen.toString());
    }

    render() {
        const sidebar = (
            <View style ={{backgroundColor:'red'}}>
                <List>
                    <List.Item>qw</List.Item>
                    <List.Item>er</List.Item>
                    <List.Item>as</List.Item>
                </List>
            </View>
        );

        return (
            <Drawer
                sidebar={sidebar}
                position="right"
                open={false}
                drawerRef={(el) => (this.drawer = el)}
                onOpenChange={this.onOpenChange}
                drawerBackgroundColor="rgba(255,255,255,0)"
                drawerWidth={pxToDp(100)}
            >
                <View style={{ flex: 1, marginTop: 114, padding: 8 }}>
                    <Button onClick={() => this.drawer && this.drawer.openDrawer()}>
                        Open drawer
                    </Button>
                    <WhiteSpace />
                </View>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
  icon: {
    width: pxToDp(40),
    height: pxToDp(40)
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Practice;
