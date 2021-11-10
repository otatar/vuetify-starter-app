<template>
  <user-form title="Edit" formType="edit" :user="user" @on-submit="onSubmit"/>
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
            onSubmit(user) {
                this.$store.dispatch('usersModule/updateUser', user);
                this.$dialog.notify.success('User updated', {
                    postion: 'top-right',
                    timeout: 3000
                });
                this.$router.go(-1);
            }
        },
        created() {
            this.user = this.$store.getters['usersModule/getUser'](this.id);
        }
    }
</script>