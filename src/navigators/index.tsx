import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import AuthNavigator from './Auth';
import UnAuthNavigator from './UnAuth';

export type RootStackParamList = {
	UnAuth: undefined;
	Auth: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	useEffect(SplashScreen.hide, []);

	return (
		<RootStack.Navigator
			screenOptions={{
				headerShown: false,
				headerTitleAlign: 'center',
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0,
				},
			}}>
			<RootStack.Screen name="Auth" component={AuthNavigator} />
			<RootStack.Screen name="UnAuth" component={UnAuthNavigator} />
		</RootStack.Navigator>
	);
};

export default RootNavigator;
