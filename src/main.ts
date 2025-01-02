import { createApp } from 'vue';
import App from '@/App.vue';
// pinia store
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from '@/router';
// main app css
import '@/assets/css/app.css';
// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
//vue-meta
import { createHead } from '@vueuse/head';
// set default settings
import appSetting from '@/app-setting';
//vue-i18n
import i18n from '@/i18n';
// tippy tooltips
import { TippyPlugin } from 'tippy.vue';
//input mask
import Maska from 'maska';
//markdown editor
import VueEasymde from 'vue3-easymde';
import 'easymde/dist/easymde.min.css';
// popper
import Popper from 'vue3-popper';
// json to excel
import vue3JsonExcel from 'vue3-json-excel';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(PerfectScrollbar);
app.use(head);
appSetting.init();
app.use(i18n);
app.use(TippyPlugin);
app.use(Maska);
app.use(VueEasymde);
app.use(ToastPlugin);
app.component('Popper', Popper);
app.use(vue3JsonExcel);
app.mount('#app');
