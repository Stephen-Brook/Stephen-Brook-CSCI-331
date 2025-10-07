<template>
  <div>
    <h2>Recent Places</h2>

    <div class="flex align-items-start gap-2">
      <Button
        v-for="place in recentlyVisited"
        :key="place"
        :label="place"
        :outlined="selectedLocation !== place"
        @click="selectedLocation = place"
      />
      <!-- use v-model to bind the input to selected location from the store -->
      <FormKit
        type="form"
        submit-label="🔎 search"
        :classes="{ form: 'flex gap-2' }"
        :submit-attrs="{
          inputClass: 'p-component p-button',
        }"
        @submit="store.addNewPlace(selectedLocation)"
      >
        <FormKit
          v-model="selectedLocation"
          type="primeInputText"
          name="selectedLocationInput"
          placeholder="search"
          :classes="{ input: 'p-inputtext p-component' }"
        />
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store";

const store = useStore();
const { recentlyVisited, selectedLocation } = storeToRefs(store);
</script>
