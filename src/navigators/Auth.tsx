import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {fromRight} from 'react-navigation-transition-effect';
import {useRecoilValue} from 'recoil';

import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {RootStackParamList} from '@navigators';
import {atomUser} from '@recoils/atom';
import Cashier from '@screens/Auth/Cashier';
import Cashout from '@screens/Auth/Cashout';

export type AuthStackParamList = {
	Cashier: undefined;
	Cashout: undefined;
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
					...fromRight(),
				}}>
				<AuthStack.Screen name="Cashier" component={Cashier} />
				<AuthStack.Screen name="Cashout" component={Cashout} />
			</AuthStack.Navigator>
		</>
	);
};

export default AuthNavigator;
