import { createAutoAnimatePlugin } from "@formkit/addons";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { defaultConfig, plugin } from "@formkit/vue";
//
import "@/formkit-primevue.scss";
import type { DefaultConfigOptions } from "@formkit/vue";
import { primeInputs } from "@sfxcode/formkit-primevue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
//
import Aura from "@primeuix/themes/aura";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";

import Tab from "primevue/tab";

import TabList from "primevue/tablist";

import TabPanel from "primevue/tabpanel";
// import '@formkit/themes/genesis';

import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";
import { createApp } from "vue";
import App from "./App.vue";
// All core CSS themes come here
import "primeflex/primeflex.min.css";

const app = createApp(App);
app.use(createPinia());

app.use(autoAnimatePlugin);
app.use(
  plugin,
  defaultConfig({
    plugins: [createAutoAnimatePlugin()],
    locale: "en",
    inputs: primeInputs,
  })
);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
});

app.component("Tabs", Tabs);
app.component("TabList", TabList);
app.component("Tab", Tab);
app.component("TabPanels", TabPanels);
app.component("TabPanel", TabPanel);

app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("DatePicker", DatePicker);

app.mount("#app");
