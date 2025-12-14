<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const { formState, setFormState } = usePersonalIncomeFormState();

const items: TabsItem[] = [
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Annual",
    value: "annual",
  },
];

const active = computed({
  get() {
    return formState.value.grossIncomeType;
  },
  set(value) {
    setFormState({ grossIncomeType: value });
  },
});
</script>

<template>
  <NuxtCard>
    <header class="space-y-2 mb-6">
      <div class="flex justify-between items-center gap-2">
        <FormSectionTitle> Total Income </FormSectionTitle>
        <NuxtTabs
          v-model="active"
          :content="false"
          :items="items"
          size="sm"
          color="neutral"
          :ui="{
            trigger: 'data-[state=active]:text-primary',
            indicator: 'bg-default',
          }"
        />
      </div>

      <p class="text-muted text-sm">
        This is the total amount you earn in a
        {{ formState.grossIncomeType === "annual" ? "year" : "month" }}.
        Typically this amount will include your
        {{ formState.grossIncomeType }} salary and any other sources of income
        as defined in the
        <b>NTA Part VII, Section 28, Subsection 2a</b>
      </p>
    </header>

    <div>
      <NuxtFormField
        name="grossIncome"
        :label="`Enter your total (gross) ${formState.grossIncomeType} income or salary`"
      >
        <NuxtFieldGroup class="w-full">
          <NuxtBadge color="neutral" variant="outline" size="lg" label="₦" />
          <NuxtInputNumber
            v-model="formState.grossIncome"
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
  </NuxtCard>
</template>
