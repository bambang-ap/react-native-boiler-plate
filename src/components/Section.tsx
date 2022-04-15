import React, {FC} from 'react';

import {BoxSpace, Text, Wrapper} from '@components';

export const Section: FC<{
	title: string;
	withoutValue?: boolean;
	value?: string | number;
}> = props => {
	const {title, children, withoutValue, value} = props;
	const hasValue = !withoutValue && typeof value === 'number' && value >= 0;

	return (
		<>
			<Wrapper>
				<Text>{title}</Text>
				{hasValue && <Text>{value?.toString()}</Text>}
			</Wrapper>
			<BoxSpace />
			{children}
			<BoxSpace B />
		</>
	);
};
