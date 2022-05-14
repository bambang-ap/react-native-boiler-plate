import React from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {COLORS} from '@constants/colors';
import LoginScreen from '@screens/UnAuth';
import RegisterScreen from '@screens/UnAuth/Register';
import SplashScreen from '@screens/UnAuth/SplashScreen';

export type UnAuthStackParamList = {
	SplashScreen: undefined;
	Login: undefined;
	Register: undefined;
};

const UnAuthStack = createStackNavigator<UnAuthStackParamList>();

const UnAuthNavigator = () => {
	return (
		<>
			<StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
			<UnAuthStack.Navigator
				screenOptions={{
					headerStyle: {
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 0,
					},
					headerTitleAlign: 'center',
				}}>
				<UnAuthStack.Screen
					name="SplashScreen"
					component={SplashScreen}
					options={{headerShown: false}}
				/>
				<UnAuthStack.Screen
					name="Login"
					component={LoginScreen}
					options={{headerShown: false}}
				/>
				<UnAuthStack.Screen
					name="Register"
					component={RegisterScreen}
					options={{headerShown: false}}
				/>
			</UnAuthStack.Navigator>
		</>
	);
};

export default UnAuthNavigator;
