import * as z from "zod/v4";

export const loanSchema = z.object({
  name: z.string(),
  amount: z
    .number("Enter loan amount")
    .gt(0, "Loan amount must be greater than ₦0"),
  interestRate: z
    .number("Enter interest rate")
    .gt(0, "Interest rate must be greater than ₦0"),
});

export type LoanSchema = z.infer<typeof loanSchema>;

export const personalIncomeTaxSchema = z
  .object({
    grossIncome: z
      .number(`Enter your total income`)
      .gt(0, "Total income must be greater than ₦0"),

    grossIncomeType: z.enum(["monthly", "annual"]),
    paysRent: z.boolean().default(false),
    rentAmount: z
      .number("Enter your rent amount")
      .gt(0, "Rent must be greater than ₦0")
      .optional(),
    rentAmountType: z.enum(["monthly", "annual"]),

    contributesToNHF: z.boolean().default(false),
    contributesToNHIS: z.boolean().default(false),
    contributesToPRA: z.boolean().default(false),
    PRAPercentage: z
      .number("Invalid PRA percentage")
      .min(
        EMPLOYEE_PRA_PERCENTAGE,
        `PRA Percentage must not be less than ${EMPLOYEE_PRA_PERCENTAGE}%`,
      )
      .default(EMPLOYEE_PRA_PERCENTAGE)
      .optional(),
    hasTakenLoan: z.boolean().default(false),
    houseLoans: z.array(loanSchema).min(0).optional(),

    paidLifeInsurance: z.boolean().default(false),
    lifeInsuranceAmount: z
      .number("Enter life insurance amount paid for last year")
      .gt(0, "Life insurance must be greater than ₦0")
      .optional(),
  })
  .refine(
    (form) => {
      // Only validate if paysRent is true
      return !form.paysRent || (form.paysRent && form.rentAmount);
    },
    {
      error: `Enter your rent amount`,
      path: ["rentAmount"],
    },
  )
  .refine(
    (form) => {
      // Only validate if paidLifeInsurance is true
      return (
        !form.paidLifeInsurance ||
        (form.paidLifeInsurance && form.lifeInsuranceAmount)
      );
    },
    {
      error: `Enter your life insurance amount`,
      path: ["lifeInsuranceAmount"],
    },
  )
  .refine(
    (form) => {
      // Only validate if hasTakenLoan is true
      return (
        !form.hasTakenLoan || (form.hasTakenLoan && form.houseLoans?.length)
      );
    },
    {
      error: "Add at least one loan",
      path: ["hasTakenLoan"], // Changed path to houseLoans since that's the field
    },
  );

export type PersonalIncomeTaxSchema = z.infer<typeof personalIncomeTaxSchema>;
