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

buttons = [
	{
		title: "ABOUT",
		icon: "alert-outline",
	},
	{
		title: "WITHDRAW",
		icon: "bank",
	},
	{
		title: "SEE SLOTS",
		icon: "library-shelves",
	},
];

class NavigationButton extends Component {
	state = {
		selectedButton: 1,
  };
  
  handleNavigation = index => {
    const { onNavigate } = this.props;
    this.setState(prev => ({
      selectedButton: index,
      isActiveButton: !prev.isActiveButton
    }));
    onNavigate(index);
  };

	render() {
		const { selectedButton } = this.state;
		return (
			<View style={styles().container}>
				{buttons.map((button, i) => {
          const activeButton = selectedButton == i;
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.5}
              style={styles(activeButton ? 50 : false).button}
              onPress={() => this.handleNavigation(i)}
            >
              {activeButton && (
                <MaterialCommunityIcons
                  name={button.icon}
                  //color="black"
                  color="#fff"
                  size={20}
                />
              )}
              <Text style={{color: (activeButton ?'#fff' : 'black') }}>{button.title}</Text>
            </TouchableOpacity>
          )
        }
        )}
			</View>
		);
	}
}

const styles = buttonControl =>
	StyleSheet.create({
		container: {
			flexDirection: "row",
			justifyContent: "space-between",
      width: "100%",
      alignItems: 'center'
		},
		button: {
			alignItems: "center",
			justifyContent: "center",
			width: "28%",
			height: (buttonControl && 50) || 25,
			backgroundColor: "#bbb",
			borderRadius: 20,
			elevation: 5,
		},
	});

export default NavigationButton;
