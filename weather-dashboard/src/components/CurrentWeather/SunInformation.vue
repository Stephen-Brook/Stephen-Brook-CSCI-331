<template>
  <div>
    <h2>Sun Information</h2>

    <template v-if="currentWeather && currentWeather.sys">
      <p>
        <strong>Sunrise: </strong> {{ formatTime(currentWeather.sys.sunrise) }}
      </p>
      <p>
        <strong>Sunset: </strong> {{ formatTime(currentWeather.sys.sunset) }}
      </p>
    </template>

    <template v-else>
      <p>Loading sun information…</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store";

const store = useStore();
const { currentWeather } = storeToRefs(store);

function formatTime(input: number): string {
  if (!input) {
    return "";
  }
  const date = new Date(input * 1000);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>