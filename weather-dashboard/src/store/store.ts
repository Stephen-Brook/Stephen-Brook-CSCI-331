import {
  TableRow,
  DayGroup,
  shiftedDate,
  dayDateFromShifted,
  toDatetimeLocal,
} from "@/Utility/utils.js";
export const useStore = defineStore("store", () => {
  // State
  const recentlyVisited = ref(new Set(["Denver", "Bozeman", "Telluride"]));

  //this is for the light / dark theme switcher
  const isDark = ref(true);
  watch(
    isDark,
    (on) => {
      document.documentElement.classList.toggle("app-dark", on);
    },
    { immediate: true }
  );
  const selectedLocation = ref("Denver");

  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);

  const currentWeather = ref<any>(null);

  const icon = computed<string | null>(
    () => currentWeather.value?.weather[0]?.icon ?? null
  );

  const dayHourWeather = ref<any>(null);

  const selectedForecastRow = ref<TableRow | null>(null);

  const editRowsMap = reactive(new Map<string, { row: TableRow }>());

  const timeFormat = new Intl.DateTimeFormat(undefined, {
    timeZone: "UTC",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const dayLabelFormat = new Intl.DateTimeFormat(undefined, {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const forecastCols = [
    { field: "dateString", header: "UTC Time" },
    { field: "temp", header: "Temperature °F" },
    { field: "feelsLike", header: "Feels Like °F" },
    { field: "conditions", header: "Conditions" },
    { field: "humidity", header: "Humidity %" },
  ];

  //derive forecastRows and groupedDays
  const rawForecastRows = computed<TableRow[]>(() => {
    const list = dayHourWeather.value?.list ?? [];
    const tzOffset = dayHourWeather.value?.city?.timezone ?? 0; // seconds

    return list.map((entry: any) => {
      const shifted = shiftedDate(entry.dt, tzOffset);
      const dayKey = dayDateFromShifted(shifted);
      const time = timeFormat.format(shifted);
      return {
        id: `${dayKey}_${time}`,
        dayKey,
        temp: Math.round(entry.main?.temp),
        feelsLike: Math.round(entry.main?.feels_like),
        conditions: entry.weather?.[0]?.description ?? "",
        humidity: entry.main?.humidity,
        dateString: toDatetimeLocal(shifted),
      };
    });
  });

  const forecastRows = computed<TableRow[]>(() => {
    return rawForecastRows.value.map((base) => {
      const edited = editRowsMap.get(base.id)?.row;
      return edited ?? base;
    });
  });

  const days = computed<DayGroup[]>(() => {
    //group rows by YYYY-MM-DD
    const map = new Map<string, TableRow[]>();
    for (const row of forecastRows.value) {
      if (!map.has(row.dayKey)) map.set(row.dayKey, []);
      map.get(row.dayKey)!.push(row);
    }

    //sort keys chronologically for YYYY-MM-DD
    const sortedKeys = Array.from(map.keys()).sort();

    return sortedKeys.map((key) => {
      const [y, m, d] = key.split("-").map(Number);
      const representativeDate = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
      return {
        key,
        label: dayLabelFormat.format(representativeDate),
        rows: map.get(key)!,
      };
    });
  });

  // Actions

  // function initTheme() {
  //   applyTheme(); //start in dark mode
  // }

  // function applyTheme() {
  //   document.documentElement.classList.toggle("app-dark", isDark.value);
  // }

  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  function setSelectedLocation(location: string) {
    selectedLocation.value = location;
  }

  function addNewPlace(place: string) {
    if (!place.trim()) return;
    // 1. Remove the place if it already exists. This is done so
    //    that when we add it back, it becomes the "newest" item.
    recentlyVisited.value.delete(place);

    // 2. Add the place. This adds it to the end of the set's
    //    insertion order, effectively making it the most recent.
    recentlyVisited.value.add(place);

    // 3. If the Set has grown too large, remove the oldest item,
    //    which is the *first* item in the Set's insertion order.
    if (recentlyVisited.value.size > 5) {
      const oldestPlace = recentlyVisited.value.values().next().value;
      recentlyVisited.value.delete(oldestPlace);
    }
    selectedLocation.value = place;
  }

  function setCoordinates(lat: number, lon: number) {
    latitude.value = lat;
    longitude.value = lon;
  }

  function editForecastRow(
    id: string,
    dayKey: string,
    temp: number,
    feelsLike: number,
    conditions: string,
    humidity: number,
    dateString: string
  ): void {
    const newRow: TableRow = {
      id: id,
      dayKey: dayKey,
      temp: temp,
      feelsLike: feelsLike,
      conditions: conditions,
      humidity: humidity,
      dateString: dateString,
    };
    editRowsMap.set(id, { row: newRow });
  }

  return {
    // state
    isDark,
    recentlyVisited,
    selectedLocation,
    latitude,
    longitude,
    currentWeather,
    icon,
    dayHourWeather,
    selectedForecastRow,

    //derived
    forecastCols,
    forecastRows,
    days,

    // actions
    toggleTheme,
    addNewPlace,
    setSelectedLocation,
    setCoordinates,
    editForecastRow,
  };
});
