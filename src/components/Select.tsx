import * as React from 'react';
import {StyleSheet, TouchableOpacity, View as RNView} from 'react-native';

import {useToggle} from 'global-methods/hooks';

import {
	Button,
	Icon,
	Input,
	Modal,
	View,
	ViewProps,
	Separator,
	inputStyles,
	ButtonVariant,
	InputProps,
} from '@components';
import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {TYPOGRAPHY} from '@constants/typography';

type SelectOptionProps<D> = {
	data: D[];
	value?: string;
	placeholder?: string;
	renderItem: (item: D) => string;
	onSelect?: (value: D, index: number) => void;
	selectedIndex?: number;
	variant?: TYPOGRAPHY;
	inputProps?: Omit<
		InputProps,
		| 'value'
		| 'variant'
		| 'editable'
		| 'placeholder'
		| 'containerStyle'
		| 'renderAccessoryRight'
	>;
} & ViewProps;

type Measures = Record<
	'x' | 'y' | 'width' | 'height' | 'pageX' | 'pageY',
	number
>;

export const Select = <D,>(props: SelectOptionProps<D>) => {
	const {
		data,
		renderItem,
		placeholder,
		selectedIndex,
		onSelect,
		value,
		variant,
		inputProps,
		...rest
	} = props;

	const [visible, setVisible] = useToggle();
	const [index, setIndex] = React.useState<number>(selectedIndex);
	const [measureLayout, setMeasureLayout] = React.useState<Measures>(null);

	const [containerSelect = {}, containerSelectView = {}] = [
		visible && selectStyle.containerSelectBottom,
		visible && selectStyle.containerSelectViewBottom,
	];
	const inputRef = React.useRef<RNView>();
	const topVal = measureLayout?.pageY + measureLayout?.height;
	const top = Number.isNaN(topVal) ? 0 : topVal;
	const icon = visible ? 'chevron-up' : 'chevron-down';

	const onSelectCallback = (val: D, i: number) => {
		setIndex(i);
		setVisible(false);
		onSelect?.(val, i);
	};

	inputRef?.current?.measure((x, y, width, height, pageX, pageY) => {
		setMeasureLayout({x, y, width, height, pageX, pageY});
	});

	React.useEffect(() => {
		setIndex(selectedIndex);
	}, [selectedIndex]);

	return (
		<>
			<View
				// @ts-ignore
				ref={inputRef}
				style={[inputStyles.container, selectStyle.container, containerSelect]}
				{...rest}>
				<TouchableOpacity onPress={() => setVisible(true)}>
					<Input
						value={value}
						variant={variant}
						editable={false}
						placeholder={placeholder}
						containerStyle={selectStyle.inputContainer}
						renderAccessoryRight={() => <Icon name={icon} />}
						{...inputProps}
					/>
				</TouchableOpacity>
				{visible && <Separator />}
			</View>
			<Modal
				visible={visible}
				backdropOpacity={0}
				onBackdropClick={() => setVisible(false)}>
				<View
					absolute
					backgroundColor={COLORS.WHITE}
					width={measureLayout?.width}
					left={measureLayout?.pageX}
					top={top}
					style={[
						inputStyles.container,
						selectStyle.container,
						containerSelectView,
					]}>
					{data?.mmap(({item, isLast}, i) => {
						const isActive =
							i === index ? ButtonVariant.primary : ButtonVariant.light;
						return (
							<>
								<Button
									itemsCenter
									radius={0}
									key={JSON.stringify(item)}
									variant={isActive}
									onPress={() => onSelectCallback(item, i)}
									variantText={TYPOGRAPHY.body3}
									textProps={{alignLeft: true, vAlignCenter: true}}>
									{renderItem(item)}
								</Button>
								{!isLast && <Separator />}
							</>
						);
					})}
				</View>
			</Modal>
		</>
	);
};

export const selectStyle = StyleSheet.create({
	container: {paddingHorizontal: 0},
	containerSelectTop: {
		borderTopWidth: 0,
		borderTopEndRadius: 0,
		borderTopStartRadius: 0,
	},
	containerSelectViewTop: {
		borderBottomWidth: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	containerSelectBottom: {
		borderBottomWidth: 0,
		borderBottomEndRadius: 0,
		borderBottomStartRadius: 0,
	},
	containerSelectViewBottom: {
		borderTopWidth: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	inputContainer: {
		borderWidth: 0,
	},
	selectItems: {
		borderRadius: 0,
		paddingHorizontal: SIZES.content,
	},
});
