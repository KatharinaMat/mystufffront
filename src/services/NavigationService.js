import router from "@/router";

export default {
    navigateToItemsView() {
        router.push({name: 'ItemsView'})
    },
    navigateToErrorView() {
        router.push({name: 'ErrorView'})
    }
}