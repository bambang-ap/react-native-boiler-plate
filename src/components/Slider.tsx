import React, {useEffect, useState} from 'react';

import RNSlider from '@react-native-community/slider';

import {Section} from '@components';
import {COLORS} from '@constants/colors';

type SliderProps = {
	withoutValue?: boolean;
	title: string;
	step: number;
	value: number;
	minMax: [number, number];
	onChange?: (value: number) => void;
};

export const Slider = (props: SliderProps) => {
	const [isSliding, setSliding] = useState(false);
	const [key, setKey] = useState(uuid());
	const {
		step,
		value,
		title,
		onChange,
		withoutValue,
		minMax: [min, max],
	} = props;
	useEffect(() => {
		if (!isSliding) setKey(uuid());
	}, [isSliding]);
	return (
		<Section title={title} value={value} withoutValue={withoutValue}>
			<RNSlider
				key={key}
				step={step}
				value={value}
				minimumValue={min}
				maximumValue={max}
				minimumTrackTintColor={COLORS.TURQUOISE}
				maximumTrackTintColor={COLORS.TURQUOISE}
				thumbTintColor={COLORS.PINK}
				onSlidingStart={() => setSliding(false)}
				onSlidingComplete={val => {
					setSliding(true);
					onChange?.(val);
				}}
				onValueChange={onChange}
			/>
		</Section>
	);
};
