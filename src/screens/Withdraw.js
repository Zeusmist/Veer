import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import NavigationButton from "../components/NavigationButtons/NavigationButton";

class Withdraw extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>$300</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})

export default Withdraw;