<template>
  <user-form title="Details" formType="show" :user="user" @on-delete="onDelete" @on-edit="onEdit"/>
</template>
<script>
    import UserForm from './components/UserForm';
    export default {
        components: {UserForm},
        props: ['id'],
        data() {
            return {
                user: {}
            }
        },
        methods: {
            async onDelete(item) {
                const res = await this.$dialog.warning({
                title: 'Delete user',
                text: 'Do you want to delete user with id: ' + item.id,
                persistent: true
                });
                if(res) {
                    this.$store.dispatch('usersModule/deleteUser', item.id);
                    this.$dialog.notify.success('User deleted', {
                        position: 'top-right',
                        timeout: 3000
                    });
                    this.$router.push({name: 'User Table'})
                }
            },
            onEdit(user) {
                this.$router.push({name: 'User Edit', params: {id: user.id}})
            }
        },
        created() {
            this.user = this.$store.getters['usersModule/getUser'](this.id);
        }
    }
</script>