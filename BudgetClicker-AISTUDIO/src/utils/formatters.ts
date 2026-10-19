// Ultra-fast compact number formatting for clickers reaching billions & trillions

const SUFFIXES = [
  '',
  'K',
  'M',
  'B',
  'T',
  'Qa',
  'Qi',
  'Sx',
  'Sp',
  'Oc',
  'No',
  'Dc',
];

export function formatMoney(val: number): string {
  if (val === undefined || val === null || isNaN(val)) return '0.00';
  if (val < 0) return '-' + formatMoney(-val);

  // Under 1 million: normal locale formatting with 2 decimal places
  if (val < 1000000) {
    return val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // 1 Million and above: compact suffix notation
  const i = Math.floor(Math.log10(val) / 3);
  if (i >= SUFFIXES.length) {
    return val.toExponential(2);
  }

  const scaled = val / Math.pow(10, i * 3);
  return `${scaled.toFixed(2)} ${SUFFIXES[i]}`;
}

export function formatRate(val: number): string {
  if (val === undefined || val === null || isNaN(val)) return '0.00';
  if (val < 1000) {
    return val.toFixed(2);
  }
  return formatMoney(val);
}
