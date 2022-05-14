import React from 'react';

import {useStateObject} from 'global-methods/hooks';
import {useSetRecoilState} from 'recoil';

import {
	BoxSpace,
	Button,
	Container,
	Input,
	Section,
	Text,
	View,
} from '@components';
import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {RootStackParamList} from '@navigators';
import {UnAuthStackParamList} from '@navigators/UnAuth';
import {atomUser} from '@recoils/atom';
import ApiClient from '@utils/api';
import storage from '@utils/storage';

const LoginScreen = () => {
	const [navigation] = useScreenProps<
		UnAuthStackParamList & RootStackParamList
	>('SplashScreen');
	const [state, setState] = useStateObject({
		loading: false,
		username: '',
		password: '',
	});

	const setUser = useSetRecoilState(atomUser);

	const {password, username, loading} = state;

	const doLogin = async () => {
		setState({loading: true});
		const [status, user] = await ApiClient.login(username, password);
		setState({loading: false});

		if (status) {
			storage.setUser(user);
			setUser(user);
		} else {
			Alert('Gagal login, silahkan cek username atau password anda');
		}
	};

	return (
		<Container itemsCenter justifyCenter>
			<View width="50%">
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
				<Button loading={loading} onPress={doLogin}>
					Login
				</Button>
				<BoxSpace B />
				<Text alignCenter>
					{'Belum punya akun? silahkan registrasi '}
					<Text
						color={COLORS.GREEN}
						style={{textDecorationLine: 'underline'}}
						onPress={() => navigation.navigate('Register')}>
						disini
					</Text>
				</Text>
			</View>
		</Container>
	);
};

export default LoginScreen;
