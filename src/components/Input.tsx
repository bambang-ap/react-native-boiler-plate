import React, {forwardRef, useState} from 'react';
import {TextInput, StyleProp, ViewStyle, TextInputProps} from 'react-native';

import {BoxSpace, TextVariant, View, ViewProps, Wrapper} from '@components';
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

type InputNumberProps = Omit<
	InputProps,
	'value' | 'onChangeText' | 'keyboardType'
> & {
	value?: number;
	withDecimal?: boolean;
	onChangeText?: (value: number) => void;
};

export const InputNumber = forwardRef<TextInput, InputNumberProps>(
	(props, ref) => {
		const {value, withDecimal, onChangeText, ...rest} = props;
		const [val, setVal] = useState(value?.toString());
		const onChange = (txt: string) => {
			const [left, ...right] = txt.replace(/[^0-9\.]+/g, '').split('.');
			const formattedVal = !withDecimal
				? left
				: right.length > 0
				? [left, right.join('')].join('.')
				: left;
			const numFormattedVal = Number(formattedVal);
			onChangeText?.(Number.isNaN(numFormattedVal) ? 0 : numFormattedVal);
			setVal(formattedVal);
		};
		return (
			<Input
				ref={ref}
				value={val}
				onChangeText={onChange}
				keyboardType="number-pad"
				{...rest}
			/>
		);
	},
);
