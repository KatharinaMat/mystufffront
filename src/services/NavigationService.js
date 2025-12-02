import router from "@/router";

export default {
    navigateToItemsView() {
        router.push({name: 'ItemsView'})
    },
    navigateToErrorView() {
        router.push({name: 'ErrorView'})
    },
    navigateToHomeView() {
        router.push({name:'HomeView'})
    }
}