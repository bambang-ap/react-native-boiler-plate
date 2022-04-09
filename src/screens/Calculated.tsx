import React from 'react';

import {Body, Container} from '@components';
import {useScreenProps} from '@hooks';

const Calculated = () => {
	const [, route] = useScreenProps('Calculated');
	return (
		<Container>
			<Body />
		</Container>
	);
};

export default Calculated;
