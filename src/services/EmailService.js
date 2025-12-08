export default {
    handleEmailValidationError(email) {
        let emailValidationError = ''

        if (!this.emailInputIsValid(email)) {
            emailValidationError = 'Please enter a valid email address';
        }
        return emailValidationError

    },
    emailInputIsValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    },
}
