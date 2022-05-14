import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useRecoilValue} from 'recoil';

import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';
import {RootStackParamList} from '@navigators';
import {atomUser} from '@recoils/atom';
import AddPlants from '@screens/AddPlants';
import Calculated from '@screens/Calculated';
import FormInput from '@screens/FormInput';

export type AuthStackParamList = {
	FormInput: undefined;
	Calculated: InputForm;
	AddPlants: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
	const [navigation] = useScreenProps<RootStackParamList>('Auth');

	const user = useRecoilValue(atomUser);

	useEffect(() => {
		if (!user?.id) navigation.reset({index: 1, routes: [{name: 'UnAuth'}]});
	}, [user?.id]);

	return (
		<>
			<StatusBar backgroundColor={COLORS.GREEN} barStyle="light-content" />
			<AuthStack.Navigator
				screenOptions={{
					headerStyle: {
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 0,
					},
					headerTitleAlign: 'center',
				}}>
				<AuthStack.Screen
					name="FormInput"
					component={FormInput}
					options={{headerShown: false}}
				/>
				<AuthStack.Screen
					name="Calculated"
					component={Calculated}
					options={{headerShown: false}}
				/>
				<AuthStack.Screen
					name="AddPlants"
					component={AddPlants}
					options={{headerShown: false}}
				/>
			</AuthStack.Navigator>
		</>
	);
};

export default AuthNavigator;
