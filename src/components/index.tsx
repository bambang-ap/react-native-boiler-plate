import {
	FlexBox,
	getFlexBox,
	Flex,
	TextAlign,
	Position,
	Size,
} from '@type/flexBox.type';
import styled from 'styled-components/native';

import {COLORS} from '@constants/colors';
import {SIZES, TEXT_SIZES} from '@constants/size';

type BgColor = {backgroundColor?: COLORS};

type TextProps = TextAlign &
	Size &
	BgColor &
	Position &
	Omit<Flex, 'row' | 'col'>;

export const Text = styled.Text<TextProps>(({backgroundColor, ...props}) => {
	const {flexBoxStyleProps} = getFlexBox(props);
	const {textAlign, ...rest} = flexBoxStyleProps ?? {};
	return {
		...rest,
		backgroundColor,
		fontSize: TEXT_SIZES.t_body_3,
	};
});

type ViewProps = FlexBox & BgColor;

export const View = styled.View<ViewProps>(({backgroundColor, ...props}) => {
	const {flexBoxStyleProps} = getFlexBox(props);
	const {textAlign, ...rest} = flexBoxStyleProps ?? {};
	return {
		...rest,
		backgroundColor,
	};
});

export const Container = styled(View)({
	flex: 1,
	padding: 5,
});

export const Wrapper = styled(View)({
	flexDirection: 'row',
	justifyContent: 'space-between',
});

type BoxSpaceProps = Partial<
	Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G', true>
>;

export const BoxSpace = styled(View)<BoxSpaceProps>(props => {
	const {B, C, D, E, F, G} = props;
	const [size, backgroundColor] = B
		? [SIZES.content, COLORS.primary]
		: C
		? [SIZES.contentLarge, COLORS.danger]
		: D
		? [SIZES.container, COLORS.pink]
		: E
		? [SIZES.box, COLORS.info]
		: F
		? [SIZES.header, COLORS.lightBlue]
		: G
		? [SIZES.pinSpacing, COLORS.purple]
		: [SIZES.padding, COLORS.success];

	return {
		/** comment backgroundColor to hide spaces */
		backgroundColor,
		width: size,
		height: size,
	};
});

export const Button = styled.TouchableOpacity(() => {
	return {};
});

export const Input = styled.TextInput(() => {
	return {};
});
