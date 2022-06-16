declare module 'react-native-file-opener3' {
	const FileOpener = {
		open(filepath: string, mimetype?: string): void;,
	};
	export default FileOpener;
}

declare module 'number-currency-format' {
	export type FormattingOptions = {
		/**
		 * Currency symbol to be printed next to the formatted number. By default: none
		 */
		currency?: string;
		/**
		 * Symbol separating thousands. By default: ,
		 */
		thousandSeparator?: string;
		/**
		 * Symbol separating decimals. By default: .
		 */
		decimalSeparator?: string;
		/**
		 * Number of decimal digits. By default: 2
		 */
		decimalsDigits?: number;
		/**
		 * ALWAYS, IF_NEEDED, AS_IS or NEVER. IF_NEEDED does not show the decimal if it is 0 (and if it is different than 0, shows exactly {decimalsDigits} decimal digits). AS_IS preserves the decimal depth of the source number. By default: ALWAYS
		 */
		showDecimals?: 'ALWAYS' | 'IF_NEEDED' | 'AS_IS' | 'NEVER';
		/**
		 * LEFT or RIGHT. By default: RIGHT
		 */
		currencyPosition?: 'LEFT' | 'RIGHT';
		/**
		 * Spacing between currency and price. By default: true
		 */
		spacing?: boolean;
		/**
		 * Use arithmetical rounding (always half-up) instead of tie break rounding. By default: false (so: the rounding will include tie-breaking)
		 */
		arithmeticalRounding?: boolean;
	};

	export function format(number: number, options?: FormattingOptions): string;
	export function unformat(
		text: string,
		options?: Pick<FormattingOptions, 'decimalSeparator'>,
	): number;
}
