<template>
  <user-form title="Create User Form" formType="create" @on-submit="onSubmit"/>
</template>
<script>
import UserForm from './components/UserForm';
import { getRandomInt } from '@/utils/util_functions';
export default {
  components: {UserForm},
  methods: {
    onSubmit(user) {
      this.$store.dispatch('usersModule/addUser', {...user, 'id': getRandomInt(100, 200)});
      this.$dialog.notify.success('User added', {
        postion: 'top-right',
        timeout: 3000
      });
      this.$router.push({name: "User Table"})
    }

  }
  
}
</script>