type CaseType = "lower" | "upper" | "title";

export default function toCase(str: string, caseType?: CaseType): string {
  if (!str) return "";

  switch (caseType) {
    case "lower":
      return str.toLowerCase();

    case "upper":
      return str.toUpperCase();

    case "title":
      return str.replace(
        /\w\S*/g,
        (word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase(),
      );

    default:
      return str;
  }
}
