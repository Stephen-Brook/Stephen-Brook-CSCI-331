import { useStore } from "@/store/store.js";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useTranslateLocation() {
  const store = useStore();
  const { selectedLocation } = storeToRefs(store);

  const debouncedLocation = refDebounced(selectedLocation, 1000);

  const responseLimit = 5;
  // the locationUrl is reactive to selectedLocation updates
  const locationUrl = computed(
    () =>
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        debouncedLocation.value || ""
      )}&limit=${responseLimit}&appid=${API_KEY}`
  );

  const request = useFetch(locationUrl, {
    refetch: true, // rerun whenever locationUrl changes
  })
    .get()
    .json<any[]>();

  // when the fetch successfully finishes, update coordinates in the store
  request.onFetchResponse((response) => {
    if (!response.ok) {
      return;
    }
    // get the data from the request
    const list = request.data.value;
    // make sure the data is an array and has length
    if (Array.isArray(list) && list.length > 0) {
      // get the latitude and longitude and update the coords of the store
      // this will cause the store to update the currentWeather and dayHourWeather stuff through reactivity
      const { lat, lon } = list[0];
      store.setCoordinates(lat, lon);
    }
  });

  return {
    isFetching: request.isFetching,
    error: request.error,
  };
}

export function useCurrentWeather() {
  const store = useStore();
  const { latitude, longitude } = storeToRefs(store);

  const url = computed(() => {
    if (latitude.value == null || longitude.value == null) {
      return null;
    }
    return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&units=imperial&appid=${API_KEY}`;
  });

  const request = useFetch(url, {
    refetch: true,
    immediate: true,
  })
    .get()
    .json<any>();

  request.onFetchError((context) => {
    const name = context.error?.name ?? "";
    // I was having some errors that even if the api call went through successfully it thought we aborted it
    // this is basically just clearing and ignoring those errors
    if (name === "AbortError") {
      // clear the stored error so the ui won't display it
      request.error.value = null;
      // also return so we dont do any other error handling
    }
  });

  request.onFetchResponse((response) => {
    if (!response.ok) return;
    const snapshot = { lat: latitude.value, lon: longitude.value };
    const data = request.data.value;
    if (
      data &&
      latitude.value === snapshot.lat &&
      longitude.value === snapshot.lon
    ) {
      store.currentWeather = data;
      // clear any old error on success
      request.error.value = null;
    }
  });

  return {
    isFetching: request.isFetching,
    error: request.error,
  };
}

export function useFiveDayThreeHour() {
  const store = useStore();
  const { latitude, longitude } = storeToRefs(store);

  const url = computed(() => {
    if (latitude.value == null || longitude.value == null) return null;
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude.value}&lon=${longitude.value}&units=imperial&appid=${API_KEY}`;
  });

  const request = useFetch(url, {
    refetch: true,
    immediate: true,
  })
    .get()
    .json<any>();

  // I was having some errors that even if the api call went through successfully it thought we aborted it
  // this is basically just clearing and ignoring those errors
  request.onFetchError((context) => {
    const error: any = context.error as any;
    const name = error?.name ?? "";
    if (name === "AbortError") {
      request.error.value = null;
    }
  });

  request.onFetchResponse((response) => {
    if (!response.ok) return;
    const snapshot = { lat: latitude.value, lon: longitude.value };
    const data = request.data.value;

    if (
      data &&
      latitude.value === snapshot.lat &&
      longitude.value === snapshot.lon
    ) {
      store.dayHourWeather = data;
      // clear any old error on success
      request.error.value = null;
    }
  });

  return {
    isFetching: request.isFetching,
    error: request.error,
  };
}
