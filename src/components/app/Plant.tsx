import React, {Fragment} from 'react';

import plants from '@assets/data/plants';
import {
	BoxSpace,
	ButtonVariant,
	FlatList,
	Image,
	Text,
	View,
	Button,
} from '@components';
import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {TYPOGRAPHY} from '@constants/typography';
import {InputForm} from '@interfaces';

const data = plants.length % 2 === 0 ? plants : [...plants, 0];

export const Plants = (props: {
	plant: InputForm['plant'];
	onChange: (plant: InputForm['plant']) => void;
}) => {
	const {plant, onChange} = props;
	return (
		<>
			<Text>Tanaman</Text>
			<BoxSpace />
			<FlatList
				data={data}
				numColumns={2}
				renderItem={({item, index}) => {
					const isOdd = index % 2 === 0;
					if (typeof item === 'number')
						return (
							<Fragment>
								<View flx />
								<BoxSpace D />
							</Fragment>
						);

					const isSelected = item?.name === plant?.name;
					const variant = isSelected
						? ButtonVariant.primary
						: ButtonVariant.light;

					return (
						<Fragment key={item.name}>
							<Button
								flx
								key={item.name}
								variant={variant}
								onPress={() => onChange(item)}
								style={{marginBottom: SIZES.padding}}
								textProps={{alignCenter: true}}>
								<View width="10%">
									<Image source={item.image} />
								</View>
								<BoxSpace />
								<Text
									variant={TYPOGRAPHY.headline5}
									color={isSelected ? COLORS.WHITE : COLORS.BLACK100}>
									{item.name}
								</Text>
							</Button>
							{isOdd && <BoxSpace />}
						</Fragment>
					);
				}}
			/>
		</>
	);
};
