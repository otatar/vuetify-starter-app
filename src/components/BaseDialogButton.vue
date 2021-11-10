<template>
    <v-btn text :color="color" v-on="$listeners" v-bind="$attrs">{{title}}</v-btn>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: "Button"
        }
    },
    data: () => ({
    })
}
</script>