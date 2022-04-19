import React from 'react';
import {ScrollView} from 'react-native';

import {Plants} from 'components/app';
import {useStateObject} from 'global-methods/hooks';

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
	Header,
} from '@components';
import {appJson, INPUT_FORM} from '@constants';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';

import SoilTexture from './SoilTexture';

const FormInput = () => {
	const [navigation] = useScreenProps('FormInput');

	const [state, setState] = useStateObject<InputForm>(INPUT_FORM);

	return (
		<Container>
			<Header
				renderAccessoryLeft={noop}
				textProps={{alignCenter: true}}
				title={appJson.displayName}
			/>
			<Body>
				<ScrollView>
					<Plants onChange={plant => setState({plant})} plant={state.plant} />
					<BoxSpace />
					<Section title="Lokasi">
						<Input
							placeholder="Lokasi"
							value={state.location}
							onChangeText={location => setState({location})}
						/>
					</Section>
					<Section title="Curah hujan">
						<InputNumber
							placeholder="Curah hujan"
							value={state.rainFall}
							onChangeText={rainFall => setState({rainFall})}
						/>
					</Section>
					<Section title="Suhu">
						<InputNumber
							placeholder="Suhu"
							value={state.temperature}
							onChangeText={temperature => setState({temperature})}
						/>
					</Section>
					<Section title="Ketinggian">
						<InputNumber
							placeholder="Ketinggian"
							value={state.height}
							onChangeText={height => setState({height})}
						/>
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
						fixed={1}
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
						minMax={[0, 50]}
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
						fixed={1}
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
