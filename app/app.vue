<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
</script>
<template>
  <div>
    <NuxtApp>
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </NuxtApp>
    <Analytics />
  </div>
</template>
