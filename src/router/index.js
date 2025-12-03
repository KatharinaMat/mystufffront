import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import NewAccountView from "@/views/NewAccountView.vue";
import ItemsView from "@/views/ItemsView.vue";
import ErrorView from "@/views/ErrorView.vue";


const routes = [
    {
        path: '/',
        name: 'HomeView',
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
        component: ItemsView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
