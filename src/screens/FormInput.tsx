import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {Plants} from 'components/app';
import {useArray, useStateObject} from 'global-methods/hooks';

import {SoilTextureProps} from '@assets/data/plants';
import {
	Container,
	Body,
	BoxSpace,
	InputNumber,
	Button,
	Input,
	Section,
	Slider,
	Text,
	Wrapper,
	ButtonVariant,
	View,
} from '@components';
import {INPUT_FORM} from '@constants';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';

const FormInput = () => {
	const [navigation] = useScreenProps('FormInput');

	const [state, setState] = useStateObject<InputForm>(INPUT_FORM);

	return (
		<Container>
			<Body>
				<ScrollView>
					<Text>Tanaman</Text>
					<BoxSpace />
					<Plants onChange={plant => setState({plant})} plant={state.plant} />
					<BoxSpace />
					<Section title="Lokasi">
						<Input placeholder="Lokasi" />
					</Section>
					<Section title="Curah hujan">
						<InputNumber value={state.rainFall} placeholder="Curah hujan" />
					</Section>
					<Section title="Suhu">
						<InputNumber value={state.temperature} placeholder="Suhu" />
					</Section>
					<Section title="Ketinggian">
						<InputNumber value={state.height} placeholder="Ketinggian" />
					</Section>
					<SoilTexture onChange={value => setState(value)} />
					<Slider
						title="Kelembaban Tanah (%)"
						step={1}
						minMax={[0, 100]}
						value={state.soilMoisture}
						onChange={soilMoisture => setState({soilMoisture})}
					/>
					<Slider
						step={0.1}
						minMax={[0, 5]}
						value={state.n}
						title="Nitrogen (%)"
						onChange={n => setState({n})}
					/>
					<Slider
						title="Fosfor (mg/kg)"
						step={1}
						minMax={[0, 200]}
						value={state.p}
						onChange={p => setState({p})}
					/>
					<Slider
						title="Kalium (mg/kg)"
						step={1}
						minMax={[0, 200]}
						value={state.k}
						onChange={k => setState({k})}
					/>
					<Slider
						title="Bahan Organik (%)"
						step={1}
						minMax={[0, 200]}
						value={state.organic}
						onChange={organic => setState({organic})}
					/>
					<Slider
						title="C-Org (%)"
						step={1}
						minMax={[0, 50]}
						value={state.cOrg}
						onChange={cOrg => setState({cOrg})}
					/>
					<Slider
						title="pH"
						step={0.1}
						minMax={[0, 14]}
						value={state.pH}
						onChange={pH => setState({pH})}
					/>
				</ScrollView>
				<BoxSpace B />
				<Button onPress={() => navigation.navigate('Calculated', state)}>
					Hitung
				</Button>
			</Body>
		</Container>
	);
};

export default FormInput;

const SoilTexture = (props: {onChange: (value: SoilTextureProps) => void}) => {
	const [type, setType] = useState<InputForm['textureType']>('qualitative');
	const [quantitative, {replace}] = useArray([0, 0, 0]);
	const [qualitative, {replace: replaceQualitative}] = useArray([
		false,
		false,
		false,
		false,
	]);

	const [debu, pasir, liat] = quantitative;

	const toggleQualitative = (i: number) => {
		replaceQualitative(i, !qualitative[i]);
	};

	const qualitativeVariant = (i: number) => {
		const variant = qualitative[i]
			? ButtonVariant.primary
			: ButtonVariant.light;
		return variant;
	};

	const setQuantitative = (i: number, val: number) => {
		const prev = quantitative.slice(0, i);
		const next = quantitative.slice(i + 1);
		const prevVal = [...prev, ...next].reduce((a, b) => a + b, 0);
		if (val + prevVal < 100) replace(i, val);
		else replace(i, 100 - prevVal);
	};

	const renderQualitative = type === 'qualitative' && (
		<>
			<Button
				flx
				variant={qualitativeVariant(0)}
				onPress={() => toggleQualitative(0)}>
				Pasir
			</Button>
			<BoxSpace />
			<Button
				flx
				variant={qualitativeVariant(1)}
				onPress={() => toggleQualitative(1)}>
				Debu
			</Button>
			<BoxSpace />
			<Button
				flx
				variant={qualitativeVariant(2)}
				onPress={() => toggleQualitative(2)}>
				Liat
			</Button>
			<BoxSpace />
			<Button
				flx
				variant={qualitativeVariant(3)}
				onPress={() => toggleQualitative(3)}>
				Lempung
			</Button>
			<BoxSpace B />
		</>
	);

	const renderQuantitative = type === 'quantitative' && (
		<>
			<Slider
				step={0.1}
				title="Debu"
				value={debu}
				minMax={[0, 100]}
				onChange={value => setQuantitative(0, value)}
			/>
			<Slider
				step={0.1}
				title="Pasir"
				value={pasir}
				minMax={[0, 100]}
				onChange={value => setQuantitative(1, value)}
			/>
			<Slider
				step={0.1}
				title="Liat"
				value={liat}
				minMax={[0, 100]}
				onChange={value => setQuantitative(2, value)}
			/>
		</>
	);

	useEffect(() => {
		// @ts-ignore
		props.onChange({qualitative, quantitative, textureType: type});
	}, [type, qualitative, quantitative]);

	return (
		<>
			<Text>Tekstur tanah</Text>
			<BoxSpace />
			<Wrapper>
				<View>
					<Button
						variant={
							type === 'qualitative'
								? ButtonVariant.primary
								: ButtonVariant.light
						}
						onPress={() => setType('qualitative')}>
						Kualitatif
					</Button>
					<BoxSpace />
					<Button
						variant={
							type === 'quantitative'
								? ButtonVariant.primary
								: ButtonVariant.light
						}
						onPress={() => setType('quantitative')}>
						Kuantitatif
					</Button>
				</View>
				<BoxSpace B />
				<View flx>
					{renderQualitative}
					{renderQuantitative}
				</View>
			</Wrapper>
		</>
	);
};
