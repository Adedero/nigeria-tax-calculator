export default function getMinimumTaxableIncome(
  taxFrequency?: TaxFrequency,
): number {
  const MINIMUM_TAXABLE_INCOME = 800_000;

  if (!taxFrequency) return MINIMUM_TAXABLE_INCOME;

  return taxFrequency === "annual"
    ? MINIMUM_TAXABLE_INCOME
    : MINIMUM_TAXABLE_INCOME / 12;
}
