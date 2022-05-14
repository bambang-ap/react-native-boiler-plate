import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AuthNavigator from './Auth';
import UnAuthNavigator from './UnAuth';

export type RootStackParamList = {
	UnAuth: undefined;
	Auth: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	return (
		<>
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
					name="UnAuth"
					component={UnAuthNavigator}
					options={{headerShown: false}}
				/>
				<RootStack.Screen
					name="Auth"
					component={AuthNavigator}
					options={{headerShown: false}}
				/>
			</RootStack.Navigator>
		</>
	);
};

export default RootNavigator;
