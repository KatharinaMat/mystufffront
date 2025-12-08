export default {
    handleUsernameValidationError(username) {
        let usernameValidationError=''

        if (username.length < 3) {
            usernameValidationError = 'Username must be at least 3 characters'
        }
        return usernameValidationError
    }
}