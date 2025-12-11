import axios from "axios";
axios.defaults.baseURL = "https://mystuff-backend.onrender.com";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@assets/css/style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faArrowRightFromBracket,
    faUserSecret,
    faPenToSquare,
    faTrash,
    faQrcode
} from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash, faR } from '@fortawesome/free-regular-svg-icons'

library.add(
    faArrowRightFromBracket,
    faUserSecret,
    faR,
    faPenToSquare,
    faTrash,
    faQrcode,
    faEye,
    faEyeSlash
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')