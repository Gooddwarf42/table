import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import './assets/main.css'


//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
//core
import "primevue/resources/primevue.min.css";
//icons
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(ConfirmationService);
app.mount('#app');
