<template>
  <v-select dense :label="label" :items="items" v-on="$listeners" v-bind="$attrs" item-text="text" item-value="value"/>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Label'
        },
        items: {
            type: Array,
            required: true
        }
    }
}
</script>