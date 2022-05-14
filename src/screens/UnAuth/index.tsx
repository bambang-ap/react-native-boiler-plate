import React from 'react';

import {Button, Container, Input, Section, View} from '@components';
import {useScreenProps} from '@hooks';
import {RootStackParamList} from '@navigators';
import {UnAuthStackParamList} from '@navigators/UnAuth';

const LoginScreen = () => {
	const [navigation] = useScreenProps<
		UnAuthStackParamList & RootStackParamList
	>('SplashScreen');

	const doLogin = async () => {};

	return (
		<Container itemsCenter justifyCenter>
			<View width="50%">
				<Section title="Username">
					<Input />
				</Section>
				<Section title="Password">
					<Input />
				</Section>
				<Button>Login</Button>
			</View>
		</Container>
	);
};

export default LoginScreen;
