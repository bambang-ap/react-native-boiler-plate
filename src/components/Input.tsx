import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

import {BoxSpace, ViewProps, Wrapper} from '@components';
import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {TYPOGRAPHY, typographyStyle} from '@constants/typography';

export type InputProps = {
	error?: boolean;
	flex?: boolean;
	variant?: TYPOGRAPHY;
	containerProps?: Omit<ViewProps, 'style' | 'flex'>;
	containerStyle?: ViewProps['style'];
	renderAccessoryLeft?: () => JSX.Element;
	renderAccessoryRight?: () => JSX.Element;
} & TextInputProps;
type InputRef = React.ForwardedRef<TextInput>;

export const Input = React.forwardRef((props: InputProps, ref: InputRef) => {
	const {
		error,
		flex,
		style,
		variant = TYPOGRAPHY.body4,
		containerProps,
		containerStyle,
		renderAccessoryLeft,
		renderAccessoryRight,
		...rest
	} = props;

	const variantStyle = TYPOGRAPHY[variant] ?? {};

	const leftAcc = renderAccessoryLeft && (
		<>
			{renderAccessoryLeft?.()}
			<BoxSpace B />
		</>
	);

	const rightAcc = renderAccessoryRight && (
		<>
			<BoxSpace B />
			{renderAccessoryRight?.()}
		</>
	);

	return (
		// @ts-ignore
		<Wrapper
			flx={flex}
			itemsCenter
			style={[
				inputStyles.container,
				containerStyle,
				error ? {borderColor: COLORS.PINK} : {},
			]}
			{...containerProps}>
			{leftAcc}
			<TextInput
				ref={ref}
				style={[
					inputStyles.textInput,
					variantStyle,
					style,
					typographyStyle(variant),
				]}
				{...rest}
			/>
			{rightAcc}
		</Wrapper>
	);
});

export const inputStyles = StyleSheet.create({
	container: {
		minHeight: SIZES.box,
		borderRadius: SIZES.radius,
		overflow: 'hidden',
		paddingHorizontal: SIZES.content,
		backgroundColor: COLORS.BLACK12,
		borderWidth: SIZES.outline,
		borderColor: COLORS.BLACK20,
	},

	textInput: {
		padding: 0,
		flex: 1,
		color: COLORS.BLACK100,
	},
});

type InputNumberProps = Omit<
	InputProps,
	'value' | 'onChangeText' | 'keyboardType'
> & {
	value?: number;
	withDecimal?: boolean;
	onChangeText?: (value: number) => void;
};

export const InputNumber = React.forwardRef<TextInput, InputNumberProps>(
	(props, ref) => {
		const {value, withDecimal, onChangeText, ...rest} = props;
		const [val, setVal] = React.useState(value?.toString());
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
