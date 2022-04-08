import React, {ForwardedRef, forwardRef} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

type ButtonRef = ForwardedRef<TouchableOpacity>;
export type ButtonProps = {} & Omit<TouchableOpacityProps, ''>;

export const Button = forwardRef((props: ButtonProps, ref: ButtonRef) => {
	const {...rest} = props;
	return <TouchableOpacity {...rest} ref={ref} />;
});
