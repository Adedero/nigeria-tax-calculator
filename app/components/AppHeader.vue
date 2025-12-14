<template>
  <div class="top-0 z-50 sticky">
    <header class="space-y-1 bg-default p-5 border-b border-b-default w-full">
      <div class="flex justify-between items-center">
        <div class="flex gap-3">
          <div
            class="flex justify-center items-center bg-primary/10 p-2 border border-primary/50 rounded-xl size-12 text-primary shrink-0"
          >
            <NuxtIcon name="lucide:calculator" size="2rem" />
          </div>

          <div>
            <h1 class="font-bold text-xl">Nigeria Tax Calculator 2026</h1>
            <p class="text-sm">
              Calculate taxes under the new Tax Act effective January 2026
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2">
        <NuxtButton
          to="https://tat.gov.ng/Nigeria-Tax-Act-2025.pdf"
          target="_blank"
          referrerpolicy="no-referrer"
          rel="noopener"
          color="neutral"
          variant="soft"
          icon="lucide:download"
        >
          Download the Tax Act
        </NuxtButton>

        <NuxtColorModeButton variant="soft" />
      </div>
    </header>
  </div>
</template>
