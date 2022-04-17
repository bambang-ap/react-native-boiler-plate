import React from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {COLORS} from '@constants/colors';

export type RootStackParamList = {
	App: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	return (
		<>
			<StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
			<RootStack.Navigator
				screenOptions={{
					headerStyle: {
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 0,
					},
					headerTitleAlign: 'center',
				}}>
				<RootStack.Screen
					name="App"
					component={noop}
					options={{headerShown: false}}
				/>
			</RootStack.Navigator>
		</>
	);
};

export default RootNavigator;
