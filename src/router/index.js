import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import NewAccountView from "@/views/NewAccountView.vue";
import ItemsView from "@/views/ItemsView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ItemView from "@/views/ItemView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/new-account',
        name: 'newAccountRoute',
        component: NewAccountView
    },
    {
        path: '/items',
        name: 'itemsRoute',
        component: ItemsView
    },
    {
        path: '/item',
        name: 'itemRoute',
        component: ItemView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },

]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes
})

export default router
