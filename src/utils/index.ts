import {format, FormattingOptions} from 'number-currency-format';

export const convertNumber = (num: string) => {
	const value = num.slice(num.length - 1) === '.' ? `${num}0` : num;

	const showDecimals: FormattingOptions['showDecimals'] = value.includes('.')
		? 'ALWAYS'
		: 'NEVER';

	const [, decimal] = value.split('.');

	return format(Number(value), {
		showDecimals,
		currency: 'Rp.',
		decimalSeparator: ',',
		thousandSeparator: '.',
		currencyPosition: 'LEFT',
		decimalsDigits: decimal?.length ?? 0,
	});
};
