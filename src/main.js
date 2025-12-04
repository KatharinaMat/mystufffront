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
import {faUserSecret} from '@fortawesome/free-solid-svg-icons'
// Lisa siia teised ikoonid, mida vajad, näiteks: import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

// Add the imported icons to the library
library.add(faUserSecret) // Lisa siia ka teised imporditud ikoonid, nt: library.add(faUserSecret, faPenToSquare, faTrash)

const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')