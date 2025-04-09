// javascript in src/main.js
import './assets/css/main.css';
import siteColors from './assets/colors.js';
import { createApp } from 'vue';
import App from './App.vue';
import SocialSharing from "vue3-social-sharing";


const app = createApp(App);
app.use(SocialSharing);
// Inject CSS variables from the color config
const root = document.documentElement;
for (const [key, value] of Object.entries(siteColors)) {
  root.style.setProperty(`--${key}`, value);
}

app.mount('#app');