import './assets/css/main.css';
import siteColors from './assets/colors.js';
import { createApp } from 'vue';
import App from './App.vue';
import SocialSharing from "vue3-social-sharing";
import router from './router';
import i18n from './i18n/index.js'

const app = createApp(App);
app.use(SocialSharing);
app.use(i18n);
// Inject CSS variables from the color config
const root = document.documentElement;
for (const [key, value] of Object.entries(siteColors)) {
  root.style.setProperty(`--${key}`, value);
}
app.use(router);
app.mount('#app');