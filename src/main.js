import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

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

console.log('AXIOS BASE URL =', axios.defaults.baseURL)

library.add(
    faArrowRightFromBracket,
    faUserSecret,
    faPenToSquare,
    faTrash,
    faQrcode,
    faEye,
    faEyeSlash,
    faR
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')