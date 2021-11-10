<template>
  <v-switch :label="label" v-on="$listeners" v-bind="$attrs" />
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Label'
        },
    }
}
</script>