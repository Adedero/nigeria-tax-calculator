<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
//import type { TaxBandApplied } from "~/utils/tax-report";

const { report } = defineProps<{
  report: PersonalIncomeTaxReport;
}>();

const taxAsPercentageOfIncome = computed(() => ({
  annual: round((report.annualTax / report.annualGrossIncome) * 100),
  monthly: round((report.monthlyTax / report.monthlyGrossIncome) * 100),
}));

const chartData = computed(() => {
  return report.deductions
    .filter((d) => d.value > 0) // Only show non-zero deductions
    .map((d) => d);
});

// BracketIncome RangeAmount TaxedRateTax Paid

const taxBandsColumns: TableColumn<(typeof TAX_BANDS)[number]>[] = [
  {
    accessorKey: "label",
    header: "Annual Income Range",
  },
  {
    accessorKey: "rate",
    header: "PAYE Rate",
    cell: ({ row }) => `${(row.getValue("rate") as number) * 100}%`,
  },
];

/* const taxChargeColumns: TableColumn<TaxBandApplied>[] = [
  {
    header: "Bracket",
    cell: ({ row }) => `${row.getValue('rangeStart')} → ${row.getValue('rangeEnd')}`
  },
  {
    header: "Income Range",
    cell: ({ row }) => `${formatNaira(row.getValue('taxableAmount'))}`
  },
  {
    header: "Amount taxed",
  },
  {
    header: "Rate",
  },
  {
    header: "Tax Paid",
  },
];
 */
/**
 *  <td class="p-3">{{ band.bracket }}{{ band.bracket === 1 ? 'st' : band.bracket === 2 ? 'nd' : band.bracket === 3 ? 'rd' : 'th' }}</td>
          <td class="p-3">
            {{ formatCurrency(band.rangeStart) }} → {{ formatCurrency(band.rangeEnd) }}
          </td>
          <td class="p-3 text-right">{{ formatCurrency(band.taxableAmount) }}</td>
          <td class="p-3 text-right">{{ formatPercentage(band.rate) }}</td>
          <td class="p-3 font-semibold text-right">{{ formatCurrency(band.tax) }}</td>
        </tr>
 */
</script>

<template>
  <div class="space-y-4">
    <NuxtCard>
      <div class="text-center">
        <p class="font-semibold text-muted text-sm uppercase">
          Annual Personal Income Tax
        </p>
        <p class="font-mono font-bold text-error text-3xl">
          {{ formatNaira(report.annualTax) }}
        </p>
        <p class="font-medium text-muted">
          <b>
            {{ formatNaira(report.monthlyTax) }}
          </b>
          /month
        </p>
      </div>

      <div class="flex justify-center mt-5">
        <ProgressCircle
          :value="taxAsPercentageOfIncome.annual"
          :size="120"
          :stroke-width="16"
          progress-class="stroke-error"
        >
          <template #default="{ value }">
            <div class="text-center">
              <p class="font-semibold">{{ value }}%</p>
              <p class="text-muted text-xs">of annual income</p>
            </div>
          </template>
        </ProgressCircle>
      </div>
    </NuxtCard>

    <NuxtCard>
      <div class="space-y-6">
        <!-- Gross Income -->
        <div class="space-y-1">
          <p class="font-semibold text-muted text-sm uppercase">
            Annual Gross Income
          </p>
          <p class="font-mono font-bold text-2xl">
            {{ formatNaira(report.annualGrossIncome) }}
          </p>
          <p class="font-medium text-muted text-sm">
            {{ formatNaira(report.monthlyGrossIncome) }}/month
          </p>
        </div>

        <NuxtSeparator />

        <!-- Income after taxes -->

        <div class="space-y-1">
          <p class="font-semibold text-muted text-sm uppercase">
            Annual Income After Tax
          </p>
          <p class="font-mono font-bold text-2xl">
            {{ formatNaira(report.annualGrossIncome - report.annualTax) }}
          </p>
          <p class="font-medium text-muted text-sm">
            {{
              formatNaira(report.monthlyGrossIncome - report.monthlyTax)
            }}/month
          </p>
        </div>

        <NuxtSeparator />

        <!-- Chargeable Income -->

        <div class="space-y-1">
          <p class="font-semibold text-muted text-sm uppercase">
            Chargeable Income
          </p>
          <p class="font-mono font-bold text-2xl">
            {{ formatNaira(report.annualGrossIncome - report.totalDeductions) }}
          </p>
          <p class="font-medium text-muted text-sm">
            The portion of your annual income from which the tax can be
            deducted. Calculated as your annual gross income minus total annual
            deductions
          </p>

          <div class="flex justify-center mt-5">
            <ProgressCircle
              :value="
                ((report.annualGrossIncome - report.totalDeductions) /
                  report.annualGrossIncome) *
                100
              "
              :size="120"
              :stroke-width="16"
              progress-class="stroke-error"
            >
              <template #default="{ value }">
                <div class="text-center">
                  <p class="font-semibold">{{ value }}%</p>
                  <p class="text-muted text-xs">of annual income</p>
                </div>
              </template>
            </ProgressCircle>
          </div>
        </div>

        <NuxtSeparator />

        <!-- Deductions -->
        <div class="space-y-1">
          <p class="font-semibold text-muted text-sm uppercase">
            Total Annual Deductions
          </p>
          <p class="font-mono font-bold text-2xl">
            {{ formatNaira(report.totalDeductions) }}
          </p>

          <ul>
            <li
              v-for="deduction in report.deductions"
              :key="deduction.label"
              class="flex items-center gap-2"
            >
              <NuxtIcon
                :name="
                  deduction.value ? 'lucide:circle-check' : 'lucide:circle-x'
                "
                :class="deduction.value ? 'text-success' : 'text-error'"
              />

              <p class="text-muted text-sm">
                {{ deduction.label }}
              </p>

              <p class="font-medium text-muted text-sm">
                {{ formatNaira(deduction.value) }}
              </p>
            </li>
          </ul>

          <div
            v-if="chartData.some((data) => data.value > 0)"
            class="flex justify-center mt-4"
          >
            <DonutChart :data="chartData" :size="120" :stroke-width="16" />
          </div>
        </div>

        <NuxtSeparator />

        <!-- TAX BANDS -->
        <div class="space-y-2">
          <header class="flex items-center gap-4">
            <p class="font-semibold text-muted text-sm uppercase">
              New PAYE Tax Rates 2026
            </p>
            <NuxtBadge color="info" variant="soft" class="rounded-full">
              Tax Act 2025
            </NuxtBadge>
          </header>

          <NuxtTable
            :data="TAX_BANDS"
            :columns="taxBandsColumns"
            class="flex-1"
          />
        </div>

        <NuxtSeparator />

        <!-- How you were charged -->
        <!-- <div class="space-y-2">
          <header>
            <p class="font-semibold text-muted text-sm uppercase">
              How you were charged
            </p>
          </header>

          <NuxtTable
            :data="report.taxBandsApplied"
            
            class="flex-1"
          />
        </div> -->
      </div>
    </NuxtCard>
  </div>
</template>
