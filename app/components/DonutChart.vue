<script setup lang="ts">
export interface DonutSegment {
  value: number;
  label: string;
  color?: string;
  class?: string;
}

interface Props {
  data?: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  showLabels?: boolean;
  showPercentages?: boolean;
  gap?: number; // Gap between segments in degrees
  startAngle?: number; // Starting angle in degrees
  strokeLineCap?: "round" | "butt" | "square" | "inherit";
}

const {
  data = [],
  size = 200,
  strokeWidth = 40,
  showLabels = true,
  showPercentages = true,
  gap = 0,
  startAngle = -90,
  strokeLineCap = "butt"
} = defineProps<Props>();

// Default colors if not provided
const defaultColors = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

const values = computed(() => {
  const viewBoxSize = size;
  const center = viewBoxSize / 2;
  const outerRadius = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * outerRadius;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0 || data.length === 0) {
    return { viewBoxSize, center, outerRadius, segments: [], total: 0 };
  }

  // Total gap space in degrees
  const totalGap = gap * data.length;
  // Available angle for actual segments
  const availableAngle = 360 - totalGap;

  let currentAngle = startAngle;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    // Actual angle this segment should occupy (proportional within available space)
    const segmentAngle = (item.value / total) * availableAngle;

    // Visual length on circumference
    const segmentCircumference = (segmentAngle / 360) * circumference;
    // Dash array: draw segment, then full circle gap (transparent)
    const dashArray = `${segmentCircumference} ${circumference}`;

    const segment = {
      value: item.value,
      label: item.label,
      percentage: Number(percentage.toFixed(1)),
      color: item.color || defaultColors[index % defaultColors.length],
      class: item.class || "",
      circumference,
      dashArray,
      // Start drawing at currentAngle (which already includes previous gaps)
      rotation: currentAngle,
    };

    // Advance for next segment: add this segment's angle + one gap
    currentAngle += segmentAngle + gap;

    return segment;
  });

  return {
    viewBoxSize,
    center,
    outerRadius,
    segments,
    total,
  };
});
</script>

<template>
  <div class="inline-flex flex-col items-center gap-4">
    <div class="relative">
      <!-- Center content slot -->
      <div
        v-if="$slots.center"
        class="top-1/2 left-1/2 z-10 absolute text-center -translate-x-1/2 -translate-y-1/2"
      >
        <slot name="center" :total="values.total" :data="data" />
      </div>

      <svg
        :viewBox="`0 0 ${values.viewBoxSize} ${values.viewBoxSize}`"
        :width="size"
        :height="size"
        class="overflow-visible -rotate-90"
      >
        <!-- Background circle (optional) -->
        <circle
          :cx="values.center"
          :cy="values.center"
          :r="values.outerRadius"
          fill="transparent"
          stroke="var(--ui-bg-elevated)"
          :stroke-width="strokeWidth"
        />

        <!-- Donut segments -->
        <circle
          v-for="(segment, index) in values.segments"
          :key="index"
          :cx="values.center"
          :cy="values.center"
          :r="values.outerRadius"
          fill="transparent"
          :stroke="segment.color"
          :stroke-width="strokeWidth"
          :stroke-dasharray="segment.dashArray"
          :stroke-linecap="strokeLineCap"
          :transform="`rotate(${segment.rotation} ${values.center} ${values.center})`"
          :class="segment.class"
          class="hover:opacity-80 transition-all duration-300"
        />
      </svg>
    </div>

    <!-- Legend -->
    <div
      v-if="showLabels"
      class="flex flex-wrap justify-center gap-3 max-w-full"
    >
      <div
        v-for="(segment, index) in values.segments"
        :key="index"
        class="flex items-center gap-2"
      >
        <div
          class="rounded-sm w-3 h-3 shrink-0"
          :style="{ backgroundColor: segment.color }"
        />
        <span class="text-muted text-sm">
          {{ segment.label }}
          <span v-if="showPercentages" class="text-dimmed">
            ({{ segment.percentage }}%)
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
circle {
  transition:
    opacity 0.2s ease,
    stroke-dashoffset 0.3s ease;
}
</style>
