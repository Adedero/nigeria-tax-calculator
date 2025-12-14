import type { PersonalIncomeTaxSchema } from "~/schema/personal-income-tax.schema";

export default function usePersonalIncomeFormState() {
  const formState = useState<Partial<PersonalIncomeTaxSchema>>(
    "personal-income-form",
    () => ({}),
  );

  formState.value = {
    ...formState.value,
    grossIncomeType: formState.value.grossIncomeType || "monthly",
    rentAmountType: formState.value.rentAmountType || "annual",
    /* houseLoans: formState.value.houseLoans || [
      {
        name: "Loan 1",
        amount: 0,
        interestRate: 0,
      },
    ], */
  };

  const setFormState = (value: Partial<PersonalIncomeTaxSchema>) => {
    formState.value = {
      ...formState.value,
      ...value,
    };
  };

  return {
    formState,
    setFormState,
  };
}
