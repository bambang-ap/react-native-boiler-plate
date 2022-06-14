import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useRecoilValue} from 'recoil';

import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {RootStackParamList} from '@navigators';
import {atomUser} from '@recoils/atom';
import Cashier from '@screens/Auth/Cashier';

export type AuthStackParamList = {
	Auth: undefined;
	Cashier: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
	const [navigation] = useScreenProps<RootStackParamList, 'Auth'>();

	const user = useRecoilValue(atomUser);

	useEffect(() => {
		// if (!user?.id) navigation.reset({index: 1, routes: [{name: 'UnAuth'}]});
	}, [user?.id]);

	return (
		<>
			<StatusBar backgroundColor={COLORS.GREEN} barStyle="light-content" />
			<AuthStack.Navigator
				screenOptions={{
					headerShown: false,
					headerTitleAlign: 'center',
					headerStyle: {
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 0,
					},
				}}>
				<AuthStack.Screen name="Auth" component={Auth} />
				<AuthStack.Screen name="Cashier" component={Cashier} />
			</AuthStack.Navigator>
		</>
	);
};

export default AuthNavigator;

const Auth = (): JSX.Element => {
	const [navigation] = useScreenProps<AuthStackParamList, 'Auth'>();

	useEffect(() => {
		navigation.reset({index: 1, routes: [{name: 'Cashier'}]});
	}, []);

	return null;
};
