import React, { Component, Fragment } from "react";
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
import NavigationButton from "../components/NavigationButtons/NavigationButton";
import { auth, db } from "../config";



class Header extends Component {
	render() {
		const { user, slotCount } = this.props;
			
		return (
			<Fragment>
				<View style={styles.title}>
					<Text style={styles.titleText}>
						SLOTS
					</Text>
				</View>
				<View style={styles.username}>
					<MaterialCommunityIcons name="account-circle" color="#bbb" size={26} />
					<Text style={{ fontSize: 20, color: "#bbb", marginLeft: 10 }}>
						{user.providerData[0].displayName}
					</Text>
				</View>
				<View style={styles.slotCount}>
					<Text style={{ fontSize: 24 }}>{slotCount}</Text>
				</View>
				<View style={styles.buySlotCon}>
					<TouchableOpacity activeOpacity={0.5} style={styles.buySlot} onPress={this.props.openBuySlot}>
						<Text>BUY SLOT</Text>
					</TouchableOpacity>
				</View>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    top: 30,
    left: "50%"
  },
  titleText: {
    fontSize: 30,
    position: "relative",
    left: "-50%"
  },
	username: {
		flex: 2,
		alignItems: "center",
		paddingBottom: 10,
		flexDirection: "row",
		justifyContent: "center",
		height: 40,
	},
	slotCount: {
		width: "30%",
		height: 50,
		borderTopRightRadius: 50,
		borderTopLeftRadius: 50,
		backgroundColor: "#fff",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	buySlotCon: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 10,
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

export default Header;
