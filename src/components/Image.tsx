import React, {useEffect, useState} from 'react';
import {
	Image as RNImage,
	ImageProps as RNImageProps,
	ImageRequireSource,
	ImageStyle,
	ImageURISource,
	LayoutRectangle,
} from 'react-native';

import {View, ViewProps} from '@components';

export type ImageProps = Omit<RNImageProps, 'style'> & {
	style?: ImageStyle;
	viewProps?: Omit<ViewProps, 'style'>;
	containerStyle?: ViewProps['style'];
} & (
		| {
				fit?: false;
				maxHeight?: undefined;
				maxWidth?: undefined;
				ratio?: undefined;
		  }
		| {
				fit?: true;
				maxHeight?: number;
				maxWidth?: number;
				ratio?: string;
		  }
	);
export const Image = (props: ImageProps) => {
	let {
		fit,
		maxHeight,
		maxWidth,
		viewProps = {},
		style,
		containerStyle,
		source,
		...rest
	} = props;

	const {onLayout = noop, ...viewPropsRest} = viewProps;

	const [ratio, setRatio] = useState(0);
	const [layout, setLayout] = useState({
		width: 0,
		height: 0,
	} as LayoutRectangle);

	const size = {
		width: layout.width,
		height: layout.width * ratio,
	};

	const getSize = () => {
		if (
			!maxHeight ||
			layout.height === 0 ||
			layout.width === 0 ||
			layout.height < maxHeight
		)
			return {};
		if (ratio < 1.5) return {};
		return {
			width: layout.width / ((layout.width * ratio) / maxHeight),
			height: maxHeight,
		};
	};

	useEffect(() => {
		source = source as ImageURISource;
		if (source?.uri) {
			RNImage.getSize(source.uri, (w, h) => setRatio(h / w), noop);
		} else if (typeof source === 'number') {
			source = source as ImageRequireSource;
			const {width, height} = RNImage.resolveAssetSource(source);
			setRatio(height / width);
		}
	}, [layout.width, layout.height, source]);

	return source &&
		// @ts-ignore
		(source?.uri || source?.uri !== '' || typeof source === 'number') ? (
		// @ts-ignore
		<View
			style={[{overflow: 'hidden'}, containerStyle]}
			onLayout={event => {
				setLayout(event.nativeEvent.layout);
				onLayout(event);
			}}
			{...viewPropsRest}>
			<RNImage
				style={[style, size, getSize()].toRnStyle()}
				source={source}
				{...rest}
			/>
		</View>
	) : null;
};
