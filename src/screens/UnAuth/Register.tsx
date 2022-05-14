import React from 'react';

import {useStateObject} from 'global-methods/hooks';

import {
	BoxSpace,
	Button,
	Container,
	Icon,
	Input,
	Section,
	Text,
	View,
	Wrapper,
} from '@components';
import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {User, UserRole} from '@interfaces';
import {RootStackParamList} from '@navigators';
import {UnAuthStackParamList} from '@navigators/UnAuth';
import ApiClient from '@utils/api';
import storage from '@utils/storage';

const RegisterScreen = () => {
	const [navigation] = useScreenProps<
		UnAuthStackParamList & RootStackParamList
	>('SplashScreen');
	const [state, setState] = useStateObject({
		loading: false,
		name: '',
		username: '',
		password: '',
		confirmPassword: '',
		image: '',
	});

	const {password, confirmPassword, username, image, name, loading} = state;

	const doRegister = async () => {
		if (password !== confirmPassword) return Alert('Password tidak sama');

		setState({loading: true});
		const params: Omit<User, 'id'> = {
			name,
			image,
			password,
			username,
			role: UserRole.User,
		};
		const response = await ApiClient.register(params);
		setState({loading: false});

		if (response?.updatedRange) navigation.goBack();
		else Alert('Gagal login, silahkan cek username atau password anda');
	};

	return (
		<Container itemsCenter justifyCenter>
			<View width="50%">
				<Section title="Nama">
					<Input value={name} onChangeText={name => setState({name})} />
				</Section>
				<Section title="Username">
					<Input
						value={username}
						onChangeText={username => setState({username})}
					/>
				</Section>
				<Section title="Password">
					<Input
						secureTextEntry
						value={password}
						onChangeText={password => setState({password})}
					/>
				</Section>
				<Section title="Ulangi Password">
					<Input
						secureTextEntry
						value={confirmPassword}
						onChangeText={confirmPassword => setState({confirmPassword})}
					/>
				</Section>
				<Wrapper>
					<Button onPress={() => navigation.goBack()}>
						<Icon color={COLORS.WHITE} name="chevron-left" />
					</Button>
					<BoxSpace />
					<Button loading={loading} flx onPress={doRegister}>
						Register
					</Button>
				</Wrapper>
			</View>
		</Container>
	);
};

export default RegisterScreen;
