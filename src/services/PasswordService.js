export default {

    handlePasswordValidationError(password) {
        let passwordValidationError = ''

        if (password.length === 0) {
            passwordValidationError = 'Password is required'
        } else if (password.length < 3) {
            passwordValidationError = 'Password must be at least 3 characters'
        }

        return passwordValidationError
    },
}
