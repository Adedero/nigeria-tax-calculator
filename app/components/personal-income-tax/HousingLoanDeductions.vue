<script setup lang="ts">
import type { RadioGroupItem } from "@nuxt/ui";

const { formState, setFormState } = usePersonalIncomeFormState();

const items: RadioGroupItem[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

function addLoan() {
  let number = (formState.value.houseLoans?.length ?? 0) + 1;
  let name = `Loan ${number}`;

  while (formState.value.houseLoans?.some((loan) => loan.name === name)) {
    number++;
    name = `Loan ${number}`;
  }

  setFormState({
    houseLoans: [
      ...(formState.value.houseLoans ?? []),
      {
        name: `Loan ${number}`,
        amount: 0,
        interestRate: 0,
      },
    ],
  });
}

function removeLoan(name: string) {
  const newLoans = formState.value.houseLoans?.filter(
    (loan) => loan.name !== name,
  );

  setFormState({
    houseLoans: newLoans ?? [],
  });
}
</script>

<template>
  <div class="space-y-4">
    <NuxtFormField
      name="hasTakenLoan"
      label="Are you currently paying back a loan you took to build or develop a house you own and live in?"
      description="Houses rented or rented out do not count."
      class="flex justify-between items-center"
    >
      <NuxtRadioGroup
        v-model="formState.hasTakenLoan"
        :items
        orientation="horizontal"
        variant="table"
        @update:model-value="
          (val) => {
            if (!val) {
              formState.houseLoans = [];
            }
          }
        "
      />
    </NuxtFormField>

    <div v-if="formState.hasTakenLoan" class="space-y-4">
      <NuxtFormField name="houseLoans">
        <NuxtCard
          v-for="(loan, index) in formState.houseLoans"
          :key="loan.name"
          variant="subtle"
        >
          <div>
            <div class="flex justify-between items-center">
              <p class="mb-4 font-bold text-sm">{{ loan.name }}</p>

              <NuxtButton
                icon="lucide:trash-2"
                color="error"
                variant="soft"
                @click="removeLoan(loan.name)"
              />
            </div>

            <div class="gap-4 grid md:grid-cols-2">
              <NuxtFormField
                :name="`houseLoans.${index}.amount`"
                label="Amount"
                required
              >
                <NuxtFieldGroup class="w-full">
                  <NuxtBadge
                    color="neutral"
                    variant="outline"
                    size="lg"
                    label="₦"
                  />
                  <NuxtInputNumber
                    v-model="loan.amount"
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

              <NuxtFormField
                :name="`houseLoans.${index}.interestRate`"
                label="Interest rate (%)"
                required
              >
                <NuxtFieldGroup class="w-full">
                  <NuxtBadge
                    color="neutral"
                    variant="outline"
                    size="lg"
                    label="%"
                  />
                  <NuxtInputNumber
                    v-model="loan.interestRate"
                    :min="0"
                    :step-snapping="false"
                    :format-options="{
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }"
                    orientation="vertical"
                    class="w-full"
                  />
                </NuxtFieldGroup>
              </NuxtFormField>
            </div>
          </div>
        </NuxtCard>
      </NuxtFormField>

      <div class="flex justify-end">
        <NuxtButton
          color="neutral"
          variant="soft"
          icon="lucide:plus"
          @click="addLoan"
        >
          Add loan
        </NuxtButton>
      </div>
    </div>
  </div>
</template>
