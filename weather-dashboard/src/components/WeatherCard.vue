<template>
  <div class="flex-row">
    <div>
      <h2>{{ selectedLocation }}</h2>
      <h5 v-if="latitude != null && longitude != null">
        ({{ latitude }}, {{ longitude }})
      </h5>

      <div v-if="geoLoading">
        <p>"Translating into coordinates..."</p>
      </div>
      <div v-else-if="geoError !== null">
        <p>Couldn't translate location. Try another city.</p>
      </div>
    </div>

    <div class="flex">
      <Tabs v-model:value="activeTab">
        <TabList>
          <Tab value="0"> Current </Tab>
          <Tab value="1"> 5 Day / 3 Hour </Tab>
        </TabList>

        <TabPanels>
          <!-- current -->
          <TabPanel value="0">
            <div v-if="currentWeatherLoading">
              <h3>Loading current weather…</h3>
            </div>
            <div v-else-if="currentWeatherError">
              <h3>Couldn’t load current weather.</h3>
              <p>{{ currentWeatherError }}</p>
            </div>
            <div
              v-else
              class="flex-auto flex gap-2 align-content-between"
            >
              <Card class="flex-auto flex m-2 px-5 border-solid">
                <template #content>
                  <CurrentTemp />
                </template>
              </Card>

              <Card class="flex-auto flex m-2 px-5 border-solid">
                <template #content>
                  <CurrentWind />
                </template>
              </Card>

              <Card class="flex-auto flex m-2 px-5 border-solid">
                <template #content>
                  <SunInformation />
                </template>
              </Card>
            </div>
          </TabPanel>

          <!-- 5 Day / 3 Hour -->
          <TabPanel value="1">
            <div class="flex gap-4 align-items-start">
              <ForecastTable />
              <div v-if="activeTab === '1'">
                <div v-if="selectedForecastRow">
                  <V2EditRow />
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/store";
import V2EditRow from "./5Day3HrWeather/V2EditRow.vue";

const activeTab = ref("0");

const store = useStore();
const { selectedLocation, latitude, longitude, selectedForecastRow } =
  storeToRefs(store);

// 1: run the translator, it reacts to selectedLocation and sets the lat and lon coords
const { error: geoError, isFetching: geoLoading } = useTranslateLocation();

// 2: kick off current weather & 5 day 3 hour thing once we have coords
// both reactive to lat / lon changes.
const { isFetching: currentWeatherLoading, error: currentWeatherError } =
  useCurrentWeather();
</script>
