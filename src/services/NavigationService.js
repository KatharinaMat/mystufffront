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
    navigateToEditItem() {

    },

    navigateToQrModal() {

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