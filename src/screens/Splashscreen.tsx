import React, {useLayoutEffect} from 'react';

import {Body, Container, Text} from '@components';
import {useScreenProps} from '@hooks';

const Splashscreen = () => {
	const [navigation] = useScreenProps('Splashscreen');

	useLayoutEffect(() => {
		// RNSplashscreen.hide();
		setTimeout(() => {
			// navigation.reset({index: 1, routes: [{name: 'FormInput'}]});
		}, 2500);
	}, []);

	return (
		<Container>
			<Body itemsCenter justifyCenter>
				<Text>Splash</Text>
			</Body>
		</Container>
	);
};

export default Splashscreen;
