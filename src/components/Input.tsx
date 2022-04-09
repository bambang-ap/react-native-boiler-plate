import React, {forwardRef} from 'react';
import {TextInput, StyleProp, ViewStyle, TextInputProps} from 'react-native';

import {
	BoxSpace,
	Text,
	TextVariant,
	View,
	ViewProps,
	Wrapper,
} from '@components';
import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {typographyStyle} from '@constants/typography';

export type InputProps = TextVariant &
	TextInputProps & {
		color?: COLORS;
		flx?: ViewProps['flx'];
		containerStyle?: StyleProp<ViewStyle>;
		containerProps?: Omit<ViewProps, 'flx' | 'style' | 'children'>;
		renderLeftAccessory?: () => JSX.Element;
		renderRightAccessory?: () => JSX.Element;
	};

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
	const {
		flx,
		style,
		variant,
		containerProps,
		containerStyle,
		color = COLORS.BLACK100,
		renderLeftAccessory: LAcc,
		renderRightAccessory: RAcc,
		...rest
	} = props;
	return (
		// @ts-ignore
		<Wrapper
			{...containerProps}
			flx={flx}
			itemsCenter
			backgroundColor={COLORS.WHITE}
			style={[
				{
					minHeight: SIZES.box,
					borderRadius: SIZES.radius,
					borderColor: COLORS.BLACK50,
					borderWidth: SIZES.outline,
					paddingHorizontal: SIZES.content,
				},
				containerStyle,
			]}>
			{LAcc && (
				<>
					<LAcc />
					<BoxSpace B />
				</>
			)}
			<View flx>
				<TextInput
					{...rest}
					ref={ref}
					style={[
						{
							color,
							padding: 0,
							includeFontPadding: false,
							...typographyStyle(variant),
						},
						style,
					]}
				/>
			</View>
			{RAcc && (
				<>
					<BoxSpace B />
					<RAcc />
				</>
			)}
		</Wrapper>
	);
});
