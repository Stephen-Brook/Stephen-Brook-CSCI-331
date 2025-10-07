<template>
  <div class="w-full">
    <template v-if="currentWeather && currentWeather.main">
      <div class="flex align-items-center gap-2">
        <h2>Temperature</h2>
        <Image
          :src="`/weatherImages/${icon}.png`"
          alt="weather icon"
          width="50"
          height="50"
        />
      </div>

      <p>
        <strong>Current Temperature: </strong>{{ currentWeather.main.temp }} °F
      </p>
      <p><strong>Humidity: </strong>{{ currentWeather.main.humidity }}%</p>
      <p>
        <strong>Feels Like: </strong>{{ currentWeather.main.feels_like }} °F
      </p>
      <p>
        <strong>Minimum Temperature: </strong
        >{{ currentWeather.main.temp_min }} °F
      </p>
      <p>
        <strong>Maximum Temperature: </strong
        >{{ currentWeather.main.temp_max }} °F
      </p>
      <p><strong>Visibility: </strong>{{ currentWeather.visibility }} m</p>
    </template>

    <template v-else>
      <p>Loading current weather…</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store";

const store = useStore();
const { currentWeather, icon } = storeToRefs(store);
</script>