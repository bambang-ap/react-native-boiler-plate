import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import {FlatList, Wrapper, BoxSpace, View, Text, Icon} from '@components';
import {COLORS} from '@constants';
import {globalStyles} from '@utils/styles';

const ListItems = () => {
	return (
		<FlatList
			data={Array.from({length: 50})}
			renderItem={({index}) => {
				const backgroundColor =
					index % 2 === 0 ? COLORS.BLACK10 : COLORS.BLACK12;
				return (
					<>
						<BoxSpace />
						<TouchableOpacity onPress={noop}>
							<Wrapper
								style={globalStyles.roundPadding}
								backgroundColor={backgroundColor}
								itemsCenter>
								<BoxSpace E />
								<BoxSpace />
								<View flx>
									<Text>Yes</Text>
									<Text>
										Rp. 2.000 <Text color={COLORS.BLACK50}>/Pcs</Text>
									</Text>
									<Text>Stok : 21 Pcs</Text>
								</View>
								<TouchableWithoutFeedback>
									<Wrapper flx={0.2} height="100%" itemsCenter>
										<BoxSpace />
										<Icon onPress={noop} name="minus" />
										<BoxSpace />
										<Text>21</Text>
										<BoxSpace />
										<Icon onPress={noop} name="plus" />
										<BoxSpace />
									</Wrapper>
								</TouchableWithoutFeedback>
							</Wrapper>
						</TouchableOpacity>
					</>
				);
			}}
		/>
	);
};

export default ListItems;
