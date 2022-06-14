import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AuthNavigator from './Auth';
import UnAuthNavigator from './UnAuth';

export type RootStackParamList = {
	UnAuth: undefined;
	Auth: {y: string};
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	return (
		<>
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
				<RootStack.Screen name="UnAuth" component={UnAuthNavigator} />
				<RootStack.Screen name="Auth" component={AuthNavigator} />
			</RootStack.Navigator>
		</>
	);
};

export default RootNavigator;
