import React from 'react';

import {useRecoilValue} from 'recoil';

import {BoxSpace, Text, Select, Image, View, Wrapper, Icon} from '@components';
import {InputForm} from '@interfaces';
import {atomPlants} from '@recoils/atom';
import {plantManager} from '@utils';

export const Plants = (props: {
	plant: InputForm['plant'];
	onChange: (plant: InputForm['plant']) => void;
}) => {
	const {plant, onChange} = props;

	const plants = useRecoilValue(atomPlants);

	const selectedIndex = plants.findIndex(
		({name}) => props.plant?.name === name,
	);

	return (
		<>
			<Wrapper>
				<Text flx>Tanaman</Text>
				<Icon name="plus" onPress={plantManager.open} />
				<BoxSpace B />
				<Icon name="sync" onPress={plantManager.move} />
			</Wrapper>
			<BoxSpace />
			<Select
				data={plants}
				value={plant?.name}
				placeholder="Pilih tanaman"
				renderItem={({name}) => name}
				selectedIndex={selectedIndex}
				onSelect={item => onChange(item)}
				inputProps={{
					renderAccessoryLeft: plant?.name
						? () => (
								<View width="8%">
									<Image source={{uri: plant?.image}} />
								</View>
						  )
						: undefined,
				}}
			/>
		</>
	);
};
