<script setup lang="ts">
import { Theme } from '@primeuix/styled';

</script>

<template>
  <div class="flex flex-column">
    <div class="flex gap-4 ,-6 align-items-center justify-content-center">
      <h1 class="justify-content-center">
        Weather App
      </h1>
      <div class="justify-content-end">
        <ThemeSwitcher />
      </div>
    </div>

    <div class="flex m-6 justify-content-center">
      <LocationSelector />
    </div>

    <div class="flex m-6 justify-content-center">
      <WeatherCard />
    </div>

  </div>
</template>

<style scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-a);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}
</style>
