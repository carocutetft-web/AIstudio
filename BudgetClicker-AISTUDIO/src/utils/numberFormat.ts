import { Language } from '../types/game';

interface FormatOptions {
  compact?: boolean;
  fullPrecision?: boolean;
  includeCurrency?: boolean;
}

/**
 * Formats high-precision game currency with compact notation (K, M, B, T, Qa, Qi)
 * Prevents performance bottleneck and floating point display issues at high levels.
 */
export function formatMoney(
  amount: number,
  lang: Language = 'es',
  options: FormatOptions = {}
): string {
  const { compact = false, fullPrecision = false, includeCurrency = true } = options;
  const prefix = includeCurrency ? '$' : '';

  if (isNaN(amount) || amount === null || amount === undefined) {
    return `${prefix}0.00`;
  }

  // If user requests full precision or small amount, format with commas
  if (fullPrecision || (!compact && amount < 1_000_000)) {
    return (
      prefix +
      amount.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  // Suffix tier definitions
  const SUFFIXES_EN = [
    { value: 1e18, symbol: ' Qi' },
    { value: 1e15, symbol: ' Qa' },
    { value: 1e12, symbol: ' T' },
    { value: 1e9, symbol: ' B' },
    { value: 1e6, symbol: ' M' },
    { value: 1e3, symbol: ' K' },
  ];

  const SUFFIXES_ES = [
    { value: 1e18, symbol: ' Trillones' },
    { value: 1e15, symbol: ' Mil Billones' },
    { value: 1e12, symbol: ' Billones' },
    { value: 1e9, symbol: ' Mil Millones' },
    { value: 1e6, symbol: ' Millones' },
    { value: 1e3, symbol: ' Mil' },
  ];

  // For compact view on buttons / tags, use shorter symbol:
  const SHORT_SUFFIXES = [
    { value: 1e18, symbol: 'Qi' },
    { value: 1e15, symbol: 'Qa' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  const tiers = compact ? SHORT_SUFFIXES : (lang === 'es' ? SUFFIXES_ES : SUFFIXES_EN);

  for (const tier of tiers) {
    if (amount >= tier.value) {
      const scaled = amount / tier.value;
      const formattedNumber = scaled >= 100 ? scaled.toFixed(1) : scaled.toFixed(2);
      return `${prefix}${formattedNumber}${tier.symbol}`;
    }
  }

  return (
    prefix +
    amount.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Format rate per second: e.g. "+$145.2K/s"
 */
export function formatRate(amount: number, lang: Language = 'es'): string {
  if (amount < 1000) {
    return `+$${amount.toFixed(2)}/s`;
  }
  return `+${formatMoney(amount, lang, { compact: true })}/s`;
}
