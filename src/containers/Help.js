import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle
} from "react-native";
import { Carousel, Button, Drawer, WhiteSpace } from "antd-mobile-rn";
import { connect } from "react-redux";
import pxToDp from "../utils/pxToDp";
import { YellowBox } from "react-native";

class Help extends Component {
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
        TestDrawer
      </Text>
    )
  };

  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log("horizontal change to", index);
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log("vertical change to", index);
  }

  render() {
    return (
      <Carousel>
          <View style={{alignItems:"center",backgroundColor:"rgb(244,245,248)"}}>

          <Image
            source={require(`../images/help1.png`)}
            style={{ height: "100%",width:"85%"}}
          />

        </View>
          <View style={{alignItems:"center",backgroundColor:"rgb(244,245,248)"}}>
          <Image
            source={require(`../images/help2.png`)}
            style={{ height: "100%",width:"85%"}}
          />
        </View>
          <View style={{alignItems:"center",backgroundColor:"rgb(244,245,248)"}}>
          <Image
            source={require(`../images/help3.png`)}
            style={{ height: "100%",width:"85%"}}
          />
        </View>
          <View style={{alignItems:"center",backgroundColor:"rgb(244,245,248)"}}>
          <Image
            source={require(`../images/help4.png`)}
            style={{ height: "100%",width:"85%"}}
          />
        </View>
      </Carousel>
    );
  }
}

const styles =
  StyleSheet.create <
  {
    wrapper: ViewStyle,
    containerHorizontal: ViewStyle,
    containerVertical: ViewStyle,
    text: TextStyle
  } >
  {
    wrapper: {
      backgroundColor: "#fff"
    },
    containerHorizontal: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 150
    },
    containerVertical: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 150
    },
    text: {
      color: "#fff",
      fontSize: 36
    }
  };

export default Help;
