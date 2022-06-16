import React from 'react';
import {TouchableOpacity} from 'react-native';

import {BoxSpace, Button, Icon, Text, Wrapper} from '@components';
import {COLORS} from '@constants';
import {useScreenProps} from '@hooks';
import {AuthStackParamList} from '@navigators/Auth';
import {globalStyles} from '@utils/styles';

const CartButton = () => {
	const [navigation] = useScreenProps<AuthStackParamList, 'Cashier'>();

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
			<Button onPress={() => navigation.navigate('Cashout')}>Lanjut</Button>
		</>
	);
};

export default CartButton;
