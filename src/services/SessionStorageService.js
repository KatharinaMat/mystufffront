export default {

    isAdmin() {
        return sessionStorage.getItem('roleName') === 'admin'
    },

    isLoggedIn() {
        return sessionStorage.getItem('roleName') !== null
    },
}