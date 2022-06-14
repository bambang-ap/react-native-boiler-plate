import {StyleSheet} from 'react-native';

import {SIZES} from '@constants';

export const globalStyles = StyleSheet.create({
	roundPadding: {
		paddingHorizontal: SIZES.padding,
		paddingVertical: SIZES.miniPadding,
		borderRadius: SIZES.radius,
	},
});
