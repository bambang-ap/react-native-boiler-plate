import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import {BoxSpace, Button, Icon, Text, Wrapper} from '@components';
import {COLORS, SIZES} from '@constants';
import {globalStyles} from '@utils/styles';

const CartButton = () => {
	return (
		<>
			<BoxSpace A />
			<TouchableOpacity>
				<Wrapper
					style={globalStyles.roundPadding}
					itemsCenter
					backgroundColor={COLORS.BLACK30}>
					<Icon name="shopping-cart" />
					<BoxSpace />
					<Text flx>1 Barang</Text>
					<Text alignRight flx>
						Rp. 2.500
					</Text>
					<BoxSpace />
					<Icon name="chevron-right" />
				</Wrapper>
			</TouchableOpacity>
			<BoxSpace />
			<Button>Lanjut</Button>
		</>
	);
};

export default CartButton;
