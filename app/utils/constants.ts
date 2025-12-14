export const MAXIMUM_TAX_EXEMPTION_ANNUAL_INCOME = 800_000;
export const EMPLOYEE_NHF_MONTHLY_PERCENTAGE = 2.5;
export const EMPLOYEE_NHIS_MONTHLY_PERCENTAGE = 5;
export const EMPLOYEE_PRA_PERCENTAGE = 8;
export const EMPLOYER_PRA_PERCENTAGE = 10;
export const TAX_BANDS = [
  { upper: 800_000, rate: 0, label: "First ₦800,000" },
  { upper: 3_000_000, rate: 0.15, label: "Next ₦2,200,000" }, // 800k + 2.2M
  { upper: 12_000_000, rate: 0.18, label: "Next ₦9,000,000" }, // 3M + 9M
  { upper: 25_000_000, rate: 0.21, label: "Next ₦13,000,000" }, // 12M + 13M
  { upper: 50_000_000, rate: 0.23, label: "Next ₦25,000,000" }, // 25M + 25M
  { upper: Infinity, rate: 0.25, label: "Above ₦50,000,000" },
];
export const RENT_RELIEF_PERCENTAGE = 20;
export const MAXIMUM_RENT_RELIEF = 500_000;
/* First 800,000	0%
2	Next 183,333.33	Next 2,200,000	15%
3	Next 750,000	Next 9,000,000	18%
4	Next 1,083,333.33	Next 13,000,000	21%
5	Next 2,083,333.33	Next 25,000,000	23%
7	Above 4,666,666.67	Above 50,000,000	25% */