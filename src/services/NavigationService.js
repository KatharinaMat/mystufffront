import router from "@/router";
import SessionStorageService from "@/services/SessionStorageService";

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
    navigateToEditItem(itemId) {
        SessionStorageService.setItemMode('edit');
        router.push({
            name: 'itemRoute',
            query: {itemId: itemId}
        });

    },
    navigateToAddItem() {
        SessionStorageService.clearItemMode();
        router.push({name: 'itemRoute'});
    },

    navigateToItemView(itemId) {
        SessionStorageService.clearItemMode();
        router.push({
            name: 'itemRoute',
            query: {
                itemId: itemId
            }
        })
    },
    navigateToDeleteItemModal(itemId) {
        SessionStorageService.setItemMode('delete');
        router.push({
            name: 'itemRoute',
            query: {itemId}
        });
    },

}