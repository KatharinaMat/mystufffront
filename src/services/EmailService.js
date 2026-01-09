export default {
    validateSignupEmail(email) {
        const e = (email || '').trim()
        if (e.length === 0) return 'Email is required'
        if (!this.emailInputIsValid(e)) return 'Please enter a valid email address'
        if (e.length > 254) return 'Email must be at most 254 characters'
        return ''
    },

    emailInputIsValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
}
