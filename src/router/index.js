import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import NewAccountView from "@/views/NewAccountView.vue";
import ItemsView from "@/views/ItemsView.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/new-account',
        name: 'newAccount',
        component: NewAccountView
    },
    {
        path:'/items',
        name:'ItemsView',
        component:ItemsView
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
