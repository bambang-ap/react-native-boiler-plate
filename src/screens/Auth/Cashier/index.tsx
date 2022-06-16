import React from 'react';

import {
	Body,
	Container,
	Header,
	TextHeader,
	Wrapper,
	BoxSpace,
	IconHeader,
} from '@components';
import {COLORS} from '@constants';

import CartButton from './CartButton';
import ListItems from './ListItems';

const Cashier = () => {
	return (
		<Container>
			<Header
				renderAccessoryLeft={() => <IconHeader name="bars" />}
				renderAccessoryRight={() => (
					<Wrapper>
						<IconHeader name="barcode" />
						<BoxSpace />
						<IconHeader name="plus" />
					</Wrapper>
				)}>
				<TextHeader color={COLORS.WHITE} flx alignCenter>
					Kasir
				</TextHeader>
			</Header>
			<Body>
				<ListItems />
				<CartButton />
				<BoxSpace A />
			</Body>
		</Container>
	);
};

export default Cashier;
