import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import '@/assets/css/style.css'
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faArrowRightFromBracket,
    faUserSecret,
    faPenToSquare,
    faTrash,
    faQrcode
} from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash, far } from '@fortawesome/free-regular-svg-icons'
// :small_orange_diamond: NEW: set backend URL (Render in prod, localhost in dev)
axios.defaults.baseURL =
    process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080'
// Add the imported icons to the library
library.add(
    faArrowRightFromBracket,
    faUserSecret,
    far,
    faPenToSquare,
    faTrash,
    faQrcode,
    faEye,
    faEyeSlash
)
const app = createApp(App)
// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')