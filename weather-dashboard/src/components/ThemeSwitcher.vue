<template>
  <Button
    :label="store.isDark ? '☀️' : '🌙'"
    rounded
    outlined
    @click="store.toggleTheme()"
  />
</template>

<script lang="ts" setup>
import { useStore } from "@/store/store";

const store = useStore();
</script>
