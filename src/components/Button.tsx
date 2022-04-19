import React, {forwardRef} from 'react';
import {TextStyle, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {Text, TextProps, ViewPropsAdditional} from '@components';
import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {TYPOGRAPHY} from '@constants/typography';
import {getFlexBox} from '@interfaces/flexBox.type';

export enum ButtonVariant {
	primary,
	secondary,
	success,
	danger,
	warning,
	info,
	light,
	dark,
}

export const buttonVariant = (index: ButtonVariant) => {
	const listStyles = [
		[COLORS.GREEN, COLORS.WHITE],
		[COLORS.BLACK50, COLORS.WHITE],
		[COLORS.TURQUOISE, COLORS.WHITE],
		[COLORS.PINK75, COLORS.BLACK100],
		[COLORS.YELLOW75, COLORS.BLACK100],
		[COLORS.TURQUOISE75, COLORS.BLACK100],
		[COLORS.BLACK20, COLORS.BLACK100],
		[COLORS.BLACK90, COLORS.WHITE],
	] as const;
	return listStyles[index ?? ButtonVariant.primary];
};

export type ButtonProps = ViewPropsAdditional &
	Omit<TouchableOpacityProps, 'children'> & {
		children: string | JSX.Element | JSX.Element[];
		variant?: ButtonVariant;
		variantText?: TYPOGRAPHY;
		textProps?: Omit<TextProps, 'style' | 'variant'>;
		textStyle?: TextStyle;
	};

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
	(props, ref) => {
		const {flexBoxStyleProps, restProps} = getFlexBox(props);
		const {
			style,
			variant,
			children,
			textProps,
			textStyle,
			variantText = TYPOGRAPHY.headline5,
			...rest
		} = restProps;

		const [backgroundColor, txtColor] = buttonVariant(variant);

		const child =
			typeof children === 'string' ? (
				// @ts-ignore
				<Text
					{...textProps}
					color={txtColor}
					style={textStyle}
					variant={variantText}>
					{children}
				</Text>
			) : (
				children
			);

		return (
			<TouchableOpacity
				{...rest}
				ref={ref}
				style={[
					{
						backgroundColor,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: SIZES.content,
						borderRadius: SIZES.radius,
						minHeight: SIZES.box,
					},
					flexBoxStyleProps,
					style,
				]}>
				{child}
			</TouchableOpacity>
		);
	},
);
