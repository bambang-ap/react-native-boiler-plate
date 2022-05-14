import React, {FC, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

const Spinner: FC = ({children}) => {
	const spinValue = new Animated.Value(0);

	const rotate = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	const spin = () => {
		spinValue.setValue(0);

		Animated.timing(spinValue, {
			toValue: 1,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => spin());
	};

	useEffect(spin, [children]);

	return (
		<Animated.View style={{transform: [{rotate}]}}>{children}</Animated.View>
	);
};

export default Spinner;
