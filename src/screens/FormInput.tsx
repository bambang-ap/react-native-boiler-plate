import React from 'react';
import {ScrollView} from 'react-native';

import {useStateObject} from 'global-methods/hooks';

import {Tekstur} from '@assets/data/plants';
import {
	Container,
	Body,
	Text,
	BoxSpace,
	Input,
	Wrapper,
	ButtonVariant,
	Button,
} from '@components';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';

const FormInput = () => {
	const [navigation] = useScreenProps('FormInput');

	const [state, setState] = useStateObject<InputForm>({
		curahHujan: '0',
		suhu: '0',
		ketinggian: '0',
		teksturTanah: [],
		n: '0',
		p: '0',
		k: '0',
		bahanOrganik: '0',
		cOrg: '0',
		pH: '0',
	});

	return (
		<Container>
			<Body>
				<ScrollView>
					<Text>Curah hujan</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.curahHujan}
						placeholder="curahHujan"
						onChangeText={curahHujan => setState({curahHujan})}
					/>
					<BoxSpace B />
					<Text>Suhu</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.suhu}
						placeholder="suhu"
						onChangeText={suhu => setState({suhu})}
					/>
					<BoxSpace B />
					<Text>Ketinggian</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.ketinggian}
						placeholder="ketinggian"
						onChangeText={ketinggian => setState({ketinggian})}
					/>
					<BoxSpace B />
					<Text>Tekstur tanah</Text>
					<BoxSpace />
					<Wrapper>
						{(['debu', 'lempung', 'pasir'] as Tekstur[]).mmap(
							({item, isLast}) => {
								const isSelected = state.teksturTanah.includes(item);
								const variant = isSelected
									? ButtonVariant.primary
									: ButtonVariant.light;
								const onPress = () => {
									const teksturTanah = isSelected
										? state.teksturTanah.filter(e => e !== item)
										: [...state.teksturTanah, item];
									setState({teksturTanah});
								};
								return (
									<React.Fragment key={item}>
										<Button flx onPress={onPress} variant={variant}>
											{item}
										</Button>
										{!isLast && <BoxSpace B />}
									</React.Fragment>
								);
							},
						)}
					</Wrapper>
					<BoxSpace B />
					<Text>N %</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.n}
						placeholder="n"
						onChangeText={n => setState({n})}
					/>
					<BoxSpace B />
					<Text>P mg/kg</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.p}
						placeholder="p"
						onChangeText={p => setState({p})}
					/>
					<BoxSpace B />
					<Text>K mg/kg</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.k}
						placeholder="k"
						onChangeText={k => setState({k})}
					/>
					<BoxSpace B />
					<Text>Bahan Organik</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.bahanOrganik}
						placeholder="bahanOrganik"
						onChangeText={bahanOrganik => setState({bahanOrganik})}
					/>
					<BoxSpace B />
					<Text>C-Org</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.cOrg}
						placeholder="cOrg"
						onChangeText={cOrg => setState({cOrg})}
					/>
					<BoxSpace B />
					<Text>pH</Text>
					<BoxSpace />
					<Input
						keyboardType="number-pad"
						value={state.pH}
						placeholder="pH"
						onChangeText={pH => setState({pH})}
					/>
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
