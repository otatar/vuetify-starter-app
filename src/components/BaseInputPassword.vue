<template>
    <v-text-field 
    :label="label" 
    :type="showPass ? 'text' : 'password'" 
    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
     @click:append="showPass = !showPass"
     v-on="$listeners" v-bind="$attrs"
    />
</template>
<script>
export default {
    name: "BaseInputPassword",
    props: {
        label: {
            type: String,
            default: 'Password'
        }
    },
    data: () => ({
        showPass: false
    })
}
</script>