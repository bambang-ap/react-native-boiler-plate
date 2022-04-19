import * as React from 'react';
import {StyleSheet} from 'react-native';

import {BoxSpace, Wrapper, Text, TextProps, IconProps} from '@components';
import {COLORS} from '@constants/colors';
import {SIZES, TEXT_SIZES} from '@constants/sizes';
import {TYPOGRAPHY} from '@constants/typography';

import Icon from './Icon';

type Props = {
	title?: string;
	textProps?: TextProps;
	onPressLeft?: () => void;
	renderAccessoryLeft?: () => JSX.Element;
	renderAccessoryRight?: () => JSX.Element;
};
export const Header: React.FC<Props> = props => {
	const {
		title,
		children,
		textProps,
		onPressLeft,
		renderAccessoryLeft: LAcc,
		renderAccessoryRight: RAcc = noop,
	} = props;
	return (
		<Wrapper style={styles.container} itemsCenter>
			{LAcc ? (
				<LAcc />
			) : (
				<IconHeader
					color={COLORS.WHITE}
					onPress={onPressLeft}
					name="chevron-left"
				/>
			)}
			<BoxSpace B />
			{children || (
				<TextHeader color={COLORS.WHITE} flx {...textProps}>
					{title?.toUpperCase()}
				</TextHeader>
			)}
			<BoxSpace B />
			<RAcc />
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		minHeight: '8%',
		maxHeight: '8%',
		paddingHorizontal: SIZES.content,
		backgroundColor: COLORS.GREEN,
		borderBottomColor: COLORS.BLACK50,
		borderBottomWidth: SIZES.outline,
	},
	sideContent: {
		minWidth: SIZES.box,
	},
});

export const TextHeader = (props: TextProps) => {
	// @ts-ignore
	return <Text {...props} variant={TYPOGRAPHY.headline3} />;
};

export const IconHeader = (props: Omit<IconProps, 'size'>) => {
	return <Icon size={TEXT_SIZES.t_headline_3} {...props} />;
};
