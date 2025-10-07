<template>
  <div class="flex-column p-4">
    <Button
      label="Reset Selected Row"
      rounded
      outlined
      @click="resetRow"
    />
    <FormKit
      v-model="formData"
      type="form"
      incomplete-message="Invalid Inputs"
      @submit="editRow"
    >
      <FormKitSchema :schema="editForecastRowSchema" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store";
import { editForecastRowSchema } from "@/Utility/formkitSchema";

const store = useStore();

const { selectedForecastRow } = storeToRefs(store);

const formData = ref<{ row: any }>({ row: { ...selectedForecastRow.value } });

//  JSON.parse(JSON.stringify(selectedForecastRow.value))

watch(selectedForecastRow, (row) => {
  if (row) {
    // when user picks a different row, repopulate the fields in the form
    formData.value = { row: { ...row } };
  }
});

// make this an object that you pass in
function editRow(payload: { row: Record<string, any> }) {
  const current = selectedForecastRow.value;
  if (current) {
    store.editForecastRow(
      current.id,
      current.dayKey,
      payload.row.temp,
      payload.row.feelsLike,
      payload.row.conditions,
      payload.row.humidity,
      payload.row.dateString
    );
  }
}

function resetRow() {
  // reset the forms local copy back to the current selected row
  const current = selectedForecastRow.value;
  if (current) {
    formData.value = { row: { ...current } };
  }
}
</script>
