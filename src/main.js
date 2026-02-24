import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useChristmasStore } from "@/store/festivities/ChristmasStore";
import { useSettingsStore } from "@/store/SettingsStore";
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');

window.__appTestAPI = {
    closeBlockingElements() {
        const christmas = useChristmasStore();
        const settings = useSettingsStore();
        christmas.hideElementForTest = true;
        settings.isTutorialVisible = false;
    },
    showHelperBtn() {
        const settings = useSettingsStore();
        settings.isVisibleOnScroll = true;
    }
};
