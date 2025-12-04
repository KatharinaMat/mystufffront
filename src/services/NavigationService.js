import router from "@/router";

export default {
    navigateToItemsView() {
        router.push({name: 'itemsRoute'})
    },
    navigateToErrorView() {
        router.push({name: 'errorRoute'})
    },
    navigateToHomeView() {
        router.push({name: 'homeRoute'})
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