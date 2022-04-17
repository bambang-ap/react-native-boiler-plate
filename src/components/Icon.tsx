import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome5';

import {COLORS} from '@constants/colors';
import {TEXT_SIZES} from '@constants/sizes';

export type IconProps = {
	/**
	 * To get the name of icons, see here
	 * @link https://fontawesome.com/v5/search
	 */
	name: string;
	color?: COLORS;
	size?: TEXT_SIZES;
	disabled?: boolean;
	onPress?: () => void;
	activeOpacity?: number;
};

const Icon = (props: IconProps) => {
	const {
		name,
		onPress,
		disabled,
		size = TEXT_SIZES.t_body_1,
		color = COLORS.BLACK100,
		activeOpacity,
	} = props;

	const icon = <FAIcon name={name} color={color} size={size} />;

	return onPress ? (
		<TouchableOpacity
			disabled={disabled}
			activeOpacity={activeOpacity}
			onPress={onPress}>
			{icon}
		</TouchableOpacity>
	) : (
		icon
	);
};

export default Icon;
