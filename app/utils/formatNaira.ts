export default function formatNaira(
  amount: number | string | undefined,
): string {
  let finalAmount: number = 0;

  try {
    if (typeof amount === "number") {
      finalAmount = amount;
    }
    if (typeof amount === "string") {
      finalAmount = parseFloat(amount);
    }
  } catch (error) {
    console.error(error);
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(finalAmount);
}
