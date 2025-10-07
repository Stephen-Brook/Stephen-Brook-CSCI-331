export const editForecastRowSchema = [
  {
    $el: "h3",
    children: "Edit Forecast Row",
  },
  {
    $formkit: "group",
    name: "row",
    validationVisibility: "live",
    validation: [
      [
        (node: any) => {
          const v = node.value || {};
          const t = Number(v.temp);
          const f = Number(v.feelsLike);
          if (!Number.isFinite(t) || !Number.isFinite(f)) return true; // don't block until both exist
          return Math.abs(t - f) <= 10;
        },
        "Feels Like must be within 10°F of Temperature",
      ],
    ],
    validationMessages: ["Feels Like must be within 10°F of Temperature"],
    children: [
      {
        $formkit: "primeDatePicker",
        size: "small",
        name: "dateString",
        label: "Time Stamp",
        showTime: true,
        hourFormat: "24",
      },
      {
        $formkit: "primeInputNumber",
        size: "small",
        name: "temp",
        label: "Temperature",
        suffix: " °F",
        showButtons: true,
        validation: "(200)required|between:-100,150",
        validationVisibility: "live",
        validationMessages: {
          required: "Temperature is required",
          between: "Temperature must be between -100°F and 150°F",
        },
      },
      {
        $formkit: "primeInputNumber",
        size: "small",
        name: "feelsLike",
        label: "Feels Like",
        suffix: " °F",
        showButtons: true,
        validation: "(200)required|between:-100,150",
        validationVisibility: "live",
        validationMessages: {
          required: "Feels Like temperature is required",
          between: "Feels Like must be between -100°F and 150°F",
        },
      },
      {
        $formkit: "primeInputText",
        size: "small",
        name: "conditions",
        label: "Conditions",
      },
      {
        $formkit: "primeInputNumber",
        size: "small",
        name: "humidity",
        label: "Humidity",
        suffix: " %",
        showButtons: true,
        validation: "(200)between:0,100",
        validationVisibility: "live",
        validationMessages: {
          between: "Humidity must be between 0% and 100%",
        },
      },
    ],
  },
];