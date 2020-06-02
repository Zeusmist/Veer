import React, { Component, Fragment } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import Modal from 'react-native-modalbox';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { db, auth } from "../../config";
import { createSlot, assignSlot } from "../../lib/slotActions";

class BuySlot extends Component {
  user = auth.currentUser;

  handleBuySlot = async () => {
    await createSlot(this.user);
    await assignSlot(this.user);
    this.props.afterBuySlot();
  }

  render(){
    return(
      <Modal isOpen={this.props.isOpen} animationType="slide" on>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.5} style={styles.buySlot} onPress={this.handleBuySlot}>
						<Text>BUY SLOT</Text>
					</TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
		alignItems: "center",
		flex: 1,
  },
  buySlot: {
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
		height: 30,
		backgroundColor: "#bbb",
		borderRadius: 20,
	},
});

export default BuySlot;