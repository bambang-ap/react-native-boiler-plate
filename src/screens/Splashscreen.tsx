import React, {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';

import RNSplashScreen from 'react-native-splash-screen';

import images from '@assets/images';
import {Body, BoxSpace, Container, Image, Text, View} from '@components';
import {appJson} from '@constants';
import {COLORS} from '@constants/colors';
import {TYPOGRAPHY} from '@constants/typography';
import {useScreenProps} from '@hooks';

const SplashScreen = () => {
	const [navigation] = useScreenProps('SplashScreen');

	useLayoutEffect(() => {
		RNSplashScreen.hide();
		setTimeout(() => {
			navigation.reset({index: 1, routes: [{name: 'FormInput'}]});
		}, 2500);
	}, []);

	return (
		<Container>
			<StatusBar backgroundColor={COLORS.GREEN} barStyle="light-content" />
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
