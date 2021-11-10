export default function(value) {
    if(!this.form.id) {
        const users = this.$store.getters['usersModule/getUsers'];
        for (let user of users) {
            if (user.username == value) {
                return false;
            }
        }
    }
    return true;
}