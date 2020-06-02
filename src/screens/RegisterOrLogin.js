import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	TextInput,
} from "react-native";
import {
	FormLabel,
	FormInput,
	FormValidationMessage,
} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, db } from "../config";
import { Video } from 'expo-av';
import { loginUser, registerUser } from '../lib/LoginOrRegister';

const inputFields = [
	{
		placeholder: "Username",
		icon: "account",
		textType: "username",
	},
	{
		placeholder: "E-mail",
		icon: "email",
		textType: "email",
	},
	{
		placeholder: "Password",
		icon: "key",
		textType: "password",
	},
];

class RegisterOrLogin extends Component {
	state = {
		email: "",
		button: "Login",
		buttonOpposite: "Sign up",
		login: true,
	};

	componentDidMount() {
		const { navigation } = this.props;
		if(auth.currentUser == null){
			auth.signOut();
		} else {
			navigation.navigate('Home');
		}
		// auth
		// 	.signOut()
		// 	.then(() => {
		// 		alert("Logged out successfuly");
		// 	})
		// 	.catch((e) => {
		// 		alert(e.message);
		// 	});
	}

	handleChangeText = (state, text) => {
		this.setState({
			[state]: text,
		});
	};

	handleSubmit = async () => {
		const { username, email, password, login } = this.state;
		const { navigation } = this.props;
		if (login) {
			await loginUser(email.toLowerCase().trim(), password);
		} else {
			const userCreated = await registerUser(username.toLowerCase().trim(), email.toLowerCase().trim(), password);
			userCreated ? alert('Account created') : alert('There was an error');
		}
		auth.currentUser !== null && navigation.navigate("Home");
	};

	handleKeyDown = (e) => {
		if (e.nativeEvent.key == "Enter") {
			addItem(this.state.name);
			alert("Item saved successfully");
		}
	};

	handleSwitchAction = () => {
		const { login } = this.state;
		login
			? this.setState({
					button: "Sign up",
					buttonOpposite: "Login",
					login: false,
			  })
			: this.setState({
					button: "Login",
					buttonOpposite: "Sign up",
					login: true,
			  });
	};

	render() {
		const { button, buttonOpposite, login } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.containerChild}>
					{inputFields
						.filter((input) => (login ? input.icon !== "account" : true))
						.map((input, i) => (
							<View key={i} style={styles.fieldCon}>
								<MaterialCommunityIcons
									name={input.icon}
									color='#fff'
									size={26}
								/>
								<TextInput
									style={styles.input}
									onChangeText={(e) => this.handleChangeText(input.textType, e)}
									onKeyPress={this.handleKeyDown}
									placeholder={input.placeholder}
								/>
							</View>
						))}
					<View style={styles.buttonCon}>
						<TouchableOpacity
							activeOpacity={0.5}
							style={styles.button(login)}
							onPress={this.handleSubmit}
						>
							<Text style={{ fontSize: 20, color: "#fff" }}>{button}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={this.handleSwitchAction}
						>
							<Text
								style={{
									color: buttonOpposite == "Sign up" ? "#2089DC" : "#77CF70",
								}}
							>
								{buttonOpposite}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
        <Video
          source={null}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.videoBackground}
        />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
    justifyContent: "center",
    position: "relative",
		backgroundColor: '#bbb'
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
	containerChild: {
		width: "75%",
    alignItems: "center",
    position: 'relative',
    zIndex: 2,
	},
	fieldCon: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: '#fff',
		marginBottom: 30,
		width: "100%",
	},
	input: {
		marginLeft: 15,
    width: "80%",
    color: '#fff'
	},
	buttonCon: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		alignItems: "center",
	},
	button: (login) => ({
		height: 40,
		backgroundColor: login ? "#77CF70" : "#2089DC",
		width: "50%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		elevation: 15,
	}),
});

export default RegisterOrLogin;
