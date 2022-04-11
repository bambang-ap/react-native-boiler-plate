import React, {Fragment} from 'react';
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
	Input,
} from '@components';
import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';

type E = {key: keyof InputForm; placeholder: string} & (
	| {type: 'input-number'; value: number}
	| {type: 'radio'; items: string[]; value: string[]}
	| {type: 'slider'; min: number; max: number; value: number}
);

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
	});
	const y: E[] = [
		{
			type: 'input-number' as const,
			key: 'curahHujan',
			placeholder: 'Curah hujan',
			value: state.curahHujan,
		},
		{
			type: 'input-number' as const,
			key: 'suhu',
			placeholder: 'Suhu',
			value: state.suhu,
		},
		{
			type: 'input-number' as const,
			key: 'ketinggian',
			placeholder: 'Ketinggian',
			value: state.ketinggian,
		},
		{
			type: 'radio' as const,
			key: 'teksturTanah',
			items: ['debu', 'lempung', 'pasir'] as Tekstur[],
			value: state.teksturTanah,
			placeholder: 'Tekstur tanah',
		},
		{
			type: 'slider' as const,
			min: 0,
			max: 100,
			key: 'n',
			placeholder: 'Nitrogen %',
			value: state.n,
		},
		{
			type: 'slider' as const,
			min: 0,
			max: 1000,
			key: 'p',
			placeholder: 'Fosfor mg/kg',
			value: state.p,
		},
		{
			type: 'slider' as const,
			min: 0,
			max: 1000,
			key: 'k',
			placeholder: 'Kalium mg/kg',
			value: state.k,
		},
		{
			type: 'slider' as const,
			min: 0,
			max: 100,
			key: 'bahanOrganik',
			placeholder: 'BO %',
			value: state.bahanOrganik,
		},
		{
			type: 'slider' as const,
			min: 0,
			max: 100,
			key: 'cOrg',
			placeholder: 'C-Org %',
			value: state.cOrg,
		},
		{
			type: 'slider' as const,
			min: 0,
			max: 100,
			key: 'pH',
			placeholder: 'pH %',
			value: state.pH,
		},
	];
	return (
		<Container>
			<Body>
				<ScrollView>
					{y.mmap(({item}) => {
						const {key, value, placeholder} = item;
						const renderInput = item.type === 'input-number' && (
							<InputNumber value={item.value} placeholder={placeholder} />
						);
						const renderSlider = item.type === 'slider' && (
							<Slider
								step={1}
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
								<Wrapper>
									<Text>{placeholder}</Text>
									{item.type === 'slider' && <Text>{value}</Text>}
								</Wrapper>
								<BoxSpace />
								{renderInput}
								{renderSlider}
								{renderRadio}
								<BoxSpace B />
							</Fragment>
						);
					})}
					<BoxSpace D />
					<Button onPress={() => navigation.navigate('Calculated', state)}>
						Calculate
					</Button>
				</ScrollView>
			</Body>
		</Container>
	);
};

export default FormInput;
