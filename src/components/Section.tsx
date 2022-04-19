import React, {FC} from 'react';

import {BoxSpace, Text, Wrapper} from '@components';

export const Section: FC<{
	title: string;
	withoutValue?: boolean;
	value?: string | number;
	fixed?: number;
}> = props => {
	const {title, children, withoutValue, value, fixed = 0} = props;
	const hasValue = !withoutValue && typeof value === 'number' && value >= 0;

	return (
		<>
			<Wrapper>
				<Text>{title}</Text>
				{hasValue && <Text>{value?.toFixed(fixed)}</Text>}
			</Wrapper>
			<BoxSpace />
			{children}
			<BoxSpace B />
		</>
	);
};
