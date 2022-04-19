import React from 'react';

import RNSlider from '@react-native-community/slider';

import {Section} from '@components';
import {COLORS} from '@constants/colors';

type SliderProps = {
	withoutValue?: boolean;
	title: string;
	step: number;
	value: number;
	fixed?: number;
	minMax: [number, number];
	onChange?: (value: number) => void;
};

export const Slider = (props: SliderProps) => {
	const {
		step,
		value,
		title,
		fixed,
		onChange,
		withoutValue,
		minMax: [min, max],
	} = props;

	const sectionProps = {title, value, fixed, withoutValue};

	return (
		<Section {...sectionProps}>
			<RNSlider
				step={step}
				value={value}
				minimumValue={min}
				maximumValue={max}
				minimumTrackTintColor={COLORS.TURQUOISE}
				maximumTrackTintColor={COLORS.TURQUOISE}
				thumbTintColor={COLORS.GREEN}
				onSlidingComplete={onChange}
				onValueChange={onChange}
			/>
		</Section>
	);
};
