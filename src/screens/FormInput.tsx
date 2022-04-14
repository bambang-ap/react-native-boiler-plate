import React, {Fragment, ReactElement} from 'react';
import {ScrollView} from 'react-native';

import Slider from '@react-native-community/slider';
import {useStateObject} from 'global-methods/hooks';

import {Tekstur} from '@assets/data/plants';
import {
	Container,
	Body,
	Text,
	BoxSpace,
	InputNumber,
	Wrapper,
	ButtonVariant,
	Button,
	FlatList,
	FlatListProps,
} from '@components';
import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';

type RenderItemType = FlatListProps<InputFormTypes>['renderItem'];

const FormInput = () => {
	const [navigation] = useScreenProps('FormInput');

	const [state, setState] = useStateObject<InputForm>({
		curahHujan: 300,
		suhu: 30,
		ketinggian: 300,
		teksturTanah: ['lempung', 'debu'],
		n: 0.09,
		p: 10,
		k: 35,
		bahanOrganik: 2,
		cOrg: 1,
		pH: 7,
		kelembabanTanah: 0,
	});

	const inputs = inputForms(state);

	const RenderItem: RenderItemType = flatlistItem => {
		let renderOption: ReactElement = null;

		const {item} = flatlistItem;
		const {key, value, placeholder} = item;
		const isOption = item.type === 'option';

		const renderInput = item.type === 'input-number' && (
			<InputNumber value={item.value} placeholder={placeholder} />
		);

		if (isOption) {
			const {value: index, items} = item;
			renderOption = (
				<>
					<Wrapper>
						{items.mmap(({item: d, isLast}) => {
							return (
								<>
									<Button flx>{d.tabName}</Button>
									{!isLast && <BoxSpace B />}
								</>
							);
						})}
					</Wrapper>
					<BoxSpace B />
					<RenderItem {...flatlistItem} item={items[index]} />
				</>
			);
		}

		const renderSlider = item.type === 'slider' && (
			<Slider
				step={item.step}
				value={item.value}
				minimumValue={item.min}
				maximumValue={item.max}
				minimumTrackTintColor={COLORS.TURQUOISE}
				maximumTrackTintColor={COLORS.TURQUOISE}
				thumbTintColor={COLORS.PINK}
				onSlidingComplete={val => setState({[key]: val})}
				onValueChange={val => setState({[key]: val})}
			/>
		);

		const renderRadio = item.type === 'radio' && (
			<Wrapper>
				{item.items.mmap(({item: content, isLast}) => {
					const ef = state[key] as string[];
					const isSelected = ef.includes(content);
					const variant = isSelected
						? ButtonVariant.primary
						: ButtonVariant.light;
					const onPress = () => {
						const teksturTanah = isSelected
							? ef.filter(e => e !== content)
							: [...ef, content];
						setState({[key]: teksturTanah});
					};
					return (
						<React.Fragment key={content}>
							<Button flx onPress={onPress} variant={variant}>
								{content.ucwords()}
							</Button>
							{!isLast && <BoxSpace B />}
						</React.Fragment>
					);
				})}
			</Wrapper>
		);

		return (
			<Fragment key={key}>
				{!isOption && (
					<>
						<Wrapper>
							<Text>{placeholder}</Text>
							{item.type === 'slider' && <Text>{value}</Text>}
						</Wrapper>
						<BoxSpace />
					</>
				)}
				{renderInput}
				{renderSlider}
				{renderRadio}
				{renderOption}
				<BoxSpace B />
			</Fragment>
		);
	};

	return (
		<Container>
			<Body>
				<FlatList data={inputs} renderItem={RenderItem} />
				<BoxSpace D />
				<Button onPress={() => navigation.navigate('Calculated', state)}>
					Calculate
				</Button>
			</Body>
		</Container>
	);
};

export default FormInput;

type InputFormTypes = {key?: keyof InputForm; placeholder: string} & (
	| {type: 'input-number'; value: number}
	| {type: 'radio'; items: string[]; value: string[]}
	| {
			type: 'option';
			items: (InputFormTypes & {tabName: string})[];
			value: number;
	  }
	| {type: 'slider'; min: number; max: number; value: number; step: number}
);

const inputForms = (state: InputForm) => {
	const inputs: InputFormTypes[] = [
		{
			type: 'input-number',
			key: 'curahHujan',
			placeholder: 'Curah hujan',
			value: state.curahHujan,
		},
		{
			type: 'input-number',
			key: 'suhu',
			placeholder: 'Suhu',
			value: state.suhu,
		},
		{
			type: 'input-number',
			key: 'ketinggian',
			placeholder: 'Ketinggian',
			value: state.ketinggian,
		},
		{
			type: 'slider',
			key: 'kelembabanTanah',
			placeholder: 'Kelembaban Tanah',
			value: state.kelembabanTanah,
			min: 0,
			max: 100,
			step: 1,
		},
		{
			value: 0,
			type: 'option',
			placeholder: 'Tekstur tanah',
			items: [
				{
					tabName: 'Kualitatif',
					type: 'radio',
					key: 'teksturTanah',
					items: ['debu', 'lempung', 'pasir'] as Tekstur[],
					value: state.teksturTanah,
					placeholder: 'Tekstur tanah',
				},
				{
					tabName: 'Kuantitatif',
					type: 'radio',
					key: 'teksturTanah',
					items: ['debu', 'lempung', 'pasir'] as Tekstur[],
					value: state.teksturTanah,
					placeholder: 'Tekstur tanah',
				},
			],
		},
		{
			type: 'slider',
			min: 0,
			max: 5,
			key: 'n',
			placeholder: 'Nitrogen %',
			step: 0.1,
			value: state.n,
		},
		{
			type: 'slider',
			min: 0,
			max: 200,
			key: 'p',
			placeholder: 'Fosfor mg/kg',
			step: 1,
			value: state.p,
		},
		{
			type: 'slider',
			min: 0,
			max: 200,
			key: 'k',
			placeholder: 'Kalium mg/kg',
			step: 1,
			value: state.k,
		},
		{
			type: 'slider',
			min: 0,
			max: 50,
			key: 'bahanOrganik',
			placeholder: 'Bahan Organik (BO %)',
			step: 1,
			value: state.bahanOrganik,
		},
		{
			type: 'slider',
			min: 0,
			max: 50,
			key: 'cOrg',
			placeholder: 'C-Org %',
			step: 1,
			value: state.cOrg,
		},
		{
			type: 'slider',
			min: 0,
			max: 14,
			key: 'pH',
			placeholder: 'pH %',
			step: 0.1,
			value: state.pH,
		},
	];
	return inputs;
};
