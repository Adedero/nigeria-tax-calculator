<script setup lang="ts">
import type { RadioGroupItem, SelectItem } from "@nuxt/ui";

const { formState } = usePersonalIncomeFormState();

const items: RadioGroupItem[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
const rentTypeItems = [
  { label: "per month", value: "monthly" },
  { label: "per year", value: "annual" },
] as const satisfies SelectItem[];
</script>

<template>
  <NuxtCard>
    <header class="mb-8">
      <FormSectionTitle> Eligible Deductions </FormSectionTitle>
      <p class="text-muted text-sm">
        Eligible deductions are the parts of your
        {{ formState.grossIncomeType }} income that cannot be taxed. These
        amounts, as enumerated in the
        <b>NTA Part VII, Section 30, Subsection 2a</b>, are deducted from your
        total income to get the taxable portion of your income.
      </p>
    </header>

    <div class="space-y-5">
      <!-- Rent -->
      <div class="space-y-2">
        <NuxtFormField
          name="paysRent"
          label="Do you pay house rent?"
          class="flex justify-between items-center"
        >
          <NuxtRadioGroup
            v-model="formState.paysRent"
            :items
            orientation="horizontal"
            variant="table"
          />
        </NuxtFormField>

        <NuxtFormField
          v-if="formState.paysRent"
          name="rentAmount"
          :label="`How much is your rent?`"
        >
          <NuxtFieldGroup class="w-full">
            <NuxtBadge color="neutral" variant="outline" size="lg" label="₦" />
            <NuxtInputNumber
              v-model="formState.rentAmount"
              :min="0"
              :step-snapping="false"
              :format-options="{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              orientation="vertical"
              class="grow"
            />
            <NuxtSelect
              v-model="formState.rentAmountType"
              :items="rentTypeItems"
              class="rounded-r-md!"
            />
          </NuxtFieldGroup>
        </NuxtFormField>
      </div>

      <!-- NHF -->
      <div>
        <NuxtFormField
          name="contributesToNHF"
          label="Do you contribute to the National Housing Fund (NHF)?"
          class="flex justify-between items-center"
        >
          <NuxtRadioGroup
            v-model="formState.contributesToNHF"
            :items
            orientation="horizontal"
            variant="table"
          />
        </NuxtFormField>
        <p class="mt-2 md:mt-0 text-muted text-sm">
          The NHF Contribution is
          {{ EMPLOYEE_NHF_MONTHLY_PERCENTAGE }}% of your monthly income
          automatically deducted by your employer
        </p>
      </div>

      <!-- NHIS -->
      <div>
        <NuxtFormField
          name="contributesToNHIS"
          label="Do you contribute to the National Health Insurance Scheme (NHIS)?"
          class="flex justify-between items-center"
        >
          <NuxtRadioGroup
            v-model="formState.contributesToNHIS"
            :items
            orientation="horizontal"
            variant="table"
          />
        </NuxtFormField>
        <p class="mt-2 md:mt-0 text-muted text-sm">
          The NHIS Contribution is
          {{ EMPLOYEE_NHIS_MONTHLY_PERCENTAGE }}% of your monthly income
          automatically deducted by your employer
        </p>
      </div>

      <!-- PRA -->
      <div class="space-y-2">
        <NuxtFormField
          name="contributesToPRA"
          label="Do you contribute to the Retirement Savings Acount (RSA) under the Pension Reform Act (PRA)?"
          class="flex justify-between items-center"
        >
          <NuxtRadioGroup
            v-model="formState.contributesToPRA"
            :items
            orientation="horizontal"
            variant="table"
          />
        </NuxtFormField>

        <NuxtFormField
          v-if="formState.contributesToPRA"
          name="PRAPercentage"
          label="What percentage of your monthly salary do you contribute to the RSA?"
          :help="`The minimum required by law is ${EMPLOYEE_PRA_PERCENTAGE}%`"
        >
          <NuxtFieldGroup class="w-full">
            <NuxtBadge color="neutral" variant="outline" size="lg" label="%" />
            <NuxtInputNumber
              v-model="formState.PRAPercentage"
              :min="EMPLOYEE_PRA_PERCENTAGE"
              :step-snapping="false"
              :format-options="{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              orientation="vertical"
              class="grow"
            />
          </NuxtFieldGroup>
        </NuxtFormField>
      </div>

      <!-- Housing Loans -->
      <PersonalIncomeTaxHousingLoanDeductions />

      <!-- Life insurance -->
      <div class="space-y-2">
        <NuxtFormField
          name="paidLifeInsurance"
          label="Did you pay for life insurance for you and/or your spouse last year?"
          class="flex justify-between items-center"
        >
          <NuxtRadioGroup
            v-model="formState.paidLifeInsurance"
            :items
            orientation="horizontal"
            variant="table"
          />
        </NuxtFormField>

        <NuxtFormField
          v-if="formState.paidLifeInsurance"
          name="lifeInsuranceAmount"
          :label="`How much did you pay in total for the full year?`"
        >
          <NuxtFieldGroup class="w-full">
            <NuxtBadge color="neutral" variant="outline" size="lg" label="₦" />
            <NuxtInputNumber
              v-model="formState.lifeInsuranceAmount"
              :min="0"
              :step-snapping="false"
              :format-options="{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              orientation="vertical"
              class="grow"
            />
          </NuxtFieldGroup>
        </NuxtFormField>
      </div>
    </div>
  </NuxtCard>
</template>
