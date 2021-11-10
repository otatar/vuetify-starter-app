<template>
    <base-data-table @item-details="onDetails" @item-edit="onEdit" @item-delete="onDelete" :headers="headers" :items="items" tableName="User Table"/>
</template>
<script>
export default {
    data() {
        return {
            headers: [{name: 'ID', value: 'id'}, 
            {name:'Username', value: 'username'}, 
            {name:'First Name', value: 'firstName'},
            {name:"Last Name", value: 'lastName'}, 
            {name:"E-mail", value: 'email'},
            {name: "Authorization Level", value: "authorizationLevel"}],
        }
    },
    methods: {
        onEdit(item) {
            this.$router.push({name: "User Edit", params: {id: item.id}});
        },
        onDetails(item) {
            this.$router.push({name: "User Details", params:{id: item.id}});
        },
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
            }
        },
    },
    computed: {
        items() {
            return this.$store.getters['usersModule/getUsers'];
        }
    }
}
</script>