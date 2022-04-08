import React, {ForwardedRef, forwardRef} from 'react';
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
import {TYPOGRAPHY, typographyStyle} from '@constants/typography';

type InputRef = ForwardedRef<TextInput>;
export type InputCoreProps = {
	containerProps?: Omit<ViewProps, 'style' | 'children'>;
	containerStyle?: StyleProp<ViewStyle>;
	renderLeftAccessory?: () => JSX.Element;
	renderRightAccessory?: () => JSX.Element;
} & TextVariant &
	Omit<TextInputProps, ''>;

export type InputProps = {title?: string} & InputCoreProps;

const InputCore = forwardRef((props: InputCoreProps, ref: InputRef) => {
	const {
		style,
		containerProps,
		containerStyle,
		variant,
		renderLeftAccessory: LAcc,
		renderRightAccessory: RAcc,
		...rest
	} = props;
	return (
		// @ts-ignore
		<Wrapper
			{...containerProps}
			itemsCenter
			backgroundColor={COLORS.WHITE}
			style={[
				{
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
			<View
				style={{
					flex: 1,
					paddingVertical: SIZES.padding,
				}}>
				<TextInput
					{...rest}
					ref={ref}
					style={[
						{
							padding: 0,
							color: COLORS.BLACK100,
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

export const Input = forwardRef((props: InputProps, ref: InputRef) => {
	const {title, ...rest} = props;
	return (
		<View>
			{title && (
				<>
					<Text>{title}</Text>
					<BoxSpace />
				</>
			)}
			<InputCore ref={ref} {...rest} />
		</View>
	);
});
