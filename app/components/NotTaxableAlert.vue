<script setup lang="ts">
const { formState } = usePersonalIncomeFormState();
</script>
<template>
  <div class="bg-muted p-5 rounded-xl">
    <div class="space-y-3 text-center">
      <p class="font-bold text-xl">Tax Exempt</p>

      <div>
        <p class="font-semibold text-muted text-sm">
          Gross {{ formState.grossIncomeType }} icome
        </p>
        <p class="font-bold text-4xl">
          {{ formatNaira(formState.grossIncome) }}
        </p>
      </div>

      <p class="mx-auto max-w-xl">
        Your are exempted from paying taxes because your gross
        {{ formState.grossIncomeType }} income does not exceed
        <b>
          {{ formatNaira(minimumTaxableIncome(formState.grossIncomeType)) }}</b
        >
        per {{ formState.grossIncomeType === "annual" ? "year" : "month" }}.
      </p>
    </div>
  </div>
</template>
