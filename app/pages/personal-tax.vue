<script setup lang="ts">
import type { PersonalIncomeTaxSchema } from "~/schema/personal-income-tax.schema";
import type { PersonalIncomeTaxReport } from "~/utils/tax-report";

const taxReport = ref<PersonalIncomeTaxReport | null>(null);
const open = ref<boolean>(false);

const onSubmit = (input: PersonalIncomeTaxSchema) => {
  taxReport.value = generatePersonalIncomeTaxReport(input);
  open.value = true;
};
</script>

<template>
  <div>
    <header class="flex items-center gap-2 p-5">
      <NuxtButton
        to="/"
        color="neutral"
        icon="lucide:arrow-left"
        variant="soft"
        size="sm"
      >
        Back
      </NuxtButton>

      <h2 class="font-bold text-lg">Personal Income Tax Calculator (₦)</h2>
    </header>

    <div class="mx-auto p-5 max-w-4xl">
      <div class="mb-16">
        <PersonalIncomeTaxForm @submit="onSubmit" />
        <NuxtModal v-model:open="open" :dismissible="false" title="Personal Income Tax Report">
          <template #body>
            <LazyPersonalIncomeTaxReport v-if="taxReport" :report="taxReport" />
          </template>
        </NuxtModal>
      </div>

      <footer>
        <CalculatorDisclaimer />
      </footer>
    </div>
  </div>
</template>
