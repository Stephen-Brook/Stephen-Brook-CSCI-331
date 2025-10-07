<template>
  <div class="flex-column align-items-start gap-2">
    <h2>Wind</h2>

    <template v-if="currentWeather && currentWeather.wind">
      <p><strong>Speed: </strong> {{ currentWeather.wind.speed }} Mi/hr</p>
      <p><strong>Deg: </strong> {{ currentWeather.wind.deg }}°</p>
      <p>
        <strong>Gust: </strong>
        {{ currentWeather.wind.gust }} Mi/hr
      </p>
    </template>

    <template v-else>
      <p>Loading current wind conditions…</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store";

const store = useStore();
const { currentWeather } = storeToRefs(store);
</script>