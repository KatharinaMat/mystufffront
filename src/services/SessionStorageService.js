export default {

    isAdmin() {
        return sessionStorage.getItem('roleName') === 'admin'
    },

    getUserId() {
        return Number(sessionStorage.getItem('userId'))
    },

    isLoggedIn() {
        return sessionStorage.getItem('roleName') !== null
    },
    setUsername(username) {
        sessionStorage.setItem('username', username)
    },

    getUsername() {
        return sessionStorage.getItem('username')
    }
}