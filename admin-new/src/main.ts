import './assets/main.scss';
import './assets/tailwind.css';

import 'virtual:svg-icons-register';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './stores/store';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
