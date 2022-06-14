import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useRecoilValue} from 'recoil';

import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {RootStackParamList} from '@navigators';
import {atomAppReady, atomUser} from '@recoils/atom';
import LoginScreen from '@screens/UnAuth/Login';
import SplashScreen from '@screens/UnAuth/SplashScreen';

export type UnAuthStackParamList = {
	SplashScreen: undefined;
	Login: undefined;
};

const UnAuthStack = createStackNavigator<UnAuthStackParamList>();

const UnAuthNavigator = () => {
	const [navigation] = useScreenProps<RootStackParamList, 'UnAuth'>();

	const isAppReady = useRecoilValue(atomAppReady);
	const user = useRecoilValue(atomUser);

	useEffect(() => {
		if (user?.id) navigation.reset({index: 1, routes: [{name: 'Auth'}]});
	}, [user?.id]);

	return (
		<>
			<StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
			<UnAuthStack.Navigator
				screenOptions={{
					headerShown: false,
					headerTitleAlign: 'center',
					headerStyle: {
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 0,
					},
				}}>
				{!isAppReady && (
					<UnAuthStack.Screen name="SplashScreen" component={SplashScreen} />
				)}
				<UnAuthStack.Screen name="Login" component={LoginScreen} />
			</UnAuthStack.Navigator>
		</>
	);
};

export default UnAuthNavigator;
