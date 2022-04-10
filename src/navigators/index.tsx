import React from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {COLORS} from '@constants/colors';
import {InputForm} from '@interfaces';
import Calculated from '@screens/Calculated';
import FormInput from '@screens/FormInput';

export type RootStackParamList = {
	FormInput: undefined;
	Calculated: InputForm;
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
					name="FormInput"
					component={FormInput}
					options={{headerShown: false}}
				/>
				<RootStack.Screen
					name="Calculated"
					component={Calculated}
					options={{headerShown: false}}
				/>
			</RootStack.Navigator>
		</>
	);
};

export default RootNavigator;