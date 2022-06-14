import {ViewProps as RNViewProps, TextProps as RNTextProps} from 'react-native';

import styled from 'styled-components/native';

import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {TYPOGRAPHY, typographyStyle} from '@constants/typography';
import {
	Flex,
	Size,
	FlexBox,
	Position,
	TextAlign,
	getFlexBox,
} from '@interfaces/flexBox.type';

export * from './Button';
export * from './FlatList';
export * from './Header';
export * from './Icon';
export * from './Image';
export * from './Input';
export * from './Section';
export * from './Slider';
export * from './Modal';
export * from './Spinner';
export * from './Select';

export type BgColor = {backgroundColor?: COLORS};
export type TextVariant = {variant?: TYPOGRAPHY};

export type TextProps = TextPropsAdditional & RNTextProps;
export type TextPropsAdditional = Omit<Flex, 'row' | 'col'> &
	Size &
	BgColor &
	TextAlign &
	Position &
	TextVariant & {color?: COLORS};

export const Text = styled.Text<TextPropsAdditional>(
	({backgroundColor, ...props}) => {
		const {flexBoxStyleProps, restProps} = getFlexBox(props);
		const {variant, color = COLORS.BLACK100} = restProps ?? {};
		return {
			...flexBoxStyleProps,
			...typographyStyle(variant),
			backgroundColor,
			color,
		};
	},
);

export type ViewPropsAdditional = FlexBox & BgColor;
export type ViewProps = ViewPropsAdditional & RNViewProps;

export const View = styled.View<ViewPropsAdditional>(
	({backgroundColor, ...props}) => {
		const {flexBoxStyleProps} = getFlexBox(props);
		return {
			...flexBoxStyleProps,
			backgroundColor,
		};
	},
);

export const Container = styled(View)({
	flex: 1,
	backgroundColor: COLORS.WHITE,
});

export const Body = styled(View)({
	flex: 1,
	paddingHorizontal: SIZES.content,
	backgroundColor: COLORS.WHITE,
});

export const Separator = styled(View)({
	padding: 1,
	backgroundColor: COLORS.BLACK20,
});

export const Wrapper = styled(View)({
	flexDirection: 'row',
	justifyContent: 'space-between',
});

type Boxes = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
type BoxSpaceProps = Partial<Record<Boxes, true>>;

export const BoxSpace = styled(View)<BoxSpaceProps>(props => {
	const {B, C, D, E, F, G} = props;
	const [size, backgroundColor] = B
		? [SIZES.content, COLORS.PINK]
		: C
		? [SIZES.contentLarge, COLORS.YELLOW]
		: D
		? [SIZES.container, COLORS.TURQUOISE]
		: E
		? [SIZES.box, COLORS.PINK75]
		: F
		? [SIZES.header, COLORS.YELLOW75]
		: G
		? [SIZES.pinSpacing, COLORS.TURQUOISE75]
		: [SIZES.padding, COLORS.BLACK100];

	return {
		/** comment backgroundColor to hide spaces */
		backgroundColor,
		width: size,
		height: size,
	};
});
