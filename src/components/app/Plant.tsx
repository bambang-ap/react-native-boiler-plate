import React from 'react';

import {useRecoilValue} from 'recoil';

import {BoxSpace, Text, Select, Image, View} from '@components';
import {InputForm} from '@interfaces';
import {atomPlants} from '@recoils/atom';

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
			<Text>Tanaman</Text>
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
