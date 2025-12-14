<script setup lang="ts">
useHead({
  title: "Nigeria Tax Calculator 2026",
});

const taxTypes = [
  {
    id: "personal",
    title: "Personal Income Tax",
    description:
      "Calculate Pay-As-You-Earn (PAYE) tax based on the Nigeria Tax Act 2025. This covers salaries, wages, allowances, and other personal income, including the new ₦800,000 tax-free threshold effective in 2026.",
    icon: "lucide:user",
    to: "/personal-income-tax",
  },
  {
    id: "business",
    title: "Company Income Tax",
    description:
      "Estimate taxes for registered businesses, including Companies Income Tax (CIT) and applicable levies. Designed for SMEs and larger companies operating under Nigeria's updated tax framework.",
    icon: "lucide:building-2",
    to: "/company-income-tax",
  },
];
</script>

<template>
  <div class="mx-auto p-5 max-w-4xl">
    <NuxtAlert
      title="New Tax Reform 2026"
      description="The Nigeria Tax Act 2025 introduces a progressive tax structure effective January 1, 2026. Income up to ₦800,000 is now tax-exempt, and new brackets apply for higher earners."
      icon="lucide:info"
      color="info"
      variant="subtle"
    />

    <div class="space-y-10 mt-10">
      <p class="font-semibold text-primary text-xl text-center">
        What tax do you want to calculate?
      </p>

      <div class="flex md:flex-row flex-col justify-center gap-4">
        <NuxtLink
          v-for="tax in taxTypes"
          :key="tax.id"
          :to="tax.to"
          class="group"
        >
          <NuxtCard class="group-hover:shadow-lg transition-shadow">
            <div class="flex flex-col justify-center items-center gap-4">
              <GradientIconWrapper>
                <NuxtIcon :name="tax.icon" size="2rem" />
              </GradientIconWrapper>

              <div class="flex flex-col justify-center items-center gap-1">
                <p class="font-semibold text-center">
                  {{ tax.title }}
                </p>
                <p class="text-muted text-sm text-center">
                  {{ tax.description }}
                </p>
              </div>
            </div>
          </NuxtCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
