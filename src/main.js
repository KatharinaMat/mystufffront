import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";

import "@/assets/css/style.css"

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

// Font Awesome imports
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faArrowRightFromBracket, faR, fas, faUserSecret, faPenToSquare, faTrash, faQrcode} from '@fortawesome/free-solid-svg-icons'
import {far, faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'

// Add the imported icons to the library
library.add(faArrowRightFromBracket, faUserSecret, fas, faR, far,faPenToSquare, faTrash, faQrcode, faEye, faEyeSlash)

const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')