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
import About from './About';
import Withdraw from './Withdraw';
import SeeSlots from './SeeSlots';
import BuySlot from '../components/Modals/BuySlot';
import { auth, db } from "../config";
import { getUserSlots } from '../lib/userSlots';

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			screens: [
				{
					component: key => <About key={key}/>,
					isActive: false
				},
				{
					component: key => <Withdraw key={key}/>,
					isActive: false
				},
				{
					component: key => <SeeSlots key={key}/>,
					isActive: false
				}
			],
			showBuySlot: false
		};
	}

	componentDidMount(){
		this.state.screens[1].isActive = true;
		this.forceUpdate();
		this.getSlots();
		console.log(auth.currentUser);
	}

	handleNavigation = index => {
		this.state.screens[index].isActive = true;
		this.state.screens.filter((screen, i) => i != index).forEach(screen => {
			screen.isActive = false;
		});
		this.forceUpdate();
	};

	handleBuySlot = () => {
		this.setState(prev => ({
			showBuySlot: !prev.showBuySlot
		}));
	};

	getSlots = async () => {
		const user = auth.currentUser;
		console.log(user);
		const userSlots = await getUserSlots(user);
		this.setState({
			slotCount: userSlots.length
		});
	};

	render() {
		const { screens, showBuySlot, slotCount } = this.state;
		return (
			<View style={styles.background}>
				<View style={styles.header}>
					<Header 
						user={auth.currentUser} 
						openBuySlot={this.handleBuySlot} 
						slotCount={slotCount} 
					/>
				</View>
				<View style={styles.screen}>
					{screens.map((screen, i) => screen.isActive && screen.component(i))}
					<BuySlot
						isOpen={showBuySlot}
						closeModal={this.handleBuySlot}
						afterBuySlot={this.getSlots}
					/>
				</View>
				<View style={styles.footer}>
					<NavigationButton onNavigate={i => this.handleNavigation(i)} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#fff",
		height: "100%",
		alignItems: "center",
	},
	header: {
		width: "100%",
		flex: 1,
		backgroundColor: "brown",
		position: "relative",
		flexDirection: "row",
		alignItems: "flex-end",
	},
	screen: {
		flex: 6,
		//borderWidth: 1,
		//borderColor: "black",
		width: "100%",
	},
	footer: {
		flex: 1,
		position: "absolute",
		bottom: 30,
		width: "80%",
	},
});
