module.exports = {
    /**
     * Check is exist username or password.
     *
     * @param {string} username The usename is checked.
     * @param {string} password The password is checked.
     * @return {boolean} return true if username or password is not exist or both, return false if opposite.
     */
    simpleValidate: function(username, password){
        return !username || !password
    }
}