import React, {useLayoutEffect} from 'react';

import {useSetRecoilState} from 'recoil';

import images from '@assets/images';
import {Body, BoxSpace, Container, Image, Text, View} from '@components';
import {appJson} from '@constants';
import {COLORS} from '@constants/colors';
import {TYPOGRAPHY} from '@constants/typography';
import {useScreenProps} from '@hooks';
import {RootStackParamList} from '@navigators';
import {UnAuthStackParamList} from '@navigators/UnAuth';
import {atomAppReady, atomUser} from '@recoils/atom';
import storage from '@utils/storage';

const SplashScreen = () => {
	const [navigation] = useScreenProps<
		RootStackParamList & UnAuthStackParamList,
		'SplashScreen'
	>();

	const setUser = useSetRecoilState(atomUser);
	const setIsAppReady = useSetRecoilState(atomAppReady);

	useLayoutEffect(() => {
		setTimeout(() => {
			const user = storage.getUser();
			navigation.reset({index: 1, routes: [{name: user ? 'Auth' : 'Login'}]});
			setUser(user);
			setIsAppReady(true);
		}, 2500);
	}, []);

	return (
		<Container>
			<Body backgroundColor={COLORS.GREEN} itemsCenter justifyCenter>
				<BoxSpace G />
				<BoxSpace D />
				<View width="65%">
					<Image source={images.splashScreen} />
				</View>
				<BoxSpace G />
				<BoxSpace G />
				<Text variant={TYPOGRAPHY.headline2} color={COLORS.WHITE}>
					{appJson.displayName}
				</Text>
				<BoxSpace B />
				<Text variant={TYPOGRAPHY.body1} color={COLORS.WHITE}>
					Melinda R.S Moata, PhD
				</Text>
			</Body>
		</Container>
	);
};

export default SplashScreen;
