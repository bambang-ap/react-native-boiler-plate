import * as React from 'react';
import {
	FlatList as RNFlatList,
	FlatListProps as RNFlatListProps,
	ListRenderItem,
} from 'react-native';

export type ItemInfo<T> = {
	item: T;
	index: number;
	isLast: boolean;
	isFirst: boolean;
};

export type FlatListProps<T> = {
	renderItem: (itemInfo: ItemInfo<T>) => JSX.Element;
} & Omit<RNFlatListProps<T>, 'renderItem'>;

const FlatListCore = <T,>(
	props: FlatListProps<T>,
	ref: React.ForwardedRef<RNFlatList>,
) => {
	const {data, renderItem, ...rest} = props;

	const customRenderItem: ListRenderItem<T> = info => {
		const isFirst = info?.index === 0;
		const isLast = info?.index + 1 === data?.length;
		return renderItem({...info, isLast, isFirst});
	};

	return (
		<RNFlatList ref={ref} data={data} renderItem={customRenderItem} {...rest} />
	);
};

export const FlatList = React.forwardRef(FlatListCore);
