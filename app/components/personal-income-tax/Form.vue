<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui";
import {
  personalIncomeTaxSchema,
  type PersonalIncomeTaxSchema,
} from "~/schema/personal-income-tax.schema";

const emit = defineEmits<{
  submit: [payload: PersonalIncomeTaxSchema];
}>();

const schema = personalIncomeTaxSchema;
const { formState } = usePersonalIncomeFormState();

const isTaxLiable = computed(() => {
  const grossIncome = formState.value.grossIncome;
  if (!grossIncome) return false;

  const annualIncome =
    formState.value.grossIncomeType === "monthly"
      ? grossIncome * 12
      : grossIncome;

  return annualIncome > MAXIMUM_TAX_EXEMPTION_ANNUAL_INCOME;
});

const resetForm = () => {
  formState.value = {};
};

const hasError = ref<boolean>(false);

const onSubmit = (event: FormSubmitEvent<PersonalIncomeTaxSchema>) => {
  hasError.value = false;
  emit("submit", event.data);
};

const onError = (event: FormErrorEvent) => {
  console.error("Form error: ", event.errors);
  hasError.value = true;
};
</script>

<template>
  <NuxtForm :state="formState" :schema @submit="onSubmit" @error="onError">
    <div class="space-y-8">
      <PersonalIncomeTaxTotalIncomeSection />

      <div v-if="formState.grossIncome !== undefined && !isTaxLiable">
        <NotTaxableAlert />
      </div>

      <div
        v-else-if="formState.grossIncome !== undefined && isTaxLiable"
        class="space-y-6"
      >
        <PersonalIncomeTaxEligibleDeductionsSection />

        <NuxtAlert
          v-if="hasError"
          title="Error"
          description="One or more required fields are missing. Please, go through the form and confirm all your responses."
          color="error"
          variant="subtle"
          icon="lucide:info"
        />

        <div class="flex justify-end items-center gap-2">
          <NuxtButton
            icon="lucide:refresh-cw"
            color="neutral"
            variant="soft"
            @click="resetForm"
          >
            Reset
          </NuxtButton>

          <NuxtButton type="submit" icon="lucide:calculator">
            Calculate
          </NuxtButton>
        </div>
      </div>
    </div>
  </NuxtForm>
</template>
