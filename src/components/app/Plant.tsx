import React from 'react';

import plants from '@assets/data/plants';
import {BoxSpace, Text, Select} from '@components';
import {InputForm} from '@interfaces';

export const Plants = (props: {
	plant: InputForm['plant'];
	onChange: (plant: InputForm['plant']) => void;
}) => {
	const {plant, onChange} = props;
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
			/>
		</>
	);
};
