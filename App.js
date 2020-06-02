import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import "react-native-gesture-handler";
import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./src/screens/Home";
import RegisterOrLogin from './src/screens/RegisterOrLogin';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Login"
				headerMode="screen"
			>
        <Stack.Screen name='Login' component={RegisterOrLogin} />
        <Stack.Screen name='Home' component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	) 
}

const styles = StyleSheet.create({
	screen: {
		width: "100%",
	},
	appBar: {
		backgroundColor: "blue",
		alignItems: "center",
		justifyContent: "center",
		height: 70,
	},
	appBarText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
