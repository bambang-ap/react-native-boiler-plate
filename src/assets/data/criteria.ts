const veryLow = {
	N1: 0,
	N2: 0.1,
	P1: 0,
	P2: 10,
	K1: 0,
	K2: 10,
};
const low = {
	N1: 0.1,
	N2: 0.2,
	P1: 10,
	P2: 20,
	K1: 10,
	K2: 20,
};
const medium = {
	N1: 0.2,
	N2: 0.5,
	P1: 20,
	P2: 40,
	K1: 20,
	K2: 40,
};
const high = {
	N1: 0.5,
	N2: 0.75,
	P1: 40,
	P2: 60,
	K1: 40,
	K2: 60,
};
const veryHigh = {
	N1: 0.75,
	N2: 1,
	P1: 60,
	P2: 100,
	K1: 60,
	K2: 100,
};

const criteria = [veryLow, low, medium, high, veryHigh].reverse();

export default criteria;
