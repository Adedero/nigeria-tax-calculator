import type { PersonalIncomeTaxSchema } from "~/schema/personal-income-tax.schema";
import {
  EMPLOYEE_NHF_MONTHLY_PERCENTAGE,
  EMPLOYEE_NHIS_MONTHLY_PERCENTAGE,
  EMPLOYEE_PRA_PERCENTAGE,
  RENT_RELIEF_PERCENTAGE,
  MAXIMUM_TAX_EXEMPTION_ANNUAL_INCOME,
  TAX_BANDS,
} from "~/utils/constants";

type Period = "monthly" | "annual";

export interface TaxDeduction {
  label: string;
  value: number;
}

export interface TaxBandApplied {
  bracket: number;
  label: string;
  rangeStart: number;
  rangeEnd: number;
  taxableAmount: number;
  rate: number;
  tax: number;
}
export interface PersonalIncomeTaxReport {
  annualGrossIncome: number;
  monthlyGrossIncome: number;
  deductions: TaxDeduction[];
  totalDeductions: number;
  chargeableIncome: number;
  taxBandsApplied: TaxBandApplied[];
  annualTax: number;
  monthlyTax: number;
}

export function generatePersonalIncomeTaxReport(
  input: PersonalIncomeTaxSchema,
): PersonalIncomeTaxReport {
  /* ------------------ income ------------------ */
  const annualGrossIncome = toAnnual(input.grossIncome, input.grossIncomeType);
  const monthlyGrossIncome = annualGrossIncome / 12;

  if (annualGrossIncome <= MAXIMUM_TAX_EXEMPTION_ANNUAL_INCOME) {
    return {
      annualGrossIncome,
      monthlyGrossIncome,
      deductions: [],
      totalDeductions: 0,
      chargeableIncome: 0,
      taxBandsApplied: [],
      annualTax: 0,
      monthlyTax: 0,
    };
  }

  /* ------------------ deductions ------------------ */
  const monthlySalary =
    input.grossIncomeType === "monthly"
      ? input.grossIncome
      : input.grossIncome / 12;

  const nhf = input.contributesToNHF
    ? monthlySalary * (EMPLOYEE_NHF_MONTHLY_PERCENTAGE / 100) * 12
    : 0;

  const nhis = input.contributesToNHIS
    ? monthlySalary * (EMPLOYEE_NHIS_MONTHLY_PERCENTAGE / 100) * 12
    : 0;

  const pra =
    input.contributesToPRA && input.PRAPercentage
      ? (monthlySalary *
          Math.max(input.PRAPercentage, EMPLOYEE_PRA_PERCENTAGE) *
          12) /
        100
      : 0;

  const lifeInsurance =
    input.paidLifeInsurance && input.lifeInsuranceAmount
      ? input.lifeInsuranceAmount
      : 0;

  const annualRent =
    input.paysRent && input.rentAmount
      ? toAnnual(input.rentAmount, input.rentAmountType)
      : 0;

  const rentRelief = Math.min(
    annualRent * (RENT_RELIEF_PERCENTAGE / 100),
    MAXIMUM_RENT_RELIEF,
  );

  /* ---- housing loan interest (simple annual interest) ---- */
  const housingLoanInterest = input.hasTakenLoan
    ? (input.houseLoans?.reduce((sum, loan) => {
        return sum + (loan.amount * loan.interestRate) / 100;
      }, 0) ?? 0)
    : 0;

  const totalDeductions =
    nhf + nhis + pra + lifeInsurance + rentRelief + housingLoanInterest;

  /* ------------------ chargeable income ------------------ */
  const chargeableIncome = Math.max(0, annualGrossIncome - totalDeductions);

  /* ------------------ progressive tax calculation ------------------ */
  let remaining = chargeableIncome;
  let annualTax = 0;
  const taxBandsApplied: TaxBandApplied[] = [];

  let previousUpper = 0;

  
  for (let i = 0; i < TAX_BANDS.length; i++) {
    const band = TAX_BANDS[i];
    if (!band || remaining <= 0) break;

    // Calculate the size of this bracket
    const bracketSize = band.upper - previousUpper;

    // How much income falls in this bracket
    const taxableInBracket = Math.min(remaining, bracketSize);

    // Calculate tax for this bracket
    const taxForBracket = taxableInBracket * band.rate;

    if (taxableInBracket > 0) {
      const rangeStart = previousUpper;
      const rangeEnd = previousUpper + taxableInBracket;

      taxBandsApplied.push({
        bracket: i + 1,
        label: band.label,
        rangeStart,
        rangeEnd,
        taxableAmount: taxableInBracket,
        rate: band.rate,
        tax: taxForBracket,
      });

      annualTax += taxForBracket;
      remaining -= taxableInBracket;
    }

    previousUpper = band.upper;
  }

  return {
    annualGrossIncome,
    monthlyGrossIncome,
    deductions: [
      { label: "NHF", value: nhf },
      { label: "NHIS", value: nhis },
      { label: "Pensions", value: pra },
      { label: "Life insurance premium", value: lifeInsurance },
      { label: "Rent relief", value: rentRelief },
      { label: "Mortgage interest", value: housingLoanInterest },
    ],
    totalDeductions,
    chargeableIncome,
    taxBandsApplied,
    annualTax,
    monthlyTax: annualTax / 12,
  };
}

/* ------------------ helpers ------------------ */
function toAnnual(amount: number, type: Period) {
  return type === "monthly" ? amount * 12 : amount;
}
