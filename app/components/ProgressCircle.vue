<script setup lang="ts">

interface Props {
  value?: number;
  total?: number;
  size?: number;
  decimalPlaces?: number;
  strokeWidth?: number;
  strokeLineCap?: "round" | "butt" | "square" | "inherit";
  backgroundColor?: string;
  progressColor?: string;
  backgroundClass?: string;
  progressClass?: string;
}

const {
  value = 0,
  total = 100,
  size = 40,
  decimalPlaces = 2,
  strokeWidth = 8,
  strokeLineCap = "butt",
  backgroundColor = "",
  progressColor = "",
  backgroundClass = "",
  progressClass = ""
} = defineProps<Props>();

const values = computed(() => {
  // Add padding for the stroke
  const viewBoxSize = size;
  const center = viewBoxSize / 2;
  const radius = (viewBoxSize - strokeWidth) / 2; // Account for stroke width
  const circumference = 2 * Math.PI * radius;

  const percentage =
    total > 0 ? Number(((value / total) * 100).toFixed(decimalPlaces)) : 0;

  return {
    value: Number(value.toFixed(decimalPlaces)),
    viewBoxSize,
    center,
    radius,
    circumference,
    percentage,
    progressOffset: circumference * (1 - percentage / 100),
  };
});

// Compute final stroke values
const backgroundStroke = computed(() => {
  return backgroundColor || 'var(--ui-bg-elevated)';
});

const progressStroke = computed(() => {
  return progressColor || 'var(--ui-primary)';
});
</script>

<template>
  <div class="relative w-fit h-fit">
    <div
      class="top-1/2 left-1/2 z-1 absolute -translate-x-1/2 -translate-y-1/2"
    >
      <slot :value="values.value" />
    </div>

    <svg 
      :viewBox="`0 0 ${values.viewBoxSize} ${values.viewBoxSize}`" 
      :width="size" 
      :height="size"
      class="overflow-visible"
    >
      <!-- background -->
      <circle
        :cx="values.center"
        :cy="values.center"
        :r="values.radius"
        fill="transparent"
        :stroke="backgroundStroke"
        :stroke-width="strokeWidth"
        :class="backgroundClass"
      />

      <!-- progress -->
      <circle
        :cx="values.center"
        :cy="values.center"
        :r="values.radius"
        fill="transparent"
        :stroke="progressStroke"
        :stroke-width="strokeWidth"
        :stroke-dasharray="values.circumference"
        :stroke-dashoffset="values.progressOffset"
        :stroke-linecap="strokeLineCap"
        :transform="`rotate(-90 ${values.center} ${values.center})`"
        :class="progressClass"
      />
    </svg>
  </div>
</template>

<style scoped>
circle {
  transition: stroke-dashoffset 0.3s ease;
}
</style>