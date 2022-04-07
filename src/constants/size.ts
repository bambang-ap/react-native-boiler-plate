import {Dimensions} from 'react-native';

import {isTablet} from 'react-native-device-info';
import getFlexibleStyled from 'react-native-styled-px2dp';

const {width} = Dimensions.get('screen');

const {px2dp} = getFlexibleStyled({
	designWidth: width * (isTablet() ? 0.5 : 1),
});

const sizeModifier = (size: number) => px2dp(size);

export const SIZES = {
	outline: sizeModifier(1),
	radius: sizeModifier(6),
	radiusRound: sizeModifier(50),
	miniPadding: sizeModifier(3),
	padding: sizeModifier(10),
	content: sizeModifier(16),
	contentLarge: sizeModifier(24),
	container: sizeModifier(32),
	box: sizeModifier(48),
	header: sizeModifier(64),
	pinSpacing: sizeModifier(80),
};

export enum TEXT_SIZES {
	t_headline_1 = sizeModifier(40),
	t_headline_2 = sizeModifier(28),
	t_headline_3 = sizeModifier(22),
	t_headline_4 = sizeModifier(18),
	t_headline_5 = sizeModifier(16),
	t_x_large = sizeModifier(48),
	t_body_1 = sizeModifier(20),
	t_body_2 = sizeModifier(18),
	t_body_3 = sizeModifier(16),
	t_body_4 = sizeModifier(14),
	t_caption_1 = sizeModifier(12),
	t_caption_2 = sizeModifier(10),
}
