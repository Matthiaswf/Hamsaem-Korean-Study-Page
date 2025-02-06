import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Importing the global css file
import './assets/main.css';

//Making Sure Firebase loads b4 the page mounts (inorder to determine if the user is logged in or not)
import { projectAuth } from '@/firebase/config';

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(createPinia()).use(router).mount('#app');
  }
});
