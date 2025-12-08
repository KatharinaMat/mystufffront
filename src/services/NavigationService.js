import router from "@/router";

export default {
    navigateToLoginView() {
        router.push({name: 'loginRoute'})
    },
    navigateToItemsView() {
        router.push({name: 'itemsRoute'})
    },
    navigateToErrorView() {
        router.push({name: 'errorRoute'})
    },
    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },
    navigateToEditItem() {

    },


    navigateToItemView(itemId) {
        router.push({
            name: 'itemRoute',
            query: {
                itemId: itemId
            }
        })
    }
}