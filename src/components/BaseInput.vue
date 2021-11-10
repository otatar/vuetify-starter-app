<template>
    <v-text-field  :label="label" v-on="$listeners" v-bind="$attrs"/>
</template>
<script>
export default {
    name: "BaseInput",
    props: {
        label: {
            type: String,
            default: 'Label'
        }
    },
    data: () => ({
        
    })
}
</script>