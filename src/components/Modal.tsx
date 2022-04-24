import * as React from 'react';

import ModalRN, {ModalProps as RNModalProps} from 'react-native-modal';

import {View, ViewProps} from '@components';

type AnimationProps =
	| 'animationIn'
	| 'animationOut'
	| 'animationInTiming'
	| 'animationOutTiming';

export type ModalProps = {
	visible: boolean;
	backdropOpacity?: number;
	children: React.ReactNode;
	onBackdropClick?: () => void;
} & Partial<Pick<RNModalProps, AnimationProps>>;

export const Modal = (props: ModalProps) => {
	const {
		visible,
		onBackdropClick,
		backdropOpacity = 0.5,
		children,
		...rest
	} = props;
	return (
		<ModalRN
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropOpacity={backdropOpacity}
			isVisible={visible}
			style={{margin: 0}}
			onBackdropPress={onBackdropClick}
			onBackButtonPress={onBackdropClick}
			{...rest}>
			{children}
		</ModalRN>
	);
};

export const ModalContainer: React.FC<ViewProps> = props => {
	const {children, style, ...rest} = props;
	return (
		// @ts-ignore
		<View style={[style, {maxHeight: '90%'}]} {...rest}>
			{children}
		</View>
	);
};
