<template>
  <div v-if="dayHourWeatherLoading">
    <h4>Loading day hour weather</h4>
  </div>
  <div v-else-if="dayHourWeatherError">
    <h4>Couldn't load day hour weather</h4>
    <p>{{ dayHourWeatherError }}</p>
  </div>

  <div v-if="days.length">
    <div class="flex gap-2">
      <Button
        v-for="(day, i) in days"
        :key="day.key"
        :label="day.label"
        rounded
        :outlined="active !== i"
        @click="active = i"
      />
    </div>
    <Accordion v-model:value="active">
      <AccordionPanel
        v-for="(day, i) in days"
        :key="day.key"
        :value="i"
      >
        <AccordionHeader>{{ day.label }}</AccordionHeader>
        <AccordionContent>
          <DataTable
            v-model:selection="selectedForecastRow"
            selectionMode="single"
            dataKey="id"
            :value="day.rows"
            stripedRows
            showGridlines
          >
            <Column
              v-for="col in forecastCols"
              :key="col.field"
              :field="col.field"
              :header="col.header"
              sortable
            />
          </DataTable>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
// for some reason if I don't have these the application breaks
// maybe they need imported in main or something?
// idk enough about vue to know the answer to that
import AccordionContent from "primevue/accordioncontent";
import AccordionHeader from "primevue/accordionheader";
import AccordionPanel from "primevue/accordionpanel";
import DataTable from "primevue/datatable";

import { useStore } from "@/store/store";

const active = ref<number | null>(0);

const { isFetching: dayHourWeatherLoading, error: dayHourWeatherError } =
  useFiveDayThreeHour();

const store = useStore();

const { days, selectedForecastRow } = storeToRefs(store);
const forecastCols = store.forecastCols; // plain value, not a ref, don't use it in storeToRefs
</script>
